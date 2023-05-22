import { setupManifest } from '@start9labs/start-sdk/lib/manifest/setupManifest'

export const manifest = setupManifest({
  id: 'gitea',
  title: 'Gitea',
  version: '1.19.2',
  releaseNotes: `
* Update for StartOS 0.4.0
* Update upstream to 0.19.2
`,
  license: 'mit',
  replaces: Array<string>(),
  wrapperRepo: 'https://github.com/Start9Labs/gitea-wrapper/',
  upstreamRepo: 'https://github.com/go-gitea/gitea/',
  supportSite: 'https://docs.gitea.io/',
  marketingSite: 'https://gitea.io/',
  donationUrl: null,
  description: {
    short: 'A painless self-hosted Git service',
    long: 'Gitea is a community managed lightweight code hosting solution written in Go. It is published under the MIT license',
  },
  assets: {
    license: 'LICENSE',
    icon: 'assets/icon.png',
    instructions: 'assets/instructions.md',
  },
  volumes: {
    main: 'data',
  },
  containers: {
    main: {
      image: 'main',
      mounts: {
        main: '/data',
      },
    },
  },
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

export type Manifest = typeof manifest
