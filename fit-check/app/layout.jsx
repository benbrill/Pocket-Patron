// These styles apply to every route in the application
import '../styles/global.css'
import { DM_Sans } from 'next/font/google'

const DMSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  display: 'swap',
})

 
export const metadata = {
  title: 'Drobe',
  description: 'Track clothes',
}
 
export default function RootLayout({ children, modal }) {
  return (
    <html lang="en" className={`${DMSans.variable}`}>
      <body style={{
          margin: `0 auto`,
          maxWidth: 1080,
          padding: `0 1.0875rem 1.45rem`,
        }}>
        {children}
        {modal}
        </body>
    </html>
  )
}
