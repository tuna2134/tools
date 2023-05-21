import { ReactNode } from "react"

export const metadata = {
  title: 'ユーザー検索｜tuna2134 tools',
  description: 'ユーザーIDを使って、Discordのユーザーを検索します。',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}