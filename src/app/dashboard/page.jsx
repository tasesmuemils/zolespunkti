'use client';
import { useState, useEffect } from 'react';
// import { redirect } from 'next/navigation';
// import { createClient } from '../../utils/superbase/server';
// import { LoaderCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';

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
// import VersionUpdate from '@/components/version-update';

export default function PrivatePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  // console.log(user);

  // console.log('TEST', isDialogOpen);

  if (user) {
    return (
      <ScrollArea className='h-full'>
        {/* <VersionUpdate /> */}
        <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
          {' '}
          <div className='flex items-center justify-between space-y-2'>
            {/* <UserInfo userData={user} /> */}
            <h2 className='text-xl md:text-3xl font-bold tracking-tight'>
              Čau, {user.display_name} 👋
            </h2>
            <div className='flex items-center space-x-2'>
              <Link href='/dashboard/game'>
                <Button
                  className='text-xs md:text-sm'
                  onClick={() => setLoading(true)}
                >
                  {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  Jauna spēle
                </Button>
              </Link>
              {/* <CalendarDateRangePicker /> */}
            </div>
          </div>
          <Separator />
          {/* <StatsBox /> */}
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
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger>
                    <Button
                      variant='outline'
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Uzaicini draugus
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Uzaicini draugus</DialogTitle>
                      <DialogDescription>
                        Meklē draugus pēc lietotājvārda
                      </DialogDescription>
                    </DialogHeader>
                    <UserSearch
                      userId={user.id}
                      closeDialog={() => setIsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <FriendsList />
              </CardContent>
            </Card> */}
          </div>
        </div>
      </ScrollArea>
    );
  }
}
