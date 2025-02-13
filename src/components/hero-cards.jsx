import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from './ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Check, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { LightBulbIcon } from '@/components/hero-icons';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { RefreshCw } from 'lucide-react';

// import { LightBulbIcon } from './Icons';
// import { GitHubLogoIcon } from '@radix-ui/react-icons';

export const HeroCards = () => {
  return (
    <div className='mt-32 2xl:mt-0 grid grid-cols-1 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-8 relative 2xl:w-[700px] 2xl:h-[500px]'>
      {/* Testimonial */}
      <Card className='2xl:absolute 2xl:w-[340px] 2xl:-top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10 order-1'>
        <CardHeader className='flex flex-row items-center gap-4 pb-2'>
          {/* <Avatar>
            <AvatarImage alt='' src='/emils_avatar.jpeg' />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar> */}

          {/* <div className='flex flex-col'>
            <CardTitle className='text-lg'>John Doe React</CardTitle>
            <CardDescription>@john_doe</CardDescription>
          </div> */}
        </CardHeader>

        <CardContent className='flex items-center'>
          <RefreshCw className='mr-4 w-24 h-24 m-auto text-primary' />
          Realtime sync - visi spēles dalībnieki var redzēt un labot rezultātus
          katrs savā ierīcē reāllaikā
        </CardContent>
      </Card>

      {/* Team */}
      <Card className='my-4 2xl:my-0 2xl:absolute 2xl:right-[20px] 2xl:top-4 2xl:w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10 order-4 2xl:order-2'>
        <CardHeader className=' flex justify-center items-center pb-2'>
          {/* <Image
            src='/emils_avatar.jpeg'
            alt='user avatar'
            className='absolute grayscale-[0%] -top-8 rounded-full w-16 h-16 aspect-square object-cover'
            width={100}
            height={100}
          /> */}
          <CardTitle className='text-center'>Emīls Bisenieks</CardTitle>
          <CardDescription className='font-normal text-primary'>
            Frontend izstrādātājs
          </CardDescription>
        </CardHeader>

        <CardContent className='text-center pb-2'>
          <p>Ieteikumi, uzlabojumi, sūdzības - dod ziņu!</p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel='noreferrer noopener'
              href='https://github.com/tasesmuemils'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className='sr-only'>Github icon</span>
              <GitHubLogoIcon className='w-5 h-5' />
            </a>
            <a
              rel='noreferrer noopener'
              href='https://x.com/tasesmuemils'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className='sr-only'>X icon</span>
              <svg
                role='img'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className='fill-foreground w-5 h-5'
              >
                <title>X</title>
                <path d='M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' />
              </svg>
            </a>

            <a
              rel='noreferrer noopener'
              href='https://www.linkedin.com/in/em%C4%ABls-bisenieks-3277a6115/'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className='sr-only'>Linkedin icon</span>
              <Linkedin size='20' />
            </a>
            <a
              rel='noreferrer noopener'
              href='mailto:your-email@gmail.com'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className='sr-only'>Gmail icon</span>
              <svg
                role='img'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className='fill-foreground w-5 h-5'
              >
                <title>Gmail</title>
                <path d='M12 12.713l-11.999-8.713v13.711q0 .792.563 1.354t1.354.563h19.788q.792 0 1.354-.563t.563-1.354v-13.711zm-11.424-9.01l11.423 8.319 11.424-8.319q-.136-.156-.402-.287t-.523-.126h-20.998q-.271 0-.523.126t-.402.287z' />
              </svg>
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className='2xl:absolute 2xl:top-[150px] 2xl:left-[50px] 2xl:w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10 order-2 2xl:order-3'>
        {/* <CardHeader>
          <CardTitle className='flex item-center justify-between'>
            Free
            <Badge variant='secondary' className='text-sm text-primary'>
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className='text-3xl font-bold'>$0</span>
            <span className='text-muted-foreground'> /month</span>
          </div>

          <CardDescription>
            Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className='w-full'>Start Free Trial</Button>
        </CardContent> */}

        <hr className='w-4/5 m-auto mb-4' />

        <CardFooter className='flex justify-center'>
          <div className=' grid gap-2 justify-start items-start lg:grid-cols-2  2xl:grid-cols-1'>
            {[
              '3-4 spēlētāji',
              'Uzaicini draugus',
              'Punktu tabula',
              'Partiju skaits un rezultātu tabula',
              'Spēļu vēsture',
              'Skaiti EUR punktā',
              'Statistika katrai spēlei',
            ].map((benefit) => (
              <span key={benefit} className='flex'>
                <Check className='text-green-500' />{' '}
                <h3 className='ml-2'>{benefit}</h3>
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className='2xl:absolute 2xl:w-[350px] 2xl:-right-[10px] 2xl:bottom-[110px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10 order-3 2xl:order-4'>
        <CardHeader className='space-y-1 flex md:flex-row justify-center 2xl:justify-start items-start gap-4'>
          <div className='mt-1 bg-primary/20 p-1 rounded-2xl'>
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Gaišais un tumšais režīms</CardTitle>
            <CardDescription className='text-md mt-2'>
              Pielāgojiet lietotni savām vajadzībām
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
