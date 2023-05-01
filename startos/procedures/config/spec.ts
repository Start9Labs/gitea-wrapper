import { Config, Value } from 'start-sdk/lib/config/builder'

export const configSpec = Config.of({
  GITEA__server__DOMAIN: Value.select({
    name: 'Primary Domain',
    required: { default: 'tor' },
    description:
      'Your primary domain is used for creating links inside the Gitea UI',
    values: {
      tor: '.onion',
      local: '.local',
      ip: 'IP Address',
    },
  }),
  GITEA__service__DISABLE_REGISTRATION: Value.toggle({
    name: 'Disable Registration',
    default: false,
    description:
      'Prevent new users from signing themselves up. Once registrations are disabled, only an admin can sign up new users. It is recommended that you activate this option after creating your first user, since anyone with your Gitea URL can sign up and create an account, which represents a security risk.',
  }),
  smtp: smtpConfig,
})

export const matchInputSpec = configSpec.validator()
export type ConfigSpec = typeof matchInputSpec._TYPE
