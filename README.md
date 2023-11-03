<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# Gitea for StartOS

Gitea is a community managed lightweight code hosting solution written in Go.
It is published under the MIT license. This repository creates the `s9pk` package that is installed to run `gitea` on [StartOS](https://github.com/Start9Labs/start-os/).

## Dependencies

Install the system dependencies below to build this project by following the instructions in the provided links. You can find instructions on how to set up the appropriate build environment in the [Developer Docs](https://docs.start9.com/latest/developer-docs/packaging).

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [deno](https://deno.land/#installation)
- [make](https://www.gnu.org/software/make/)
- [start-sdk](https://github.com/Start9Labs/start-os/tree/sdk/backend)

## Cloning

Clone the Gitea package repository locally.

```
git clone git@github.com:Start9Labs/gitea-startos.git
cd gitea-startos
```

## Building

To build the **Gitea** service as a universal package, run the following command:

```
make
```

Alternatively the package can be built for individual architectures by specifying the architecture as follows:

```
make x86
```

or

```
make arm
```

## Installing (on StartOS)

Before installation, define `host: https://server-name.local` in your `~/.embassy/config.yaml` config file then run the following commands to determine successful install:

> :information_source: Change server-name.local to your Start9 server address

```
start-cli auth login
#Enter your StartOS password
make install
```

**Tip:** You can also install the gitea.s9pk by sideloading it under the **StartOS > System > Sideload a Service** section.

## Verify Install

Go to your StartOS Services page, select **Gitea**, configure and start the service.

**Done!**
