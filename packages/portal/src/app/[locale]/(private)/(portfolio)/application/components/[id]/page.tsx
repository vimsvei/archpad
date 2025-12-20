import { ApplicationComponentEditPage } from "@/components/application-components/application-component-edit-page"

type ApplicationComponentEditRouteProps = {
  params: Promise<{ locale: string; id: string }>
}

export default async function ApplicationComponentEditRoute({ params }: ApplicationComponentEditRouteProps) {
  const { id } = await params
  return <ApplicationComponentEditPage id={id} />
}


