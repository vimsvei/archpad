import type { ApplicationEvent, Paginated } from "@/@types/application-event"
import type {
  CreateNamedObjectInput,
  UpdateNamedObjectInput,
} from "@/components/shared/archimate/named-object-types"
import {
  createNamedObjectRest,
  deleteNamedObjectRest,
  getNamedObjectRest,
  getNamedObjectsRest,
  type GetNamedObjectsParams,
  updateNamedObjectRest,
} from "@/services/named-object.rest"

export type CreateApplicationEventInput = CreateNamedObjectInput
export type UpdateApplicationEventInput = UpdateNamedObjectInput
export type GetApplicationEventsParams = GetNamedObjectsParams

const APPLICATION_EVENTS_ENDPOINT = "application-events"

export async function getApplicationEventsRest(
  params: GetApplicationEventsParams
): Promise<Paginated<ApplicationEvent>> {
  return getNamedObjectsRest<ApplicationEvent>(APPLICATION_EVENTS_ENDPOINT, params)
}

export async function getApplicationEventRest(id: string): Promise<ApplicationEvent> {
  return getNamedObjectRest<ApplicationEvent>(APPLICATION_EVENTS_ENDPOINT, id)
}

export async function createApplicationEventRest(
  input: CreateApplicationEventInput
): Promise<ApplicationEvent> {
  return createNamedObjectRest<ApplicationEvent>(APPLICATION_EVENTS_ENDPOINT, input)
}

export async function updateApplicationEventRest(
  id: string,
  input: UpdateApplicationEventInput
): Promise<ApplicationEvent> {
  return updateNamedObjectRest<ApplicationEvent>(APPLICATION_EVENTS_ENDPOINT, id, input)
}

export async function deleteApplicationEventRest(id: string): Promise<void> {
  return deleteNamedObjectRest(APPLICATION_EVENTS_ENDPOINT, id)
}

