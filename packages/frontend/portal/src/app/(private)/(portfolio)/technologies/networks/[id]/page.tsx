import { EditItem } from "@/components/archimate/technology-network/edit-item"

type TechnologyNetworkEditRouteProps = {
  params: Promise<{ id: string }>
}

export default async function TechnologyNetworkEditRoute({ params }: TechnologyNetworkEditRouteProps) {
  const { id } = await params
  return <EditItem id={id} />
}
