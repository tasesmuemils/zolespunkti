import { ModeToggle } from '@/components/component/mode-toogle';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='supports-backdrop-blur:bg-background/60 fixed left-0 border-b right-0 top-0 z-20 bg-background/95 backdrop-blur'>
      <nav className='flex h-14 items-center justify-between px-4'>
        <div className='block'>
          <Link href={'/'}>
            {/* <Image src={FullLogo} alt='full_logo' width={147} /> */}
            <p>Zoles Punkti</p>
          </Link>
        </div>
        {/* <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div> */}

        <div className='flex items-center gap-4'>
          {/* <UserNav /> */}
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
