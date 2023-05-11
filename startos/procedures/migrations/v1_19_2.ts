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
    // *** convert config.yaml to wrapperData ***
    // get config.yaml
    const configYaml = load(
      await readFile('/data/start9/config.yaml', 'utf-8'),
    ) as ConfigYaml
    // set wrapper data
    await utils.store.setOwn('/config', {
      primaryDomain: configYaml['local-mode'] ? 'local' : 'tor',
      GITEA__service__DISABLE_REGISTRATION: configYaml['disable-registration'],
      smtp: { unionSelectKey: 'disabled', unionValueKey: {} },
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
