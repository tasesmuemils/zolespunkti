import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

// import Header from '@/components/component/header';

// Radix UI Themes
import '@radix-ui/themes/styles.css';
import { logout } from './logout/actions';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Zoles punkti';
const APP_DEFAULT_TITLE = 'Zoles punkti';
const APP_TITLE_TEMPLATE = '%s - Zoles punkti';
const APP_DESCRIPTION =
  "Neskrien pēc lapas un pildspalvas, skaiti 'Zoles' punktus šeit";

// test

export const metadata = {
  manifest: '/manifest.json',
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport = {
  themeColor: '#7C3AED',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {' '}
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
