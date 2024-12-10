import { Effects } from '@start9labs/start-sdk/base/lib/Effects'
import { sdk } from './sdk'

export const uiPort = 3000

export async function getHttpInterfaceUrls(
  effects: Effects,
): Promise<string[]> {
  const httpInterface = await sdk.serviceInterface
    .getOwn(effects, 'http')
    .const()

  return httpInterface?.addressInfo?.urls || []
}
