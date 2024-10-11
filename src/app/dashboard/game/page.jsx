'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PlayersForm from '@/components/players-form';
import StepPlayersForm from '@/components/step-players-form';

export default function Game() {
  const [playersCount, setPlayersCount] = useState(null);

  const handlePlayersCount = (value) => {
    setPlayersCount(value);
  };

  if (!playersCount) {
    return (
      <div className='min-h-full flex justify-center items-center -mt-16 m-4 pt-6 md:p-8'>
        {' '}
        <Card className='w-max'>
          <CardHeader>
            <CardTitle className='text-center'>
              Izvēlies spēlētāju skaitu
            </CardTitle>
            {/* <CardDescription>
              Deploy your new project in one-click.
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className='flex space-x-4 justify-center'>
              <PlayersCount number={3} setPlayersCount={handlePlayersCount} />
              <PlayersCount number={4} setPlayersCount={handlePlayersCount} />
            </div>
          </CardContent>
          <CardFooter className='flex justify-center text-center'>
            {`Pagaidām pieejams spēles veids "Galdiņš"`}
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    // <PlayersForm playersCount={playersCount} setBack={handlePlayersCount} />
    <StepPlayersForm playersCount={playersCount} setBack={handlePlayersCount} />
  );
}

const PlayersCount = ({ number, setPlayersCount }) => {
  const handleClick = () => {
    setPlayersCount(number);
  };
  return (
    <Button
      aria-label={`palyer-count-${number}`}
      className='flex-1'
      onClick={handleClick}
    >
      {number}
    </Button>
  );
};
