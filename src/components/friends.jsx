'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '../utils/superbase/client';
import { useUser } from '../hooks/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export default function FriendsList() {
  const [friends, setFriends] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchFriends = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('friends')
        .select(
          `
          *,
          friend:profiles!friends_friend_id_fkey(display_name, image_url)
        `
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setFriends(data);
      } else if (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();

    const supabase = createClient();
    const channel = supabase
      .channel('custom-friends-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'friends',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => handleRealtimeUpdate(payload)
      )
      .subscribe();

    // Cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleRealtimeUpdate = async (payload) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    const supabase = createClient();

    switch (eventType) {
      case 'INSERT':
        // Fetch the friend's details
        const { data: friendData, error } = await supabase
          .from('profiles')
          .select('display_name, image_url')
          .eq('id', newRecord.friend_id)
          .single();

        if (friendData && !error) {
          setFriends((prev) => [{ ...newRecord, friend: friendData }, ...prev]);
        }
        break;
      case 'DELETE':
        setFriends((prev) =>
          prev.filter((friend) => friend.id !== oldRecord.id)
        );
        break;
      default:
        console.log('Unhandled event type', eventType);
    }
  };

  if (!friends) {
    return (
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    );
  }

  return (
    <ul className='space-y-4'>
      {friends.map((friend, index) => (
        <li key={index} className='flex items-center space-x-4'>
          <Avatar>
            <AvatarImage
              src={friend.friend.image_url}
              alt={friend.friend.display_name}
            />
          </Avatar>
          <div>
            <p className='text-sm font-medium leading-none'>
              {friend.friend.display_name}
            </p>
            {/* <p className='text-sm text-muted-foreground'>active</p> */}
          </div>
        </li>
      ))}
    </ul>
  );
}
