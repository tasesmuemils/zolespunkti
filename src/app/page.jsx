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
import { HeroCards } from '@/components/hero-cards';

export default function Home() {
  const handleLoginWithOAuth = async (provider) => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/dashboard`,
        prompt: 'select_account',
      },
    });
  };
  // next=/dashboard

  return (
    <>
      <HeaderMain />
      <section className='container lg:grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10'>
        <div className='text-center lg:text-start space-y-6'>
          <main className='text-5xl md:text-6xl font-bold'>
            <h1 className='inline'>
              <span className='inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text'>
                Zoles
              </span>{' '}
              {/* <span className='inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text'>
                Zoles
              </span>{' '} */}
              punkti vienuviet
            </h1>{' '}
            -{' '}
            <h2 className='inline'>
              <span className='inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text'>
                ātrāk,
              </span>{' '}
              {/* <span className='inline bg-gradient-to-r from-[#42f54b] via-[#3ddc58] to-[#2bb34d] text-transparent bg-clip-text'>
                vienkāršāk,
              </span>{' '}
              <span className='inline bg-gradient-to-r from-[#ff7e79] via-[#ff5f52] to-[#e63946] text-transparent bg-clip-text'>
                precīzāk!
              </span>{' '} */}
              vienkāršāk, precīzāk!
            </h2>
          </main>

          <p className='text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0'>
            Nezaudē laiku meklējot, kur pierakstīt Zoles punktus – izmanto
            aplikāciju bez piepūles un ērti uz jebkuras ierīces!
          </p>

          <div className='space-y-4 md:space-y-0 md:space-x-4'>
            <Button
              className='w-full md:w-1/3'
              onClick={() => handleLoginWithOAuth('google')}
            >
              {' '}
              <span className='pr-2'>
                <FaGoogle />
              </span>{' '}
              Ielogojies ar Google
            </Button>

            {/* <a
              rel='noreferrer noopener'
              href='https://github.com/leoMirandaa/shadcn-landing-page.git'
              target='_blank'
              className={`w-full md:w-1/3 ${buttonVariants({
                variant: 'outline',
              })}`}
            >
              Github Repository
              <GitHubLogoIcon className="ml-2 w-5 h-5" />
            </a> */}
          </div>
        </div>

        {/* Hero cards sections */}
        <div className='z-10'>
          <HeroCards />
        </div>

        {/* Shadow effect */}
        <div className='shadow'></div>
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

{
  /* <section className='h-screen flex items-center'>
  <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
    {' '}
    <div className='container grid items-center justify-between gap-10 px-4 md:grid-cols-2 md:gap-20 lg:gap-32'>
      <div className='space-y-4 text-center md:text-left'>
        <Image
          className='bg-background text-foreground'
          src={FullLogo}
          alt='full_logo'
          width={400}
        />
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Zoles Punkti
        </h1>
        <p className='text-lg leading-7 [&:not(:first-child)]:mt-6'>
          Neskrien pēc lapas un pildspalvas, skaiti Zoles Punktus šeit
        </p>
      </div>
      <Card className=''>
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
        </CardContent>
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
</section>; */
}
