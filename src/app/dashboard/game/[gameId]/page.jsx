'use client';

import { createClient } from '../../../../utils/superbase/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import GameView from '@/components/game-view';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function GameViewPage({ params }) {
  const [gamePlayers, setGamePlayers] = useState(null);
  const [gameScore, setGameScore] = useState(null);
  const [User, setUser] = useState(null);

  // Navigate to page after submit
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      const { data: game_players } = await supabase
        .from('game_players')
        .select()
        .eq('id', params.gameId);

      if (game_players) {
        setGamePlayers(game_players[0]);
      }

      const { data: game_score } = await supabase
        .from('game_scores')
        .select()
        .eq('game_id', params.gameId);

      if (game_score) {
        setGameScore(game_score[0]);
      }
    };

    check();
  }, [params.gameId, router]);

  if (!gamePlayers || !gameScore || !User) {
    return (
      <div className='relative block z-30 mx-auto max-w-md mb-10'>
        {' '}
        <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
          <Skeleton className=' h-56 w-full' />
        </div>
      </div>
    );
  }

  // console.log('TEST', User.id, gamePlayers);

  // If not the same user, redirect to user page
  if (User.id !== gamePlayers.game_creator) {
    router.push(`/dashboard`);
    // return <div>TEST</div>;
    return (
      <div className='relative block z-30 mx-auto max-w-md mb-10'>
        {' '}
        <div className='flex-1 space-y-4 p-4 pt-6 md:p-8 '>
          <Skeleton className=' h-56 w-full' />
        </div>
      </div>
    );
  }

  if (gamePlayers && gameScore && User.id == gamePlayers.game_creator) {
    return (
      <ScrollArea className='h-full'>
        <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
          <GameView gamedata={gamePlayers} gamescore={gameScore} />
        </div>

        {/* <pre>{JSON.stringify(game_players, null, 2)}</pre> */}
      </ScrollArea>
    );
  }
}
