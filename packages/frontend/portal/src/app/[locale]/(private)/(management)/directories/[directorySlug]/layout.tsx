import { DirectoriesLayout } from "@/components/layouts/private/directory/directories-layout"

type DirectoryLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string; directorySlug: string }>
}

export default async function DirectoryLayout({ children, params }: DirectoryLayoutProps) {
  const { directorySlug } = await params
  return <DirectoriesLayout currentDirectorySlug={directorySlug}>{children}</DirectoriesLayout>
}
