import { manageApiEndpoint } from './manageEndpoints';

export const stubsProviderAccessor: string = 'providers';
export const statesAccessor: string = 'states';
export const statesAvailableAccessor: string = 'available';
export const stubsAccessor: string = 'stubs';

export const manageStubsEndpoint:string = `${manageApiEndpoint}/${stubsProviderAccessor}`;
export function manageStubsByRouteEndpoint(route: string): string {
  return `${manageStubsEndpoint}/${route}`;
}
export function providerStatesByRouteEndpoint(route: string): string {
  return `${manageStubsEndpoint}/${route}/${statesAccessor}`;
}
export function availableProviderStatesByRouteEndpoint(route: string): string {
  return `${manageStubsEndpoint}/${route}/${statesAccessor}/${statesAvailableAccessor}`;
}
export function stubsByProviderRouteEndpoint(route: string): string {
  return `${manageStubsEndpoint}/${route}/${stubsAccessor}`;
}
export function stubsByRouteAndIdEndpoint(route: string, id: number): string {
  return `${manageStubsEndpoint}/${route}/${stubsAccessor}/${id}`;
}
