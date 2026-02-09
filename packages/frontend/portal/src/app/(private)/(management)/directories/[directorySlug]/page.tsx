import { DirectoryListPage } from "@/components/directories/directory-list-page"

type DirectoryListRouteProps = {
  params: Promise<{ directorySlug: string }>
}

export default async function DirectoryListRoute({ params }: DirectoryListRouteProps) {
  const { directorySlug } = await params
  return <DirectoryListPage directorySlug={directorySlug} />
}

