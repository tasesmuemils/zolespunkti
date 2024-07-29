import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { signup } from './actions';

export default function RegisterPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <Card className='w-2/3'>
        <CardHeader></CardHeader>
        <CardContent>
          {' '}
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>E-pasts</Label>
              <Input
                name='email'
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Parole</Label>
              <Input name='password' id='password' type='password' required />
            </div>
            <div className='flex gap-2'>
              {' '}
              <Button formAction={signup} className='flex-1'>
                Reģistrēties
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
