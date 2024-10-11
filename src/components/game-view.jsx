'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Controls } from '@/components/controls';
import { useState, useEffect, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import DeleteLastScore from '@/components/delete-last-score';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';
const InfoIcon = Icons['info'];

export default function GameView({ gamedata, gamescore }) {
  const [score, setScore] = useState(gamescore);

  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current != null) {
      scrollRef.current.parentElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [score]);

  const data = gamedata;

  const players = [
    {
      order: 1,
      player: data.player_1,
      player_avatar: data.player_1_avatar,
      score: score.player_1_score,
    },
    {
      order: 2,
      player: data.player_2,
      player_avatar: data.player_2_avatar,
      score: score.player_2_score,
    },
    {
      order: 3,
      player: data.player_3,
      player_avatar: data.player_3_avatar,
      score: score.player_3_score,
    },
  ];

  if (data.player_4 != null) {
    players.push({
      order: 4,
      player: data.player_4,
      player_avatar: data.player_4_avatar,
      score: score.player_4_score,
    });
  }

  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
  };

  // Leaderboard array sorted (sort changes the main array)
  const origCopy = players.filter((player) => player);
  const leaderBoard = origCopy
    .sort((a, b) => {
      const lastScoreA = a.score[a.score.length - 1];
      const lastScoreB = b.score[b.score.length - 1];
      return lastScoreB - lastScoreA;
    })
    .map((player, index) => {
      let extraValue;
      switch (index) {
        case 0:
          extraValue = '🥇';
          break;
        case 1:
          extraValue = '🥈';
          break;
        case 2:
          extraValue = '🥉';
          break;
        case 3:
          extraValue = '🏅';
          break;
        // Add more cases if there are more players
        default:
          extraValue = 'default';
      }
      return {
        ...player,
        medal: extraValue,
      };
    });

  const avatarBorder = players[0].score.length % players.length;

  return (
    <Card
      className='relative block z-30 mx-auto max-w-md mb-10'
      ref={scrollRef}
    >
      <Sheet>
        <SheetTrigger className='flex-1 w-full sticky bg-background top-0 z-30 border-b justify-center items-center'>
          <CardHeader
            className={`relative grid ${
              players.length == 3 ? 'grid-cols-3' : 'grid-cols-4'
            } sticky bg-background top-0 z-30 border-b justify-center items-center`}
          >
            <Button
              variant='outline'
              className='absolute -top-2 -left-2 w-8 h-8'
              size='icon'
            >
              <InfoIcon className='w-4 h-4' />
            </Button>
            {players.map((player, key) => (
              <div
                style={{ margin: '0px' }}
                key={key}
                className='grid justify-center items-center'
              >
                <div
                  className={`inline-block rounded-full p-[4.5px] ${
                    key == avatarBorder ? 'bg-primary' : ''
                  }`}
                >
                  {' '}
                  <Avatar className='h-12 w-12 m-0 border-spacing-4'>
                    <AvatarImage
                      src={player.player_avatar}
                      alt={`avatar_${key}`}
                    />
                  </Avatar>
                </div>
              </div>
            ))}
          </CardHeader>
        </SheetTrigger>
        <SheetContent side='bottom'>
          <Card className='mx-auto max-w-md'>
            <CardHeader>
              <div className='flex flex-row justify-between items-center'>
                <h1>Spēlētāji</h1>
                <div className='flex space-x-2 flex-row justify-center items-center'>
                  <h4 className=' text-sm'>Partijas</h4>
                  <Avatar className='h-7 w-7'>
                    <AvatarFallback>{players[0].score.length}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              {' '}
              {leaderBoard.map((player, index) => (
                <div key={index} className='flex items-center gap-4'>
                  <p className='text-2xl'>{player.medal}</p>
                  <div
                    className={`inline-block rounded-full p-[4.5px] ${
                      index == avatarBorder ? 'bg-primary' : ''
                    }`}
                  >
                    {' '}
                    <Avatar className={`h-12 w-12 m-0 `}>
                      <AvatarImage
                        src={player.player_avatar}
                        alt={`avatar_${player.player}`}
                      />
                    </Avatar>
                  </div>

                  <div>
                    <p>{player.player}</p>
                    <div className='flex space-x-2 pt-1'>
                      <Badge>
                        {player.score.slice(-1)[0] != undefined
                          ? player.score.slice(-1)[0]
                          : 0}
                      </Badge>

                      {index == avatarBorder && (
                        <Badge variant='outline'>Dalītājs</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>

      <CardContent>
        <ScoreRows
          score={score}
          rowsCount={players[0].score.length}
          players={players}
          onScoreUpdate={handleScoreUpdate}
        />
      </CardContent>
      <CardFooter className='flex justify-center'>
        {/* <div></div> */}
        <Controls
          onScoreUpdate={handleScoreUpdate}
          gameId={data.id}
          players={players}
        />
      </CardFooter>
    </Card>
  );
}

const ScoreRows = ({ score, rowsCount, players, onScoreUpdate }) => {
  const arr = [];
  for (let i = 0; i < rowsCount; i++) {
    arr.push(
      <div key={i}>
        <div
          className={`relative grid grid-cols-${players.length} justify-center items-center`}
        >
          {' '}
          <Point i={i} score={players[0].score[i]} rowsCount={rowsCount} />
          <Point i={i} score={players[1].score[i]} rowsCount={rowsCount} />
          <Point i={i} score={players[2].score[i]} rowsCount={rowsCount} />
          {players.length != 3 && (
            <Point i={i} score={players[3].score[i]} rowsCount={rowsCount} />
          )}
          {i == rowsCount - 1 && (
            <DeleteLastScore score={score} onScoreUpdate={onScoreUpdate} />
          )}
        </div>
        <Separator />
      </div>
    );
  }

  return <div>{arr}</div>;
};

const Point = ({ i, score, rowsCount }) => {
  return (
    <div
      className={`flex justify-center px-3 sm:px-6 py-4  ${
        i == rowsCount - 1 &&
        ' font-extrabold transition-all duration-500 demo-dark:text-slate-100'
      } `}
    >
      {i == rowsCount - 1 ? (
        <Badge className='text-base'>{score}</Badge>
      ) : (
        score
      )}
    </div>
  );
};
