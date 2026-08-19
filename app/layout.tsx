import type {Metadata} from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Grupo WR Service | Segurança e Facilities',
  description: 'Especialistas em Segurança Patrimonial, Portaria Remota, Controle de Acesso, Facilities e Limpeza Profissional.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${dmSans.className} bg-zinc-950 text-zinc-300 antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
