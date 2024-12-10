import { sdk } from './sdk'
import { uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.host.multi(effects, 'ui-multi')

  // http
  const httpOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
  })
  const httpInterface = sdk.createInterface(effects, {
    name: 'Web UI and git (HTTP)',
    id: 'http',
    description: 'Web UI for Gitea. Also used for git over HTTP',
    type: 'ui',
    hasPrimary: true,
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    search: {},
  })
  const httpReceipt = await httpOrigin.export([httpInterface])

  // ssh
  const sshOrigin = await uiMulti.bindPort(22, {
    protocol: 'ssh',
  })
  const sshInterface = sdk.createInterface(effects, {
    name: 'git (SSH)',
    id: 'ssh',
    description: 'Used for git over SSH',
    type: 'api',
    hasPrimary: false,
    masked: false,
    schemeOverride: null,
    username: 'git',
    path: '',
    search: {},
  })
  const sshReceipt = await sshOrigin.export([sshInterface])

  return [httpReceipt, sshReceipt]
})
