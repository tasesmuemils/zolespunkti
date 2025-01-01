import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { createClient } from '../utils/superbase/client';

const DeleteIcon = Icons['delete'];

export default function DeleteLastScore({ score, onScoreUpdate }) {
  // console.log('score, delete', score);
  const handleDeleteLastScore = async () => {
    let obj = score;

    obj.player_1_score.pop();
    obj.player_2_score.pop();
    obj.player_3_score.pop();
    if (obj.scenarios != null) {
      obj.scenarios.pop();
    }

    if (obj.player_4_score != null) {
      obj.player_4_score.pop();
    }

    // Record data to DB
    const supabase = createClient();

    const { data: updatedScores, error } = await supabase
      .from('game_scores')
      .update({
        player_1_score: obj.player_1_score,
        player_2_score: obj.player_2_score,
        player_3_score: obj.player_3_score,
        player_4_score: obj.player_4_score != null ? obj.player_4_score : null,
        scenarios: obj.scenarios != null ? obj.scenarios : null,
      }) // Assuming 'data' is the jsonb column
      .eq('game_id', obj.game_id)
      .select();

    onScoreUpdate(updatedScores[0]);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='outline'
          className='absolute text-xs -right-8 top-12 md:top-3 md:-right-14'
        >
          <DeleteIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='max-w-[90%] sm:max-w-[525px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Vai tiešām dzēst pēdējo rezultātu?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {`Spiežot "Jā", tiks izdzēsts pēdējais reģitsrētais rezultāts.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tomēr nē</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleDeleteLastScore}>Jā</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
