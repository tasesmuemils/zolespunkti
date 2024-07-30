'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/superbase/client';
import { useUser } from '@/hooks/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { avatarsArray } from '@/constants/data';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Icons } from '@/components/icons';

const BackIcon = Icons['arrowLeft'];

// Extract the values from avatarsArray
const avatarValues = avatarsArray.map((avatar) => avatar.value);

// Create a custom validation function
const isAvatarValue = (value) => avatarValues.includes(value);

const baseFormSchema = z.object({
  player: z
    .string({ message: 'Vārds ir obligāts' })
    .min(2, { message: 'Vārdam jāsatur vismaz 2 simboli' })
    .max(50, { message: 'Vārds nedrīkst saturēt vairāk kā 20 simbolus' }),
  player_avatar: z.string().refine(isAvatarValue, {
    message: 'Izvēlies ikonu',
  }),
});

export const createFormSchema = (playersCount) => {
  const playerSchemas = {};

  for (let i = 1; i <= playersCount; i++) {
    playerSchemas[`player_${i}`] = baseFormSchema.shape.player;
    playerSchemas[`player_${i}_avatar`] = baseFormSchema.shape.player_avatar;
  }

  return z.object(playerSchemas);
};

export default function PlayersForm({ playersCount, setBack }) {
  const [selectedAvatar, setSelectedAvatar] = useState([
    { value: [] },
    { value: [] },
    { value: [] },
    playersCount == 4 && { value: [] },
  ]);

  const handleBackClick = (e) => {
    e.preventDefault();
    setBack(null);
  };

  // Grab user data
  const { user } = useUser();

  // Create DB connection
  const supabase = createClient();

  // Navigate to page after submit
  const router = useRouter();

  avatarValues.push(user.image_url);

  const formSchema = createFormSchema(playersCount);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      player_1: user.display_name,
      player_1_avatar: user.image_url,
      player_2: '',
      player_2_avatar: '',
      player_3: '',
      player_3_avatar: '',
      player_4: '',
      player_4_avatar: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    let { data: game_id, error } = await supabase
      .rpc('game_create', {
        arg_game_creator: user.id,
        arg_player_1: values.player_1,
        arg_player_1_avatar: values.player_1_avatar,
        arg_player_1_score: [],
        arg_player_2: values.player_2,
        arg_player_2_avatar: values.player_2_avatar,
        arg_player_2_score: [],
        arg_player_3: values.player_3,
        arg_player_3_avatar: values.player_3_avatar,
        arg_player_3_score: [],
        arg_player_4: playersCount == 4 ? values.player_4 : null,
        arg_player_4_avatar: playersCount == 4 ? values.player_4_avatar : null,
        arg_player_4_score: playersCount == 4 ? [] : null,
      })
      .single();
    // console.log(error);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    router.push(`/dashboard/game/${game_id}`);
    // console.log(values);
  }

  const handleValueChange = (value, field, number) => {
    field.onChange(value);

    setSelectedAvatar(
      selectedAvatar.map((item) => {
        if (selectedAvatar.indexOf(item) === number) {
          return value;
        } else {
          return item;
        }
      })
    );
  };

  return (
    <ScrollArea className='h-full'>
      {' '}
      <div className='m-4 pt-6 md:p-8'>
        {' '}
        <Card className='mx-auto max-w-md'>
          <CardHeader>
            <CardTitle className='text-center'>
              Ievadi spēlētāju vārdus un izvēlies ikonu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 mx-auto max-w-md'
              >
                {/* Player_1 */}
                <div className='grid grid-cols-[70%_30%] gap-2'>
                  {' '}
                  <FormField
                    control={form.control}
                    name='player_1'
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Username</FormLabel> */}
                        <FormControl>
                          <Input
                            {...field}
                            id='player1'
                            placeholder='Ievadi vārdu'
                          />
                          {/* <Input placeholder='shadcn' {...field} /> */}
                        </FormControl>

                        {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='player_1_avatar'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(e) =>
                              handleValueChange(e, field, 0)
                            }
                            defaultValue={field.value}
                            className='h-96'
                          >
                            <SelectTrigger>
                              <SelectValue placeholder='Ikona'>
                                {field.value && (
                                  <Avatar className='w-[2rem] h-[2rem]'>
                                    <AvatarImage
                                      src={field.value}
                                      alt={`avatar_0`}
                                    />
                                  </Avatar>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {avatarsArray
                                .filter(
                                  (icon) =>
                                    icon.value !=
                                    selectedAvatar
                                      .map((stateIcon) => stateIcon)
                                      .filter((key) => key == icon.value)
                                )
                                .map((avatar, key) => (
                                  <SelectItem
                                    value={avatar.value}
                                    key={`avatar_${key}`}
                                  >
                                    <Avatar className='h-9 w-9'>
                                      <AvatarImage
                                        src={avatar.value}
                                        alt={`avatar_${key}`}
                                      />
                                    </Avatar>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Player_2 */}
                <div className='grid grid-cols-[70%_30%] gap-2'>
                  {' '}
                  <FormField
                    control={form.control}
                    name='player_2'
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Username</FormLabel> */}
                        <FormControl>
                          <Input
                            {...field}
                            id='player2'
                            placeholder='Ievadi vārdu'
                          />
                          {/* <Input placeholder='shadcn' {...field} /> */}
                        </FormControl>

                        {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='player_2_avatar'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(e) =>
                              handleValueChange(e, field, 1)
                            }
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder='Ikona'>
                                {' '}
                                {field.value && (
                                  <Avatar className='w-[2rem] h-[2rem]'>
                                    <AvatarImage
                                      src={field.value}
                                      alt={`avatar_1`}
                                    />
                                  </Avatar>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {avatarsArray
                                .filter(
                                  (icon) =>
                                    icon.value !=
                                    selectedAvatar
                                      .map((stateIcon) => stateIcon)
                                      .filter((key) => key == icon.value)
                                )
                                .map((avatar, key) => (
                                  <SelectItem
                                    value={avatar.value}
                                    key={`avatar_${key}`}
                                  >
                                    <Avatar className='h-9 w-9'>
                                      <AvatarImage
                                        src={avatar.value}
                                        alt={`avatar_${key}`}
                                      />
                                    </Avatar>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Player_3 */}
                <div className='grid grid-cols-[70%_30%] gap-2'>
                  {' '}
                  <FormField
                    control={form.control}
                    name='player_3'
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Username</FormLabel> */}
                        <FormControl>
                          <Input
                            {...field}
                            id='player3'
                            placeholder='Ievadi vārdu'
                          />
                          {/* <Input placeholder='shadcn' {...field} /> */}
                        </FormControl>

                        {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='player_3_avatar'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(e) =>
                              handleValueChange(e, field, 2)
                            }
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder='Ikona'>
                                {' '}
                                {field.value && (
                                  <Avatar className='w-[2rem] h-[2rem]'>
                                    <AvatarImage
                                      src={field.value}
                                      alt={`avatar_2`}
                                    />
                                  </Avatar>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {avatarsArray
                                .filter(
                                  (icon) =>
                                    icon.value !=
                                    selectedAvatar
                                      .map((stateIcon) => stateIcon)
                                      .filter((key) => key == icon.value)
                                )
                                .map((avatar, key) => (
                                  <SelectItem
                                    value={avatar.value}
                                    key={`avatar_${key}`}
                                  >
                                    <Avatar className='h-9 w-9'>
                                      <AvatarImage
                                        src={avatar.value}
                                        alt={`avatar_${key}`}
                                      />
                                    </Avatar>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Player_4 */}
                {playersCount == 4 && (
                  <div className='grid grid-cols-[70%_30%] gap-2'>
                    {' '}
                    <FormField
                      control={form.control}
                      name='player_4'
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Username</FormLabel> */}
                          <FormControl>
                            <Input
                              {...field}
                              id='player4'
                              placeholder='Ievadi vārdu'
                            />
                            {/* <Input placeholder='shadcn' {...field} /> */}
                          </FormControl>

                          {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='player_4_avatar'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={(e) =>
                                handleValueChange(e, field, 3)
                              }
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder='Ikona'>
                                  {' '}
                                  {field.value && (
                                    <Avatar className='w-[2rem] h-[2rem]'>
                                      <AvatarImage
                                        src={field.value}
                                        alt={`avatar_3`}
                                      />
                                    </Avatar>
                                  )}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {avatarsArray
                                  .filter(
                                    (icon) =>
                                      icon.value !=
                                      selectedAvatar
                                        .map((stateIcon) => stateIcon)
                                        .filter((key) => key == icon.value)
                                  )
                                  .map((avatar, key) => (
                                    <SelectItem
                                      value={avatar.value}
                                      key={`avatar_${key}`}
                                    >
                                      <Avatar className='h-9 w-9'>
                                        <AvatarImage
                                          src={avatar.value}
                                          alt={`avatar_${key}`}
                                        />
                                      </Avatar>
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className='flex justify-between items-center'>
                  <Button variant='outline' onClick={handleBackClick}>
                    <BackIcon />
                  </Button>
                  <Button type='submit'>Sākt spēli</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
