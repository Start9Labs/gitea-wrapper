import FileHelper from '@start9labs/start-sdk/lib/util/fileHelper'
import * as ini from 'ini'

export type Ini = {
  DISABLE_REGISTRATION: boolean
}

export const iniFile = FileHelper.raw(
  'gitea/app.ini',
  (obj: Ini) => ini.stringify(obj),
  (str) => ini.parse(str) as any,
)

export const defaultIni: Ini = {
  DISABLE_REGISTRATION: false,
}
