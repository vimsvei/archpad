import { EditItem } from "@/components/archimate/application-function/edit-item"

type ApplicationFunctionEditRouteProps = {
  params: Promise<{ id: string }>
}

export default async function ApplicationFunctionEditRoute({ params }: ApplicationFunctionEditRouteProps) {
  const { id } = await params
  return <EditItem id={id} />
}
