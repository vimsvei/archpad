import { DirectoryEditPage } from "@/components/directories/directory-edit-page"

type DirectoryEditRouteProps = {
  params: Promise<{ directorySlug: string; id: string }>
}

export default async function DirectoryEditRoute({ params }: DirectoryEditRouteProps) {
  const { directorySlug, id } = await params
  return <DirectoryEditPage directorySlug={directorySlug} id={id} />
}

