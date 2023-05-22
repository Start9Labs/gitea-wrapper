import { ConfigSpec } from './procedures/config/spec'

export type Store = {
  smtp: ConfigSpec['smtp']
}
