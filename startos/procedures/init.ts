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
  await effects.vault.set({
    key: '/GITEA__security__SECRET_KEY',
    value: secretKey,
  })
})

const uninstall = sdk.setupUninstall(async ({ effects, utils }) => {})

export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
)
