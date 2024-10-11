'use client';

import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { createClient } from '../../utils/superbase/client';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';

export default function Notifications() {
  const [notifications, setNotifications] = useState(null);

  const { user } = useUser();

  const fetchNotifications = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('invitations')
      .select(
        `
        *,
        sender:profiles!invitations_from_user_id_fkey(display_name)
      `
      )
      .eq('to_user_id', user.id)
      .filter('status', 'eq', 'pending')
      .order('created_at', { ascending: false });

    if (data) {
      setNotifications(data);
    } else if (error) {
      console.error('Error fetching invitations:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();

      const supabase = createClient();
      const channel = supabase
        .channel('custom-all-channel')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'invitations',
            filter: `to_user_id=eq.${user.id}`,
          },
          (payload) => handleRealtimeUpdate(payload)
        )
        .subscribe();

      // Cleanup function
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const handleRealtimeUpdate = async (payload) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    switch (eventType) {
      case 'INSERT':
        // Fetch the sender's display name for the new invitation
        const supabase = createClient();
        const { data: senderData } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', newRecord.from_user_id)
          .single();

        if (senderData) {
          setNotifications((prev) => [
            { ...newRecord, sender: senderData },
            ...prev,
          ]);
        }
        break;
      case 'UPDATE':
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === newRecord.id
              ? { ...notification, ...newRecord }
              : notification
          )
        );
        break;
      case 'DELETE':
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== oldRecord.id)
        );
        break;
      default:
        console.log('Unhandled event type', eventType);
    }
  };

  // Accept friend request
  const acceptFriendRequest = async (invitationId) => {
    const supabase = createClient();

    // Step 1: Update the invitation status
    const { data: updatedInvitation, error: updateError } = await supabase
      .from('invitations')
      .update({ status: 'accepted' })
      .eq('id', invitationId)
      .select()
      .single();

    if (updateError) {
      console.error('Error accepting invitation:', updateError);
      return null;
    }

    // Step 2: Add to friends table (if you have one)
    if (updatedInvitation) {
      const { error: friendError } = await supabase.from('friends').insert([
        {
          user_id: updatedInvitation.to_user_id,
          friend_id: updatedInvitation.from_user_id,
        },
        {
          user_id: updatedInvitation.from_user_id,
          friend_id: updatedInvitation.to_user_id,
        },
      ]);

      if (friendError) {
        console.error('Error adding friend:', friendError);
        // You might want to handle this error (e.g., revert the invitation status)
      }
    }

    return updatedInvitation;
  };

  const handleAcceptFriendRequest = async (invitationId) => {
    const updatedInvitation = await acceptFriendRequest(invitationId);

    if (updatedInvitation) {
      // Remove the accepted invitation from the notifications
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== invitationId
        )
      );

      // Optionally refetch notifications to ensure everything is in sync
      fetchNotifications();

      //no ${data[0].sender.display_name}
      toast(`Uzaicinājums  apstiprināts! 🎉`);
    } else {
      toast(`Uzaicinājuma apstiprināšana neizdevās! 😔`);
      console.error('Failed to accept friend request');
    }
  };

  // Decline friend request
  const declineFriendRequest = async (invitationId) => {
    const supabase = createClient();
    const { data: updatedInvitation, error: updateError } = await supabase
      .from('invitations')
      .update({ status: 'declined' })
      .eq('id', invitationId)
      .select()
      .single();

    if (updatedInvitation && !updateError) {
      // console.log('Invitation declined:', data);
      return updatedInvitation;
    } else if (updateError) {
      console.error('Error declining invitation:', updateError);
    }
  };

  const handleDeclineFriendRequest = async (invitationId) => {
    const updatedInvitation = await declineFriendRequest(invitationId);

    if (updatedInvitation) {
      // Remove the accepted invitation from the notifications
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== invitationId
        )
      );

      // Optionally refetch notifications to ensure everything is in sync
      fetchNotifications();

      //no ${data[0].sender.display_name}
      toast(`Uzaicinājums noraidīts! 😔`);
    } else {
      toast(`Uzaicinājuma noraidīšana neizdevās! 😔`);
      console.error('Failed to accept friend request');
    }
  };

  // console.log('Notifications', notifications);

  if (!notifications) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='relative' variant='outline' size='icon'>
          <Bell className='h-[1.2rem] w-[1.2rem]' />
          {notifications.length > 0 && (
            <span className='absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full'></span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Paziņojumi</SheetTitle>
          <SheetDescription>
            Visus jaunos paziņojumus varēsi redzēt šeit
          </SheetDescription>
        </SheetHeader>

        <div className='pt-5'>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card
                key={`${notification}_id`}
                className='m-0 w-full max-w-md mx-auto'
              >
                <CardContent className='pt-3 pb-2'>
                  <p className='text-center text-base font-light'>
                    Tev ir jauns uzaicinājums no{' '}
                    <span className='font-semibold '>
                      {notification.sender.display_name}
                    </span>
                  </p>
                </CardContent>
                <CardFooter className='flex gap-2 pt-1 pb-3'>
                  <Button
                    className='flex-1 text-sm h-8 min-h-0 px-2'
                    variant='default'
                    onClick={() => handleAcceptFriendRequest(notification.id)}
                  >
                    Apstiprināt
                  </Button>
                  <Button
                    className='flex-1 text-sm h-8 min-h-0 px-2'
                    variant='outline'
                    onClick={() => handleDeclineFriendRequest(notification.id)}
                  >
                    Noraidīt
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <h4 className='scroll-m-20 text-lg font-semibold tracking-tight'>
              Tev nav jaunu paziņojumu 📭
            </h4>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
