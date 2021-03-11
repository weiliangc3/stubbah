import { manageApiEndpoint } from './manageEndpoints';

export const pactsAccessor: string = 'pacts';
export const statesAccessor: string = 'states';
export const statesAvailableAccessor: string = 'available';
export const interactionAccessor: string = 'interactions';

export const managePactsEndpoint:string = `${manageApiEndpoint}/${pactsAccessor}`;
export function managePactsByRouteEndpoint(route: string): string {
  return `${managePactsEndpoint}/${route}`;
}
export function pactStatesByRouteEndpoint(route: string): string {
  return `${managePactsEndpoint}/${route}/${statesAccessor}`;
}
export function availablePactStatesByRouteEndpoint(route: string): string {
  return `${managePactsEndpoint}/${route}/${statesAccessor}/${statesAvailableAccessor}`;
}
export function interactionsByPactRouteEndpoint(route: string): string {
  return `${managePactsEndpoint}/${route}/${interactionAccessor}`;
}
export function interactionsByRouteAndIdEndpoint(route: string, id: number): string {
  return `${managePactsEndpoint}/${route}/${interactionAccessor}/${id}`;
}
