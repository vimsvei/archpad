import { EditItem } from "@/components/archimate/application-event/edit-item"

type CommonEventEditRouteProps = {
  params: Promise<{ id: string }>
}

export default async function CommonEventEditRoute({ params }: CommonEventEditRouteProps) {
  const { id } = await params
  return <EditItem id={id} />
}
