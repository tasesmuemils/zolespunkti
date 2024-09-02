'use client';
// import { redirect } from 'next/navigation';
// import { createClient } from '../../utils/superbase/server';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { RecentGames } from '@/components/recent-games';
import { useUser } from '@/hooks/useUser';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserSearch } from '@/components/search-users';

export default function PrivatePage() {
  const { user } = useUser();
  console.log(user);

  // Set user ID global
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // // console.log(userId);

  // if (!user) {
  //   return redirect('/');
  // }

  // console.log(user);

  if (!user) {
    <div>test</div>;
  }

  // console.log(user);

  if (user) {
    return (
      <ScrollArea className='h-full'>
        <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
          {' '}
          <div className='flex items-center justify-between space-y-2'>
            {/* <UserInfo userData={user} /> */}
            <h2 className='text-xl md:text-3xl font-bold tracking-tight'>
              Čau, {user.display_name} 👋
            </h2>
            <div className='flex items-center space-x-2'>
              <Link href='/dashboard/game'>
                <Button className='text-xs md:text-sm'>Jauna spēle</Button>
              </Link>
              {/* <CalendarDateRangePicker /> */}
            </div>
          </div>
          <Separator />
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-4 md:col-span-3'>
              <CardHeader>
                <CardTitle className='text-xl md:text-2xl'>
                  Pēdējās spēles
                </CardTitle>
                <CardDescription>Pēdējo spēļu saraksts</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentGames user={user} />
              </CardContent>
            </Card>
            {/* <Card className='col-span-4 md:col-span-3'>
              <CardHeader className='flex flex-row justify-between items-center'>
                <CardTitle className='text-xl md:text-2xl'>Draugi</CardTitle>
                <Dialog>
                  <DialogTrigger>
                    <Button variant='outline'>Uzaicini draugus</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Uzaicini draugus</DialogTitle>
                      <DialogDescription>
                        Meklē draugus pēc lietotājvārda
                      </DialogDescription>
                    </DialogHeader>
                    <UserSearch />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent></CardContent>
            </Card> */}
          </div>
        </div>
      </ScrollArea>
    );
  }
}
