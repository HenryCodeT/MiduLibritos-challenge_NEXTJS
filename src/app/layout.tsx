import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lista de libro',
  description: 'Lista de libros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <main className='grid max-w-screen-lg m-auto min-h-screen grid-rows-[60px,1fr,60px] px-4'>
          <nav className='flex items-center text-2xl'>MiduLibritos</nav>
          <section>
            {children}
          </section>
          <footer className='flex items-center justify-center'>HenryTC</footer>
        </main>
      </body>
    </html>
  )
}
