import '../../styles/global.css'
import { Inter } from 'next/font/google'
import { IsClientCtxProvider } from '../../contexts/IsClientContext'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </head>

      <body className={inter.className}>
        <IsClientCtxProvider>
          {children}
        </IsClientCtxProvider>
      </body>
    </html>
  )
}

export default Layout;
