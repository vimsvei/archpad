import { EditItem } from "@/components/archimate/system-software/edit-item"

type SystemSoftwareEditRouteProps = {
  params: Promise<{ id: string }>
}

export default async function SystemSoftwareEditRoute({ params }: SystemSoftwareEditRouteProps) {
  const { id } = await params
  return <EditItem id={id} />
}

