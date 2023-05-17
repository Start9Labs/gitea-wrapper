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
    // This is the image where files from the project asset directory will go
    main: 'data',
  },
  containers: {
    main: {
      // Identifier for the main image volume, which will be used when other actions need to mount to this volume.
      image: 'main',
      // Specifies where to mount the data volume(s), if there are any. Mounts for pointer dependency volumes are also denoted here. These are necessary if data needs to be read from / written to these volumes.
      mounts: {
        // Specifies where on the service's file system its persistence directory should be mounted prior to service startup
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
