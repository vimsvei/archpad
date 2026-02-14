import { EditItem } from "@/components/archimate/business-process/edit-item"

type CommonProcessEditRouteProps = {
  params: Promise<{ id: string }>
}

export default async function CommonProcessEditRoute({ params }: CommonProcessEditRouteProps) {
  const { id } = await params
  return <EditItem id={id} />
}
