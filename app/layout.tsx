import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import ClientRoot from './ClientRoot'

export const metadata: Metadata = {
  title: 'Drone Club',
  description: 'Drone Club Portal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>dddddddddddddddddd
        <style>{`
html { font-family: ${GeistSans.style.fontFamily}; --font-sans: ${GeistSans.variable}; --font-mono: ${GeistMono.variable}; }
:root { color-scheme: light dark }
        `}</style>
      </head>
      <body className="bg-white text-black">
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  )
}
