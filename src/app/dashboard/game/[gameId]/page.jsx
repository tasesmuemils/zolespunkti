'use client';

import { createClient } from '../../../../utils/superbase/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import GameView from '@/components/game-view';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function GameViewPage({ params }) {
  const [gamePlayers, setGamePlayers] = useState(null);
  const [gameScore, setGameScore] = useState(null);
  const [User, setUser] = useState(null);
  const [updateKey, setUpdateKey] = useState(0);

  // Navigate to page after submit
  const router = useRouter();

  const handleRealtimeUpdate = useCallback((table, payload) => {
    const { eventType, new: newRecord } = payload;

    if (
      eventType === 'INSERT' ||
      eventType === 'UPDATE' ||
      eventType === 'DELETE'
    ) {
      if (table === 'game_players') {
        setGamePlayers((prev) => ({ ...prev, ...newRecord }));
      } else if (table === 'game_scores') {
        setGameScore((prev) => ({ ...prev, ...newRecord }));
      }
      setUpdateKey((prevKey) => prevKey + 1); // Force re-render
    }
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const check = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      const { data: game_players, error: er } = await supabase
        .from('game_players')
        .select()
        .eq('id', params.gameId);

      if (er) {
        console.error('error', er);
      }

      if (game_players) {
        setGamePlayers(game_players[0]);
      }

      const { data: game_score, error: err } = await supabase
        .from('game_scores')
        .select()
        .eq('game_id', params.gameId);

      if (err) {
        console.error('error', err);
      }

      if (game_score) {
        setGameScore(game_score[0]);
      }
    };

    check();

    // Set up real-time subscriptions
    const gamePlayersChannel = supabase
      .channel('game_players_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_players',
          filter: `id=eq.${params.gameId}`,
        },
        (payload) => handleRealtimeUpdate('game_players', payload)
      )
      .subscribe();

    const gameScoresChannel = supabase
      .channel('game_scores_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_scores',
          filter: `game_id=eq.${params.gameId}`,
        },
        (payload) => handleRealtimeUpdate('game_scores', payload)
      )
      .subscribe();

    // Cleanup function
    return () => {
      supabase.removeChannel(gamePlayersChannel);
      supabase.removeChannel(gameScoresChannel);
    };
  }, [params.gameId, router, handleRealtimeUpdate]);

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

  // Check if the User.id matches any of the player IDs
  const isUserInGame = [
    gamePlayers.player_1_id,
    gamePlayers.player_2_id,
    gamePlayers.player_3_id,
    gamePlayers.player_4_id,
  ].includes(User.id);

  // If the user is not in the game, redirect to dashboard
  if (!isUserInGame) {
    router.push(`/dashboard`);
    return (
      <div className='relative block z-30 mx-auto max-w-md mb-10'>
        {' '}
        <div className='flex-1 space-y-4 p-4 pt-6 md:p-8 '>
          <Skeleton className=' h-56 w-full' />
        </div>
      </div>
    );
  }

  if (gamePlayers && gameScore) {
    // console.log('first gamescore', gameScore, gamePlayers);
    return (
      <ScrollArea className='h-full'>
        <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
          <GameView
            key={updateKey}
            gamedata={gamePlayers}
            gamescore={gameScore}
          />
        </div>

        {/* <pre>{JSON.stringify(game_players, null, 2)}</pre> */}
      </ScrollArea>
    );
  }
}
