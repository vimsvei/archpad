import { EditItem } from "@/components/archimate/application-function/edit-item"

type CommonFunctionEditRouteProps = {
  params: Promise<{ id: string }>
}

export default async function CommonFunctionEditRoute({ params }: CommonFunctionEditRouteProps) {
  const { id } = await params
  return <EditItem id={id} />
}
