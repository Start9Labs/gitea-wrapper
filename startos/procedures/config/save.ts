import { sdk } from '../../sdk'
import { setInterfaces } from '../interfaces'
import { configSpec } from './spec'
import { iniFile } from './file-models/app.ini'

export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, utils, input, dependencies }) => {
    await utils.store.setOwn('/smtp', input.smtp)

    const config = (await iniFile.read(effects))!

    config.DISABLE_REGISTRATION = input.DISABLE_REGISTRATION

    await iniFile.write(config, effects)

    const dependenciesReceipt = await effects.setDependencies([])

    return {
      interfacesReceipt: await setInterfaces({ effects, utils, input }),
      dependenciesReceipt,
      restart: true,
    }
  },
)
