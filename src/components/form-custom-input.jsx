'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createClient } from '@/utils/superbase/client';
import { useUser } from '@/hooks/useUser';

export function FormCustomInput({ value, onChange, placeholder, ...props }) {
  const [inputValue, setInputValue] = useState(value?.display_name || '');
  const [friends, setFriends] = useState([]);
  const [matchingFriends, setMatchingFriends] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchFriends = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('friends')
        .select(
          `
          *,
          friend:profiles!friends_friend_id_fkey(id, display_name, image_url)
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

    if (user) {
      fetchFriends();
    }
  }, [user]);

  useEffect(() => {
    if (inputValue) {
      const matches = friends.filter((friend) =>
        friend.friend.display_name
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      );
      setMatchingFriends(matches);
      setShowDropdown(matches.length > 0);
    } else {
      setMatchingFriends([]);
      setShowDropdown(false);
    }
  }, [inputValue, friends]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange({ display_name: newValue, id: null });
  };

  const handleFriendSelect = (friend) => {
    setInputValue(friend.friend.display_name);
    onChange({
      display_name: friend.friend.display_name,
      id: friend.friend.id,
    });
    setShowDropdown(false);
  };

  return (
    <div className='relative'>
      <Input
        type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        {...props}
      />
      {showDropdown && (
        <div className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg'>
          <ScrollArea className='h-64'>
            {matchingFriends.map((friend, index) => (
              <Button
                key={index}
                variant='ghost'
                className='w-full justify-start font-normal'
                onClick={() => handleFriendSelect(friend)}
              >
                {friend.friend.display_name}
              </Button>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
