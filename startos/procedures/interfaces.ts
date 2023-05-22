import { sdk } from '../sdk'
import { configSpec } from './config/spec'

export const uiPort = 3000
export const sshPort = 22
export const webInterfaceId = 'web'
export const sshInterfaceId = 'ssh'

/**
 * ======================== Interfaces ========================
 *
 * In this section, you will decide how the service will be exposed to the outside world
 */
export const setInterfaces = sdk.setupInterfaces(
  configSpec,
  async ({ effects, utils, input }) => {
    const multi = utils.host.multi('multi')

    // web interface (and git over HTTP)
    const httpOrigin = await multi.bindPort(uiPort, { protocol: 'http' })
    const webInterface = utils.createInterface({
      name: 'Web UI and git (HTTP)',
      id: webInterfaceId,
      description: 'Web UI for Gitea server. Also used for git over HTTP.',
      hasPrimary: true,
      disabled: false,
      ui: true,
      username: null,
      path: '',
      search: {},
    })
    const webReceipt = await webInterface.export([httpOrigin])

    // ssh interface
    const sshOrigin = await multi.bindPort(sshPort, { protocol: 'ssh' })
    const sshInterface = utils.createInterface({
      name: 'Git (SSH)',
      id: sshInterfaceId,
      description: 'Used for git over SSH',
      hasPrimary: false,
      disabled: false,
      ui: false,
      username: 'git',
      path: '',
      search: {},
    })
    const sshReceipt = await sshInterface.export([sshOrigin])

    return [webReceipt, sshReceipt]
  },
)
