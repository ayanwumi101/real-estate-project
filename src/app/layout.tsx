import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';

import { Layout } from '~/lib/layout';
import { RootProviders } from '~/lib/providers/root';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'Vestier';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: 'Vestiers' },
  description:
    "At Vestiers, we're redefining real estate asset management with technology-driven solutions that help property owners, investors, and managers stay in control of their portfolios.",
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'https://vestiers.ng',
    title: 'Vestier',
    description:
      "At Vestier, we're redefining real estate asset management with technology-driven solutions that help property owners, investors, and managers stay in control of their portfolios.",
    images: {
      url: 'https://res.cloudinary.com/ddke4ujej/image/upload/v1743789583/Open_graph_g5dg3k.png',
      alt: 'Vestier Logo',
    },
  },
  twitter: {
    creator: '@vestier',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <NextTopLoader showSpinner={false} color="#000080" />
        <RootProviders>
          <Layout>{children}</Layout>
        </RootProviders>
      </body>
    </html>
  );
};

export default RootLayout;
