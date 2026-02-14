import { EditItem } from "@/components/archimate/technology-node/edit-item"

type TechnologyNodeEditRouteProps = {
  params: Promise<{ id: string }>
}

export default async function TechnologyNodeEditRoute({ params }: TechnologyNodeEditRouteProps) {
  const { id } = await params
  return <EditItem id={id} />
}
