import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

import { scoreTable } from '@/constants/data';

import { createClient } from '../utils/superbase/client';

const AddIcon = Icons['add'];

export function Controls({ players, gameId, onScoreUpdate, scenarios }) {
  const [winner, setWinner] = useState(null); // sets winner name
  const [gameType, setGameType] = useState(null); // sets gametype
  const [lielais, setLielais] = useState(null); // sets "Lielais"
  const [openTranslationModal, setOpenTranslationModal] = useState(false);
  const [open, setOpen] = useState(false);

  // Reset states on Modal close
  const resetStates = () => {
    setWinner(null);
    setGameType(null);
    setLielais(null);
  };

  // Handle game type option
  const handleGameTypeClick = (e) => {
    setGameType(e.target.textContent);
  };

  // Handle lielais win or lose
  const handleLielais = (e) => {
    setLielais(e.target.textContent);
  };

  // Handle winner
  const handleWinner = (e) => {
    setWinner(e.target.textContent);
  };

  // Reset stats if modal closes
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetStates();
    }
  };

  // Handle scenario
  const handleScenario = async (value, gameId) => {
    console.log(value, gameId, winner, gameType, lielais);

    const arr = players.map((player) => {
      if (player.player == winner) {
        player.score.length > 0
          ? player.score.push(
              player.score[player.score.length - 1] + value['Lielajam']
            )
          : player.score.push(value['Lielajam']);
      } else {
        player.score.length > 0
          ? player.score.push(
              player.score[player.score.length - 1] + value['1.mazajam']
            )
          : player.score.push(value['1.mazajam']);
      }
      return player;
    });

    handleOpenChange(false);

    // EDIT MAZA ZOLE & GALDINS lielais state
    let lielaisEdit = null;
    if (
      (gameType == 'Mazā zole' || gameType == 'Galdiņš') &&
      value.Lielajam > 0
    ) {
      lielaisEdit = 'Uzvarēja';
    } else if (
      (gameType == 'Mazā zole' || gameType == 'Galdiņš') &&
      value.Lielajam < 0
    ) {
      lielaisEdit = 'Zaudēja';
    } else {
      lielaisEdit = lielais;
    }

    // console.log('arr', arr);
    // console.log(winner, gameType, lielais);

    // Record data to DB
    const supabase = createClient();

    const { data: updatedScores, error } = await supabase
      .from('game_scores')
      .update({
        player_1_score: arr[0].score,
        player_2_score: arr[1].score,
        player_3_score: arr[2].score,
        player_4_score: arr.length == 4 ? arr[3].score : null,
        scenarios:
          scenarios != null
            ? [...scenarios, { W: winner, GT: gameType, L: lielaisEdit }]
            : null,
      }) // Assuming 'data' is the jsonb column
      .eq('game_id', gameId)
      .select();

    // Send newly updated data to parent
    if (updatedScores) {
      onScoreUpdate(updatedScores[0]);
    }

    // resetStates();
  };

  // Dont show scenario page for gametype "Galdiņš"
  if (gameType == 'Galdiņš' && winner) {
    // setOpen(false);
    // return <Skeleton className='w-[100px] h-[20px] rounded-full' />;
    handleScenario(
      scoreTable[gameType]['Spēlētājs, kurš zaudē'][players.length],
      gameId
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='secondary'>
          <AddIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] max-w-[95%] rounded-lg'>
        {/* CHOOSE GAME TYPE */}
        {!gameType && (
          <>
            <DialogHeader>
              <DialogTitle className='flex justify-center'>
                Spēles veids
              </DialogTitle>
              <DialogDescription>
                {/* Make changes to your profile here. Click save when you're done. */}
              </DialogDescription>
            </DialogHeader>{' '}
            <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
              {Object.keys(scoreTable).map((gameType, index) => (
                <ControlsButton
                  key={gameType + index + 1}
                  text={gameType}
                  index={index}
                  onClickFunction={handleGameTypeClick}
                />
              ))}
            </div>
          </>
        )}

        {/* IF GAMETYPE IS LIELAIS OR ZOLE AND WE KNOW A WINNER BUT DONT KNOW LIELAIS */}
        {gameType &&
          (gameType == 'Lielais' || gameType == 'Zole') &&
          winner &&
          !lielais && (
            <>
              {' '}
              <DialogHeader>
                <DialogTitle className='flex justify-center'>
                  Lielais...
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>{' '}
              <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
                <Button variant='outline' onClick={handleLielais}>
                  Uzvarēja
                </Button>
                <Button variant='outline' onClick={handleLielais}>
                  Zaudēja
                </Button>
              </div>
            </>
          )}

        {/* WHO WAS LIELAIS */}
        {gameType && gameType != 'Galdiņš' && !winner && (
          <>
            <DialogHeader>
              <DialogTitle className='flex justify-center'>
                {`Kurš bija "Lielais"?`}
              </DialogTitle>
              <DialogDescription>
                {/* Make changes to your profile here. Click save when youre done. */}
              </DialogDescription>
            </DialogHeader>{' '}
            <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
              {players.map((player, index) => {
                return (
                  <ControlsButton
                    key={player.player + index + 1}
                    text={player.player}
                    index={index}
                    onClickFunction={handleWinner}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* IF GAME TYPE GALDINS */}
        {gameType && gameType == 'Galdiņš' && !winner && (
          <>
            <DialogHeader>
              <DialogTitle className='flex justify-center'>
                {`Kurš spēlētājs zaudēja?`}
              </DialogTitle>
              <DialogDescription>
                {/* Make changes to your profile here. Click save when youre done. */}
              </DialogDescription>
            </DialogHeader>{' '}
            <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
              {players.map((player, index) => {
                return (
                  <ControlsButton
                    key={player.player + index + 1}
                    text={player.player}
                    index={index}
                    onClickFunction={handleWinner}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* IF GAME TYPE MAZA ZOLE == SCENARIO */}
        {gameType == 'Mazā zole' && winner && (
          <>
            <DialogHeader>
              <DialogTitle className='flex justify-center'>
                {`Kurš scenārijs tika izspēlēts?`}
              </DialogTitle>
              <DialogDescription>
                {/* Make changes to your profile here. Click save when youre done. */}
              </DialogDescription>
            </DialogHeader>{' '}
            <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
              {Object.keys(scoreTable[gameType]).map((scenario, index) => (
                <ControlsButton
                  key={scenario + index + 1}
                  text={scenario}
                  index={index}
                  onClickFunction={() =>
                    handleScenario(
                      scoreTable[gameType][scenario][players.length],
                      gameId
                    )
                  }
                />
              ))}
            </div>
          </>
        )}

        {/* IF LIELAIS */}
        {lielais && (
          <>
            <DialogHeader>
              <DialogTitle className='flex justify-center'>
                {`Kurš scenārijs tika izspēlēts?`}
              </DialogTitle>
              <DialogDescription>
                {/* Make changes to your profile here. Click save when youre done. */}
              </DialogDescription>
            </DialogHeader>{' '}
            <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
              {lielais == 'Uzvarēja'
                ? Object.keys(scoreTable[gameType])
                    .slice(0, 3)
                    .map((scenario, index) => (
                      <ControlsButton
                        key={scenario + index + 1}
                        text={scenario}
                        index={index}
                        onClickFunction={() =>
                          handleScenario(
                            scoreTable[gameType][scenario][players.length],
                            gameId
                          )
                        }
                      />
                    ))
                : Object.keys(scoreTable[gameType])
                    .slice(3, 6)
                    .map((scenario, index) => (
                      <ControlsButton
                        key={scenario + index + 1}
                        text={scenario}
                        index={index}
                        onClickFunction={() =>
                          handleScenario(
                            scoreTable[gameType][scenario][players.length],
                            gameId
                          )
                        }
                      />
                    ))}
            </div>
          </>
        )}

        <DialogFooter>
          {/* <Button type='submit'>Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ControlsButton = ({ text, index, onClickFunction }) => {
  console.log(text, index);

  return (
    <Button
      variant='outline'
      // className='rounded-lg text-base leading-6 font-semibold px-6 py-6 m-3 ring-2 ring-inset hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:ring-cyan-500 hover:text-slate-50 ring-slate-500 text-slate-500 dark:text-slate-100 dark:inset transition-all duration-500 dark:bg-slate-500'
      onClick={onClickFunction}
      key={text + index}
      size='xl'
    >
      {scenarioTextChange(text)}
    </Button>
  );
};

const scenarioTextChange = (text) => {
  let value = '';
  switch (text) {
    case 'Uzvar ar 61-90 acīm':
      value = 'Uzvar';
      break;
    case 'Uzvar ar 91 vai vairāk acīm':
      value = 'Uzvar jaņos';
      break;
    case 'Uzvar iegūstot visus stiķus':
      value = 'Uzvar bezstiķī';
      break;
    case 'Zaudē ar 31-60 acīm':
      value = 'Zaude';
      break;
    case 'Zaudē ar 30 un mazāk acīm':
      value = 'Zaudē jaņos';
      break;
    case 'Zaudē neiegūstot nevienu stiķi':
      value = 'Zaudē bezstiķī';
      break;
    default:
      value = text;
      break;
  }

  return value;
};
