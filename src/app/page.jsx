'use client';
import Image from 'next/image';
import FullLogo from '../../public/logos/full_logo.svg';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from './actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/utils/superbase/client';
import { FaGoogle } from 'react-icons/fa';
import Footer from '@/components/layout/footer-main';
import HeaderMain from '@/components/layout/header-main';

export default function Home() {
  const handleLoginWithOAuth = (provider) => {
    const supabase = createClient();

    supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/dashboard`,
      },
    });
  };
  // next=/dashboard

  return (
    <>
      <HeaderMain />
      <section className='h-screen flex items-center'>
        <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          {' '}
          <div className='container grid items-center justify-between gap-10 px-4 md:grid-cols-2 md:gap-20 lg:gap-32'>
            <div className='space-y-4 text-center md:text-left'>
              {/* <Image
            className='bg-background text-foreground'
            src={FullLogo}
            alt='full_logo'
            width={400}
          /> */}
              <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                Zoles Punkti
              </h1>
              <p className='text-lg leading-7 [&:not(:first-child)]:mt-6'>
                Neskrien pēc lapas un pildspalvas, skaiti Zoles Punktus šeit
              </p>
            </div>
            <Card className=''>
              <CardHeader></CardHeader>
              {/* <CardContent>
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
                <Input
                  name='password'
                  id='password'
                  type='password'
                  required
                />
                <Link
                  href='#'
                  className='inline-block text-sm underline'
                  prefetch={false}
                >
                  Aizmirsi paroli?
                </Link>
              </div>
              <div className='flex gap-2'>
                <Button formAction={login} className='flex-1'>
                  Ienākt
                </Button>
                <Link href='/register'>
                  {' '}
                  <Button variant='outline' className='flex-1'>
                    Reģistrēties
                  </Button>
                </Link>
              </div>
            </form>
            <Separator className='mr-4 mt-4' />
          </CardContent> */}
              <CardContent>
                {' '}
                <Button
                  className='w-full'
                  onClick={() => handleLoginWithOAuth('google')}
                >
                  <span className='pr-2'>
                    <FaGoogle />
                  </span>{' '}
                  Ielogojies ar Google
                </Button>
              </CardContent>

              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </>

    // <main className='flex min-h-screen flex-col items-center justify-center p-24'>
    //   {' '}
    //   <section className='w-full py-20 md:py-32 lg:py-40'>

    //   </section>
    // </main>
  );
}
