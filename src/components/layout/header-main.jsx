import { ModeToggle } from '@/components/component/mode-toogle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className='sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background'>
      <NavigationMenu className='mx-auto'>
        <NavigationMenuList className='container h-14 px-4 w-screen flex justify-between '>
          <NavigationMenuItem className='font-bold flex'>
            <a
              rel='noreferrer noopener'
              href='/'
              className='ml-2 font-bold text-xl flex'
            >
              {/* <Image
                src='/logos/test.svg'
                alt='Zoles Punkti'
                width={40}
                height={40}
                priority={true} // Add this if the logo is above the fold
              /> */}
              <p>Zoles Punkti</p>
            </a>
          </NavigationMenuItem>

          <div className='flex gap-2'>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
  // return (
  //   <div className='sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background'>
  //     <nav className='flex h-14 items-center justify-between px-4'>
  //       <div className='block'>
  //         <Link href={'/'}>
  //           {/* <Image src={FullLogo} alt='full_logo' width={147} /> */}
  //           <p>Zoles Punkti</p>
  //         </Link>
  //       </div>
  //       {/* <div className={cn('block lg:!hidden')}>
  //         <MobileSidebar />
  //       </div> */}

  //       <div className='flex items-center gap-4'>
  //         {/* <UserNav /> */}
  //         <ModeToggle />
  //       </div>
  //     </nav>
  //   </div>
  // );
}
