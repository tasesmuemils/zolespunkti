'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { createClient } from '@/utils/superbase/client';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function UserSearch({ userId, closeDialog }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.length > 2) {
        const { data, error } = await supabase
          .from('profiles')
          .select()
          .ilike('display_name', `%${searchTerm}%`)
          .limit(10);

        // console.log('use', data);

        if (data && !error) {
          setUsers(data);
        } else {
          console.error('Error fetching users:', error);
          setUsers([]);
        }
      } else {
        setUsers([]);
      }
    };

    const timeoutId = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleInvitation = () => {
    setLoading(true);

    // toast(`Uzaicinājums nosūtīts ${selectedUser.display_name}! 🎉`);
    const sendInvitation = async (fromUserId, toUserId) => {
      const { data, error } = await supabase
        .from('invitations')
        .insert({
          from_user_id: fromUserId,
          to_user_id: toUserId,
          status: 'pending',
        })
        .select();

      if (data && !error) {
        closeDialog();
        toast(`Uzaicinājums nosūtīts ${selectedUser.display_name}! 🎉`);
      } else if (error && error.code == '23505') {
        closeDialog();
        toast(`Spēlētājs jau ir tavā draugu sarakstā 🧑‍🤝‍🧑`);
      } else {
        closeDialog();
        toast(`Uzaicinājuma nosūtīšana neizdevās! 😔`);
      }
    };

    sendInvitation(userId, selectedUser.id);
  };

  if (isDesktop) {
    return (
      <>
        <Popover className='z-[100]' open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' className='w-full'>
              {selectedUser ? (
                <>{selectedUser.display_name}</>
              ) : (
                <>
                  {' '}
                  <UserPlus className='w-4 h-4 mr-2' />
                  Uzaicini draugu
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='w-full p-0'
            side='bottom'
            align='center'
            sideOffset={5}
          >
            <StatusList
              setOpen={setOpen}
              users={users}
              setSelectedUser={setSelectedUser}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </PopoverContent>
        </Popover>
        {selectedUser && (
          <Button onClick={handleInvitation} disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Uzaicināt
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='w-full'>
            {selectedUser ? (
              <>{selectedUser.display_name}</>
            ) : (
              <>
                <UserPlus className='w-4 h-4 mr-2' />
                Uzaicini draugus
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className='w-[95%]'>
          <div className='mt-4 border-t'>
            <StatusList
              setOpen={setOpen}
              users={users}
              setSelectedUser={setSelectedUser}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </DialogContent>
      </Dialog>
      {selectedUser && (
        <Button onClick={handleInvitation} disabled={loading}>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Uzaicināt
        </Button>
      )}
    </>
    // <>
    //   <Drawer open={open} onOpenChange={setOpen} side='top'>
    //     <DrawerTrigger asChild>
    //       <Button variant='outline' className='w-full'>
    //         {selectedUser ? (
    //           <>{selectedUser.display_name}</>
    //         ) : (
    //           <>
    //             {' '}
    //             <UserPlus className='w-4 h-4 mr-2' />
    //             Uzaicini draugussss
    //           </>
    //         )}
    //       </Button>
    //     </DrawerTrigger>
    //     <DrawerContent>
    //       <div className='mt-4 border-t'>
    //         <StatusList
    //           setOpen={setOpen}
    //           users={users}
    //           setSelectedUser={setSelectedUser}
    //           searchTerm={searchTerm}
    //           setSearchTerm={setSearchTerm}
    //         />
    //       </div>
    //     </DrawerContent>
    //   </Drawer>
    //   {selectedUser && (
    //     <Button onClick={handleInvitation} disabled={loading}>
    //       {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
    //       Uzaicināt
    //     </Button>
    //   )}
    // </>
  );
}

function StatusList({
  setOpen,
  users,
  setSelectedUser,
  searchTerm,
  setSearchTerm,
}) {
  // FIND FREINDS
  return (
    <Command className='z-[100]'>
      <CommandInput
        placeholder='Meklē lietotājvārdu...'
        value={searchTerm}
        onValueChange={setSearchTerm}
      />
      <CommandList>
        <CommandEmpty>Lietotājs nav atrasts</CommandEmpty>
        <CommandGroup>
          {users &&
            users.map((user) => (
              <CommandItem
                key={user.display_name}
                value={user.display_name}
                onSelect={() => {
                  setSelectedUser(user);
                  setSearchTerm('');
                  setOpen(false);
                }}
              >
                {user.display_name}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
