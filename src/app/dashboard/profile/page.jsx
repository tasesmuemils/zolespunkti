'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';
import { createClient } from '@/utils/superbase/client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Profile() {
  const [displayName, setDisplayName] = useState(null);
  // const [imageURL, setImageURL] = useState(null);
  // const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();

  if (!user) {
    return (
      <div className='relative block z-30 mx-auto max-w-md mb-10'>
        {' '}
        <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
          <Skeleton className=' h-56 w-full' />
        </div>
      </div>
    );
  }

  const handleNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const supabase = createClient();

    const { data: updatedUser, error } = await supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('id', user.id)
      .select();

    console.log(updatedUser);

    if (updatedUser) {
      setUser(updatedUser[0]);
      toast(`Spēlētāja vārds nomainīts! 😎`);
      setDisplayName(null);
    }
  };

  // const handleURLChange = (e) => {
  //   setImageURL(e.target.value);
  // };

  // const handleDialog = () => {
  //   setOpen(false);
  // };

  console.log(displayName);

  if (user) {
    return (
      <ScrollArea className='h-full'>
        {' '}
        <div className='m-4 pt-6 md:p-8'>
          <Card className='mx-auto max-w-lg'>
            <CardHeader>
              <CardTitle className='flex flex-col justify-center text-center'>
                {' '}
                <div className='flex justify-center'>
                  <Avatar className='text-center'>
                    <AvatarImage src={user.image_url} />
                    {/* <AvatarFallback>JP</AvatarFallback> */}
                  </Avatar>
                </div>
                <div className='text-center pt-4'>
                  <h2 className='text-xl font-bold text-foreground'>
                    {user.display_name}
                  </h2>
                  <p className='text-base text-muted-foreground'>
                    {user.email}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {' '}
              <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
                {/* <div>
                  <div className='mt-1 flex items-center'>
                    <Avatar className='ring-4 ring-background'>
                      <AvatarImage src={user.image_url} />
                    </Avatar>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild className='ml-4'>
                        <Button variant='outline'>Mainīt bildi</Button>
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                          <DialogTitle>Nomainīt bildi</DialogTitle>
                          <DialogDescription>
                            Profila bildi NEVAR augšuplādēt. Izmanto bildi ar
                            URL
                          </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                          <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='name' className='text-right'>
                              URL
                            </Label>
                            <Input
                              id='image_url'
                              // defaultValue='Pedro Duarte'
                              className='col-span-3'
                              defaultValue={user.image_url}
                              onChange={handleURLChange}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleDialog}>Mainīt</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div> */}
                <div>
                  <Label htmlFor='displayName'>Spēlētāja vārds</Label>
                  <Input
                    id='displayName'
                    type='text'
                    defaultValue={user.display_name}
                    className='mt-1'
                    onChange={handleNameChange}
                  />
                </div>
                <Button
                  disabled={!displayName}
                  type='submit'
                  className='w-full'
                >
                  Saglabāt izmaiņas
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    );
  }
}
