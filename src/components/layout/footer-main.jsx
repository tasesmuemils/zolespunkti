import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className='my-14'>
      <div className='grid grid-cols-1 items-center justify-center px-4 '>
        <div className='flex justify-center gap-2'>
          <a
            href='https://zolespunkti-old.netlify.app/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button size='sx' variant='outline' className='text-xs'>
              Vecā versija
            </Button>
          </a>
          <Link href={`/pointstable`}>
            <Button size='sx' variant='outline' className='text-xs'>
              Punktu tabula
            </Button>
          </Link>
        </div>
        <section className='container pt-9 text-center'>
          <h3>
            &copy; {new Date().getFullYear()} Zoles Punkti -{' '}
            <a
              rel='noreferrer noopener'
              target='_blank'
              href='https://www.bisenieks.dev/'
              className='text-primary transition-all border-primary hover:border-b-2'
            >
              Emīls Bisenieks
            </a>
          </h3>
        </section>
      </div>
    </div>
  );
}
