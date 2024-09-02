'use client';

import { useState, useEffect } from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
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

export function UserSearch() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.length > 2) {
        const supabase = createClient();
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

  if (isDesktop) {
    return (
      <>
        <Popover className='z-[100]' open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' className='w-[150px] justify-center'>
              {selectedUser ? (
                <>{selectedUser.display_name}</>
              ) : (
                <>+ Uzaicini draugu</>
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
        {selectedUser && <Button>Uzaicināt</Button>}
      </>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant='outline' className='w-[150px] justify-start'>
            {selectedUser ? (
              <>{selectedUser.display_name}</>
            ) : (
              <>+ Uzaicini draugu</>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mt-4 border-t'>
            <StatusList
              setOpen={setOpen}
              users={users}
              setSelectedUser={setSelectedUser}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </DrawerContent>
      </Drawer>
      {selectedUser && <Button>Uzaicināt</Button>}
    </>
  );
}

function StatusList({
  setOpen,
  users,
  setSelectedUser,
  searchTerm,
  setSearchTerm,
}) {
  // console.log('USERS', users);
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
