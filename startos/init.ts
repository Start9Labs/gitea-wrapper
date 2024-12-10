import { sdk } from './sdk'
import { exposedStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { utils } from '@start9labs/start-sdk'
import { setPrimaryUrl } from './actions/set-primary-url'

// **** Install ****
const install = sdk.setupInstall(async ({ effects }) => {
  await sdk.store.setOwn(effects, sdk.StorePath, {
    GITEA__security__SECRET_KEY: utils.getDefaultString({
      charset: 'A-Z,a-z,0-9,+,/',
      len: 32,
    }),
    GITEA__server__ROOT_URL: '',
    GITEA__service__DISABLE_REGISTRATION: true,
    smtp: {
      selection: 'disabled',
      value: {},
    },
  })

  await sdk.action.requestOwn(effects, setPrimaryUrl, 'critical')
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  exposedStore,
)
