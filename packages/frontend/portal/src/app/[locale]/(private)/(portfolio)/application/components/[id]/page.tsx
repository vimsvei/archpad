import { EditItem } from "@/components/archimate/application-component/edit-item"

type ApplicationComponentEditRouteProps = {
  params: Promise<{ locale: string; id: string }>
}

export default async function ApplicationComponentEditRoute({ params }: ApplicationComponentEditRouteProps) {
  const { id } = await params
  return <EditItem id={id} />
}


