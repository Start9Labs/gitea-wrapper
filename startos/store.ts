import { setupExposeStore } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export type Store = {
  GITEA__server__ROOT_URL: string
  GITEA__security__SECRET_KEY: string
  GITEA__service__DISABLE_REGISTRATION: boolean
  smtp: typeof sdk.inputSpecConstants.smtpInputSpec.validator._TYPE
}

export const exposedStore = setupExposeStore<Store>(() => [])
