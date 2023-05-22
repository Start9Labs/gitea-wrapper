import { sdk } from '../sdk'
import { ExpectedExports, SmtpValue } from '@start9labs/start-sdk/lib/types'
import { manifest } from '../manifest'
import { HealthReceipt } from '@start9labs/start-sdk/lib/health/HealthReceipt'
import { Daemons } from '@start9labs/start-sdk/lib/mainFn/Daemons'
import { uiPort } from './interfaces'
import { webInterfaceId } from './interfaces'

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

    // domain/url
    const webInterface = await utils.networkInterface
      .getOwn(webInterfaceId)
      .const()

    let GITEA__server__ROOT_URL = webInterface.primaryUrl

    // mailer
    const smtp = await utils.store.getOwn('/smtp').once()
    let mailer: Record<string, string>
    if (smtp.unionSelectKey === 'disabled') {
      mailer = { GITEA__mailer__ENABLED: 'false' }
    } else {
      let settings: SmtpValue
      if (smtp.unionSelectKey === 'system') {
        settings = await utils.getSystemSmtp().const()
        settings.from = smtp.unionValueKey.customFrom || settings.from
      } else {
        settings = smtp.unionValueKey
      }
      mailer = {
        GITEA__mailer__ENABLED: 'true',
        GITEA__mailer__SMTP_ADDR: settings.server,
        GITEA__mailer__SMTP_PORT: `${settings.port}`,
        GITEA__mailer__FROM: settings.from,
        GITEA__mailer__USER: settings.login,
      }
      if (settings.password) mailer.GITEA__mailer__PASSWD = settings.password
    }

    return Daemons.of({
      effects,
      started,
      healthReceipts, // Provide the healthReceipts or [] to prove they were at least considered
    }).addDaemon('main', {
      command: ['/usr/bin/entrypoint', '--', '/bin/s6-svscan', '/etc/s6'], // The command to start the daemon
      env: {
        GITEA__server__ROOT_URL,
        GITEA__security__INSTALL_LOCK: 'true',
        GITEA__security__SECRET_KEY: await utils.vault
          .get('GITEA__security__SECRET_KEY')
          .const(),
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
