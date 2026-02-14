import { EditItem } from "@/components/archimate/flow/edit-item"

type FlowEditRouteProps = {
  params: Promise<{ id: string }>
}

export default async function FlowEditRoute({ params }: FlowEditRouteProps) {
  const { id } = await params
  return <EditItem id={id} />
}

