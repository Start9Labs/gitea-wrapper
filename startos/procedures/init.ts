import { sdk } from '../sdk'
import { migrations } from './migrations'
import { getRandomString } from '@start9labs/start-sdk/lib/util/getRandomString'
import { setInterfaces } from './interfaces'

const install = sdk.setupInstall(async ({ effects, utils }) => {
  // generate secret key
  const secretKey = getRandomString({
    charset: 'A-Z,a-z,0-9,+,/',
    len: 32,
  })
  await utils.store.setOwn('/GITEA__security__SECRET_KEY', secretKey)
})

const uninstall = sdk.setupUninstall(async ({ effects, utils }) => {})

const exportedValues = sdk.setupExports(({ effects, utils }) => {
  return {
    ui: [],
    services: [],
  }
})

export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
  exportedValues,
)
