import { sdk } from '../../sdk'
import { configSpec } from './spec'
import { iniFile } from './file-models/app.ini'

export const read = sdk.setupConfigRead(
  configSpec,
  async ({ effects, utils }) => {
    const config = (await iniFile.read(effects))!
    return {
      DISABLE_REGISTRATION: config.DISABLE_REGISTRATION,
      smtp: await utils.store.getOwn('/smtp').once(),
    }
  },
)
