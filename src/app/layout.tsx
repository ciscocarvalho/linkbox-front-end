import type { Metadata } from 'next'
import Layout from "./components/layout";

export const metadata: Metadata = {
  title: 'LinkBox',
  applicationName: 'LinkBox',
  description: 'O melhor lugar para organizar seus links!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>;
}
