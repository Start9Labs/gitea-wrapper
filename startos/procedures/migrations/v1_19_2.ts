import { sdk } from '../../sdk'
import { readFile, rmdir } from 'fs/promises'
import { load } from 'js-yaml'

type ConfigYaml = {
  'local-mode': boolean
  'disable-registration': boolean
}

export const v1_19_2 = sdk.Migration.of({
  version: '1.19.2',
  up: async ({ effects, utils }) => {
    // set smtp wrapper data
    await utils.store.setOwn('/smtp', {
      unionSelectKey: 'disabled',
      unionValueKey: {},
    })

    // *** copy secret key ***
    // get secret key
    const secretKey = await readFile('/data/start9/secret-key.txt', 'base64')
    // save secret key
    await effects.vault.set({
      key: '/GITEA__security__SECRET_KEY',
      value: secretKey,
    })

    // *** remove old start9 dir ***
    await rmdir('/data/start9')
  },
  down: async ({ effects }) => {
    throw new Error('Downgrade not permitted')
  },
})
