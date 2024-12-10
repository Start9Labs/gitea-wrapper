import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'gitea',
  title: 'Gitea',
  license: 'mit',
  wrapperRepo: 'https://github.com/Start9Labs/gitea-startos',
  upstreamRepo: 'https://github.com/Start9Labs/gitea',
  supportSite: 'https://docs.gitea.io/',
  marketingSite: 'https://gitea.io/',
  donationUrl: null,
  description: {
    short: 'A painless self-hosted Git service',
    long: 'Gitea is a community managed lightweight code hosting solution written in Go. It is published under the MIT license',
  },
  assets: [],
  volumes: ['main'],
  images: {
    gitea: {
      source: {
        dockerTag: 'gitea/gitea',
      },
    },
  },
  hardwareRequirements: {},
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
