import { DirectoryEditPage } from "@/components/directories/directory-edit-page"

type DirectoryEditRouteProps = {
  params: Promise<{ locale: string; directorySlug: string; id: string }>
}

export default async function DirectoryEditRoute({ params }: DirectoryEditRouteProps) {
  const { directorySlug, id } = await params
  return <DirectoryEditPage directorySlug={directorySlug} id={id} />
}

