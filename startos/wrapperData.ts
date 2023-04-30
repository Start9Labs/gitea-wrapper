import { ConfigSpec } from './procedures/config/spec'

export interface WrapperData {
  GITEA__security__SECRET_KEY: string
  config: ConfigSpec
}
