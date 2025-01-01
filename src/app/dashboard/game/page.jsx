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

import { EuroIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Game() {
  const [playersCount, setPlayersCount] = useState(null);
  const [isEurEnabled, setIsEurEnabled] = useState(false);
  const [eurValue, setEurValue] = useState('');
  const [showStepPlayersForm, setShowStepPlayersForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePlayersCount = (value) => {
    setPlayersCount(value);
  };

  const handleBack = (value) => {
    setShowStepPlayersForm(value);
  };

  const handleEurChange = (e) => {
    const value = e.target.value;

    // Allow only numbers and up to two decimal places, and prevent "00"
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      // Prevent "00" at the start, but allow "0" followed by a non-zero digit
      if (value === '00') {
        setEurValue('0');
        setErrorMessage(''); // Clear error message
      } else if (
        value.startsWith('0') &&
        value.length > 1 &&
        !value.startsWith('0.')
      ) {
        setEurValue(value.slice(1));
        setErrorMessage(''); // Clear error message
      } else {
        setEurValue(value);
        if (value === '') {
          setErrorMessage('Ievadi EUR vērtību'); // Error if empty
        } else if (parseFloat(value) < 0.01) {
          setErrorMessage('EUR vērtība nevar būt mazāka par 0.01'); // Error if less than 0.01
        } else {
          setErrorMessage(''); // Clear error if valid
        }
      }
    }
  };

  return (
    <>
      {!showStepPlayersForm && (
        <div className='min-h-full flex justify-center items-center -mt-16 m-4 pt-6 md:p-8'>
          {' '}
          <Card className='w-max'>
            <CardHeader>
              <CardTitle className='text-center'>
                Izvēlies spēlētāju skaitu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-4'>
                {' '}
                <div className='flex space-x-4 justify-center'>
                  {[3, 4].map((number) => (
                    <PlayersCount
                      key={number}
                      isActive={playersCount === number}
                      number={number}
                      setPlayersCount={handlePlayersCount}
                    />
                  ))}
                </div>
                <Card className='flex-1 p-4 shadow-sm bg-gradient-to-r '>
                  <div className='flex items-center justify-between space-x-4'>
                    <div className='flex items-center space-x-2'>
                      <Switch
                        id='eur-switch'
                        checked={isEurEnabled}
                        onCheckedChange={setIsEurEnabled}
                        className='data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                      />
                      <Label htmlFor='eur-switch' className='font-semibold'>
                        EUR Punktā
                      </Label>
                    </div>

                    {isEurEnabled && (
                      <div className='relative'>
                        <Input
                          type='text'
                          inputMode='decimal'
                          placeholder='0.00'
                          value={eurValue}
                          onChange={handleEurChange}
                          className='w-24 pl-8 pr-4 py-2 bord focus:ring-opacity-50 rounded-md transition-all duration-200'
                          aria-label='EUR amount'
                        />
                        <EuroIcon className='absolute left-2 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5' />
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </CardContent>
            <CardFooter className='flex flex-col justify-center text-center'>
              <div>{`Pagaidām pieejams spēles veids "Galdiņš"`}</div>
              {errorMessage && (
                <div className='text-center'>
                  <p className='text-red-500 mb-3'>{errorMessage}</p>
                </div>
              )}
              <Button
                disabled={playersCount == null}
                className='mt-4'
                onClick={() => {
                  if (
                    isEurEnabled &&
                    (eurValue === '' || parseFloat(eurValue) < 0.01)
                  ) {
                    setErrorMessage(
                      eurValue === ''
                        ? 'Ievadi EUR vērtību'
                        : 'Vērtībai jābūt vismaz 0.01'
                    );
                  } else {
                    setErrorMessage(''); // Clear error message if validation passes
                    setShowStepPlayersForm(true);
                  }
                }}
              >
                Ievadi spēlētājus
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      {showStepPlayersForm && (
        <StepPlayersForm
          playersCount={playersCount}
          eurValue={eurValue}
          isEurEnabled={isEurEnabled}
          setBack={handleBack}
        />
      )}
    </>
  );

  // return (
  //   // <PlayersForm playersCount={playersCount} setBack={handlePlayersCount} />
  //   <StepPlayersForm playersCount={playersCount} setBack={handlePlayersCount} />
  // );
}

// const PlayersCount = ({ number, setPlayersCount }) => {
//   const handleClick = () => {
//     setPlayersCount(number);
//   };
//   return (
//     <Button
//       aria-label={`palyer-count-${number}`}
//       className='flex-1'
//       onClick={handleClick}
//     >
//       {number}
//     </Button>
//   );
// };

const PlayersCount = ({ number, setPlayersCount, isActive }) => {
  const handleClick = () => {
    setPlayersCount(number);
  };

  return (
    <Button
      aria-label={`player-count-${number}`}
      aria-pressed={isActive}
      className={`flex-1 ${isActive ? '' : ''}`}
      onClick={handleClick}
      variant={isActive ? 'default' : 'outline'}
    >
      {number}
    </Button>
  );
};
