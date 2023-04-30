import { Config, Value, Variants } from 'start-sdk/lib/config/builder'

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
  email: Value.union(
    {
      name: 'Email (SMTP)',
      description:
        'Provide Gitea with SMTP credentials so that it can do email',
      required: { default: 'disabled' },
    },
    Variants.of({
      enabled: {
        name: 'Enabled',
        spec: Config.of({
          GITEA__mailer__SMTP_ADDR: Value.text({
            name: 'Server Address',
            required: {
              default: null,
            },
            description: 'The fully qualified domain name of your SMTP server',
            inputmode: 'text',
          }),
          GITEA__mailer__SMTP_PORT: Value.number({
            name: 'Port',
            description: 'The TCP port of your SMTP server',
            required: { default: 587 },
            min: 1,
            max: 65535,
            integer: true,
          }),
          GITEA__mailer__FROM: Value.text({
            name: 'From Name',
            required: {
              default: null,
            },
            description:
              'Name to display in the from field when receiving emails from your Gitea server.',
            placeholder: 'test@example.com',
            inputmode: 'text',
            patterns: [
              {
                regex: '.*@.*\\..*',
                description:
                  'Must be a valid email address (e.g. test@example.com) or a name and email address (e.g. Gitea <test@example.com>) ',
              },
            ],
          }),
          GITEA__mailer__USER: Value.text({
            name: 'Username',
            required: {
              default: null,
            },
            description: 'The username for logging into your SMTP server',
            inputmode: 'text',
          }),
          GITEA__mailer__PASSWD: Value.text({
            name: 'Password',
            required: false,
            description: 'The password for logging into your SMTP server',
            inputmode: 'text',
          }),
          GITEA__mailer__IS_TLS_ENABLED: Value.toggle({
            name: 'Require Transport Security',
            default: false,
            description:
              'Require TLS transport security for SMTP. By default, Gitea will connect over plain text, and will then switch to TLS via STARTTLS <strong>if the SMTP server supports it</strong>. If this option is set, Gitea will refuse to connect unless the server supports STARTTLS.',
          }),
        }),
      },
      disabled: { name: 'Disabled', spec: Config.of({}) },
    }),
  ),
})
export const matchInputSpec = configSpec.validator()
export type ConfigSpec = typeof matchInputSpec._TYPE
