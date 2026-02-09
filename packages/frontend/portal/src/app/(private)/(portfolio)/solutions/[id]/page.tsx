import { EditItem } from "@/components/archimate/solution/edit-item"

type SolutionEditRouteProps = {
  params: Promise<{ id: string }>
}

export default async function SolutionEditRoute({ params }: SolutionEditRouteProps) {
  const { id } = await params
  return <EditItem id={id} />
}