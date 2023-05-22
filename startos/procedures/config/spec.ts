import { smtpConfig } from '@start9labs/start-sdk/lib/config/configConstants'
import { sdk } from '../../sdk'
const { Config, Value } = sdk

export const configSpec = Config.of({
  DISABLE_REGISTRATION: Value.toggle({
    name: 'Disable Registration',
    default: false,
    description:
      'Prevent new users from signing themselves up. Once registrations are disabled, only an admin can sign up new users. It is recommended that you activate this option after creating your first user, since anyone with your Gitea URL can sign up and create an account, which represents a security risk.',
  }),
  smtp: smtpConfig,
})

export type ConfigSpec = typeof configSpec.validator._TYPE
