'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { UserPlus, ArrowLeft } from 'lucide-react';

import { createClient } from '../utils/superbase/client';
import { useUser } from '../hooks/useUser';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { avatarsArray } from '@/constants/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// Extract the values from avatarsArray
const avatarValues = avatarsArray.map((avatar) => avatar.value);

function FriendsList({
  setOpen,
  friends,
  setSelectedUser,
  friendSelect,
  stepState,
  formData,
}) {
  // Get the list of friends already selected in formData
  const selectedFriends = formData.slice(0, stepState).map((data) => data.id);

  // Filter the friends to exclude already selected friends
  const availableFriends = friends.filter(
    (friendItem) => !selectedFriends.includes(friendItem.friend.id)
  );

  return (
    <Command className='z-[100]'>
      <CommandInput placeholder='Meklē lietotājvārdu...' />
      <CommandList>
        <CommandEmpty>
          {availableFriends.length > 0
            ? 'Lietotājs nav atrasts'
            : 'Tev vajag vairāk draugus 🕵️'}
        </CommandEmpty>
        <CommandGroup>
          {availableFriends &&
            availableFriends.length > 0 &&
            availableFriends.map((friendItem) => {
              const { friend } = friendItem;

              return (
                <CommandItem
                  key={friend.friend_id}
                  value={friend.display_name}
                  onSelect={() => {
                    setSelectedUser(friend);
                    friendSelect(stepState, 'name', friend.display_name);
                    friendSelect(stepState, 'avatar', friend.image_url);
                    friendSelect(stepState, 'id', friend.id);
                    // setSearchTerm('');
                    setOpen(false);
                  }}
                >
                  {friend.display_name}
                </CommandItem>
              );
            })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

const Step = ({
  title,
  children,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
  handleFriendSelect,
  stepState,
  formData,
  playersCount,
}) => {
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useUser();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateStep = () => {
    if (
      !isLastStep &&
      (!formData[stepState].name || !formData[stepState].avatar)
    ) {
      setError('Lūdzu, ievadi vārdu un izvēlies ikonu.');
      return false;
    }
    setError('');
    return true;
  };

  const handleNextClick = () => {
    setLoading(true);
    if (validateStep()) {
      onNext();
    }
  };

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

    fetchFriends();
  }, [user]);

  return (
    <Card className='w-11/12 md:w-4/6 lg:w-3/6'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}

        {!isLastStep && !isFirstStep ? (
          <>
            {' '}
            <div className='flex items-center my-4 mx-1'>
              <Separator className='flex-grow shrink ' />
              <span className='px-3 text-sm text-muted-foreground'>VAI</span>
              <Separator className='flex-grow shrink' />
            </div>
            <Popover className='z-[100]' open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant='outline' className='w-full'>
                  {selectedUser ? (
                    <>{selectedUser.display_name} </>
                  ) : (
                    <>
                      {' '}
                      <UserPlus className='w-4 h-4 mr-2' />
                      Pievieno draugu
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
                <FriendsList
                  setOpen={setOpen}
                  friends={friends}
                  setSelectedUser={setSelectedUser}
                  friendSelect={handleFriendSelect}
                  stepState={stepState}
                  formData={formData}
                />
              </PopoverContent>
            </Popover>
          </>
        ) : null}
      </CardContent>
      {error && (
        <div className='text-center'>
          <p className='text-red-500 mb-3'>{error}</p>
        </div>
      )}
      <CardFooter className='flex justify-between'>
        <Button
          //   className={isFirstStep ? 'invisible' : ''}
          onClick={onPrevious}
          //   disabled={isFirstStep}
        >
          <ArrowLeft />
        </Button>
        <Button onClick={handleNextClick}>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {isLastStep || playersCount == stepState
            ? `Sākt spēli`
            : 'Nākamais spēlētājs'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function StepPlayersForm({ playersCount, setBack }) {
  const { user } = useUser();

  const [step, setStep] = useState(1);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [formData, setFormData] = useState([
    { name: user.display_name, avatar: user.image_url, id: user.id },
    { name: '', avatar: '', id: null },
    { name: '', avatar: '', id: null },
    playersCount === 4 && { name: '', avatar: '', id: null },
  ]);

  // Navigate to page after submit
  const router = useRouter();

  // Avatars array upgrade
  if (!avatarValues.includes(user.image_url)) {
    avatarValues.push(user.image_url);
  }

  const updateFormData = (index, field, value) => {
    const newFormData = [...formData];

    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const handleNext = () => {
    if (step < playersCount + 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    setBack(null);
  };

  const handleSubmit = async () => {
    // Create DB connection
    const supabase = createClient();

    const { data, error } = await supabase
      .from('game_players')
      .insert({
        game_creator: user.id,
        player_1: formData[0].name,
        player_1_avatar: formData[0].avatar,
        player_1_id: formData[0].id,
        player_2: formData[1].name,
        player_2_avatar: formData[1].avatar,
        player_2_id: formData[1].id,
        player_3: formData[2].name,
        player_3_avatar: formData[2].avatar,
        player_3_id: formData[2].id,
        player_4: playersCount == 4 ? formData[3].name : null,
        player_4_avatar: playersCount == 4 ? formData[3].avatar : null,
        player_4_id: playersCount == 4 ? formData[3].id : null,
      })
      .select();

    if (error) {
      console.error('Error inserting game players:', error);
    }

    if (data) {
      const { data: scores, error } = await supabase
        .from('game_scores')
        .insert({
          game_id: data[0].id,
          player_1_score: [],
          player_2_score: [],
          player_3_score: [],
          player_4_score: playersCount == 4 ? [] : null,
        })
        .select();

      if (error) {
        console.error('Error inserting game scores:', error);
      }

      if (scores) {
        router.push(`/dashboard/game/${scores[0].game_id}`);
      }
    }
  };

  const renderStepContent = (stepIndex) => {
    // Get the list of avatars already selected in formData
    const selectedAvatars = formData
      .slice(0, stepIndex)
      .map((data) => data.avatar);

    // Filter the avatarValues to exclude already selected avatars if stepIndex is greater than 1
    const availableAvatars =
      stepIndex > 0
        ? avatarValues.filter(
            (avatar) =>
              !selectedAvatars.includes(avatar) && avatar !== user.image_url
          )
        : avatarValues;

    // Avatars array upgrade
    if (formData[stepIndex].avatar.length > 0) {
      if (!availableAvatars.includes(formData[stepIndex].avatar)) {
        availableAvatars.push(formData[stepIndex].avatar);
      }
    }

    return (
      <div className='flex space-x-2 bg-inherit'>
        <Input
          placeholder='Ievadi spēlētāja vārdu'
          value={formData[stepIndex].name}
          onChange={(e) => updateFormData(stepIndex, 'name', e.target.value)}
          className='w-2/3 md:w-4/6 lg:w-4/5'
        />
        <Select
          value={formData[stepIndex].avatar}
          onValueChange={(value) => updateFormData(stepIndex, 'avatar', value)}
        >
          <SelectTrigger className='w-1/3 md:w-2/6 lg:w-1/5'>
            <SelectValue placeholder='Ikona' />
          </SelectTrigger>
          <SelectContent>
            {availableAvatars.map((avatar, key) => (
              <SelectItem value={avatar} key={`avatar_${key}`}>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={avatar} alt={`avatar_${key}`} />
                </Avatar>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  const renderSummary = () => (
    <div className='space-y-4'>
      {formData
        .filter((item) => item.name && item.avatar)
        .map((player, index) => (
          <div key={index} className='flex items-center space-x-4'>
            <Avatar>
              <AvatarImage src={player.avatar} alt={player.name} />
              {/* <AvatarFallback>{player.initials}</AvatarFallback> */}
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>{player.name}</p>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className='flex flex-col items-center justify-center min-h-screen -mt-16'>
      {step === 1 && (
        <Step
          title='Spēlētājs Nr. 1'
          onPrevious={handleBackClick}
          onNext={handleNext}
          isFirstStep={true}
          isLastStep={false}
          stepState={0}
          formData={formData}
        >
          {renderStepContent(0)}
        </Step>
      )}

      {step === 2 && (
        <Step
          title='Spēlētājs Nr. 2'
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirstStep={false}
          isLastStep={false}
          handleFriendSelect={updateFormData}
          stepState={1}
          formData={formData}
        >
          {renderStepContent(1)}
        </Step>
      )}

      {step === 3 && (
        <Step
          title='Spēlētājs Nr. 3'
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirstStep={false}
          isLastStep={false}
          handleFriendSelect={updateFormData}
          stepState={2}
          formData={formData}
          playersCount={playersCount - 1}
        >
          {renderStepContent(2)}
        </Step>
      )}

      {playersCount === 4 && step === 4 && (
        <Step
          title='Spēlētājs Nr. 4'
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirstStep={false}
          isLastStep={false}
          handleFriendSelect={updateFormData}
          stepState={3}
          formData={formData}
          playersCount={playersCount - 1}
        >
          {renderStepContent(3)}
        </Step>
      )}

      {step === playersCount + 1 && (
        <Step
          title='Spēlētāji'
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirstStep={false}
          isLastStep={true}
          stepState={playersCount + 1}
        >
          {renderSummary()}
        </Step>
      )}
    </div>
  );
}
