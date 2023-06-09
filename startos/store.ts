import { ConfigSpec } from './procedures/config/spec'

export type Store = {
  GITEA__security__SECRET_KEY: string
  smtp: ConfigSpec['smtp']
}
