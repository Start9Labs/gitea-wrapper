import { sdk } from '../sdk'
import { ExpectedExports, SmtpValue } from '@start9labs/start-sdk/lib/types'
import { manifest } from '../manifest'
import { HealthReceipt } from '@start9labs/start-sdk/lib/health/HealthReceipt'
import { Daemons } from '@start9labs/start-sdk/lib/mainFn/Daemons'
import { uiPort } from './interfaces'

export const main: ExpectedExports.main = sdk.setupMain(
  async ({ effects, utils, started }) => {
    /**
     * ======================== Setup ========================
     *
     * In this section, you will fetch any resources or run any commands necessary to run the service
     */

    console.info('Starting Gitea!')

    /**
     * ======================== Additional Health Checks (optional) ========================
     *
     * In this section, you will define additional health checks beyond those associated with daemons
     */
    const healthReceipts: HealthReceipt[] = []

    /**
     * ======================== Daemons ========================
     *
     * In this section, you will create one or more daemons that define the service runtime
     *
     * Each daemon defines its own health check, which can optionally be exposed to the user
     */

    const { primaryDomain, GITEA__service__DISABLE_REGISTRATION, smtp } =
      await utils.store.getOwn('/config').once()

    // primary domain
    let GITEA__server__DOMAIN: string
    let GITEA__server__ROOT_URL: string
    if (primaryDomain === 'tor') {
      GITEA__server__DOMAIN = await effects.getServiceTorHostname('torHostname')
      GITEA__server__ROOT_URL = `http://${GITEA__server__DOMAIN}`
    } else {
      const port = await effects.getServicePortForward(443)
      const lanHostname =
        primaryDomain === 'local'
          ? await effects.getLocalHostname()
          : await effects.getIPHostname()
      GITEA__server__DOMAIN = `${lanHostname}:${port}`
      GITEA__server__ROOT_URL = `https://${GITEA__server__DOMAIN}`
    }

    // mailer
    let mailer: any
    if (smtp.unionSelectKey === 'disabled') {
      mailer = { GITEA__mailer__ENABLED: false }
    } else {
      let settings: SmtpValue
      if (smtp.unionSelectKey === 'system') {
        settings = await utils.getSystemSmtp().const()
        settings.from = smtp.unionValueKey.customFrom || settings.from
      } else {
        settings = smtp.unionValueKey
      }
      mailer = {
        GITEA__mailer__ENABLED: true,
        GITEA__mailer__SMTP_ADDR: settings.server,
        GITEA__mailer__SMTP_PORT: settings.port,
        GITEA__mailer__FROM: settings.from,
        GITEA__mailer__USER: settings.login,
        GITEA__mailer__PASSWD: settings.password,
        GITEA__mailer__IS_TLS_ENABLED: settings.tls,
      }
    }

    return Daemons.of({
      effects,
      started,
      healthReceipts, // Provide the healthReceipts or [] to prove they were at least considered
    }).addDaemon('main', {
      command: ['/usr/bin/entrypoint', '--', '/bin/s6-svscan', '/etc/s6'], // The command to start the daemon
      env: {
        GITEA__server__DOMAIN,
        GITEA__server__ROOT_URL,
        GITEA__server__SSH_DOMAIN: GITEA__server__DOMAIN,
        GITEA__security__INSTALL_LOCK: true,
        GITEA__security__SECRET_KEY: await utils.vault.get(
          '/GITEA__security__SECRET_KEY',
        ),
        GITEA__service__DISABLE_REGISTRATION,
        ...mailer,
      },
      requires: [],
      ready: {
        display: 'Server Ready',
        // The function to run to determine the health status of the daemon
        fn: () =>
          utils.checkPortListening(uiPort, {
            successMessage: `${manifest.title} is live`,
            errorMessage: `${manifest.title} is unreachable`,
          }),
      },
    })
  },
)
