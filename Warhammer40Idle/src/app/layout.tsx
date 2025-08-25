import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warhammer 40K Idle',
  description: 'An idle game where you build barracks and train soldiers in the Warhammer 40K universe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
