import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

import { ModeToggle } from '@/components/component/mode-toogle';
import Link from 'next/link';
import UserNav from '@/components/layout/user-nav';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import FullLogo from '../../../public/logos/full_logo.svg';

export default function Navbar() {
  return (
    <div className='supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur'>
      <nav className='flex h-14 items-center justify-between px-4'>
        <div className='hidden lg:block'>
          <Link href={'/dashboard'}>
            {/* <Image src={FullLogo} alt='full_logo' width={147} /> */}
            <p>Zoles Punkti</p>
          </Link>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className='flex items-center gap-2'>
          <UserNav />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
