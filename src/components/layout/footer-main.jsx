import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className=' fixed left-0 right-0 bottom-0 z-20 border-b bg-background/95 backdrop-blur'>
      <div className='flex h-14 items-center justify-center px-4 '>
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
      </div>
    </div>
  );
}
