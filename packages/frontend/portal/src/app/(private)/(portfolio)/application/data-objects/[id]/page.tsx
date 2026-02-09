import { EditItem } from "@/components/archimate/data-object/edit-item"

export default async function ApplicationDataObjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <EditItem id={id} />
}


