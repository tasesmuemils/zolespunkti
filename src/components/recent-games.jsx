'use client';
import { createClient } from '../utils/superbase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from './ui/separator';

export function RecentGames({ user }) {
  const [games, setGames] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const supabase = createClient();
      const { data: db_games, error } = await supabase
        .from('game_players')
        .select(`*, game_scores(*)`)

        .order('created_at', { ascending: false });

      if (db_games) {
        setGames(db_games);
      }
    };

    getData();
  }, [user.id]);

  if (!games) {
    return (
      <>
        {' '}
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
        <div className='flex items-center space-x-4 pt-4'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
        <div className='flex items-center space-x-4 pt-4'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      </>
    );
  }

  // If no games yet
  if (games.length == 0) {
    return <p>{`Spied "Jauna spēle" un sāc skaitīt punktus`}</p>;
  }

  if (games) {
    return (
      <div className='space-y-8'>
        {games.map((game, index) => (
          <div key={index}>
            {' '}
            <div
              key={`game_${game.id}`}
              className='flex items-center flex-wrap'
            >
              <Avatar className='h-9 w-9'>
                {/* <AvatarImage src='/avatars/01.png' alt='Avatar' /> */}
                <AvatarFallback>
                  {game.game_scores.player_1_score.length}
                </AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {format(game.created_at, 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              <div className='ml-auto font-medium'>
                {index == 0 ? (
                  <Link href={`/dashboard/game/${game.id}`}>
                    <Button className='text-xs md:text-sm'>Turpināt</Button>
                  </Link>
                ) : (
                  <Button className='invisible'>Turpināt</Button>
                )}
              </div>
            </div>
            <div className='flex flex-wrap pt-3 gap-1 text-sm text-muted-foreground'>
              <Badge variant='outline' className='flex flex-wrap text-wrap'>
                {game.player_1}
              </Badge>
              <Badge variant='outline' className=''>
                {game.player_2}
              </Badge>
              <Badge variant='outline' className=''>
                {game.player_3}
              </Badge>
              {game.player_4 && (
                <Badge variant='outline' className=''>
                  {game.player_4}
                </Badge>
              )}
            </div>
            <Separator className='mt-4' />
          </div>
        ))}
      </div>
    );
  }
}
