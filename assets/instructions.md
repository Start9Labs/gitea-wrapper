# Instructions for Gitea

Welcome to Gitea!

The first time you start Gitea and launch its UI, it will take you to a
configuration page. You can just accept the settings on this page, and Gitea
will be installed.

Gitea works pretty much the same as Github. An exception to this is that, when
accessing your Embassy's Gitea instance remotely (that is, from outside your
Embassy's local network), you (currently) _must_ use Tor.

# Git over Tor

To use `git` over HTTP/Tor with Gitea with either of the two methods listed
below, you will need a
[Tor proxy](https://start9.com/latest/user-manual/connecting/connecting-tor/tor-os/index)
running on port 9050.

# Git over HTTP/Tor

To use git over HTTP/Tor with your Gitea instance, you will need to set up your
git config to use this proxy whenever you interact with a git remote that is
hosted over HTTP (most git servers these days don't use cleartext http, but if
you happen to access one after running this command, it will be accessed over
Tor as well since this is a global setting).

(Note: using cleartext HTTP over Tor is very secure when accessing hidden
services with .onion URLs, such as your Embassy Gitea instance. This is because
Tor encrypts all traffic, and authentication is taken care of by the URL
itself.)

You can configure git to use HTTP over Tor either globally or locally.

## Using the global git config

```
git config --global http.proxy "socks5h://127.0.0.1:9050"
```

## Using the local git config

If altering the global config as above messes up your ability to use git, you
can unset it like so:

```
git config --global --unset http.proxy
```

You can also set `http.proxy` on a per-repo basis. First clone the repo using
the `--config` flag like so:

```
git clone http://<key>.onion/<user>/<repo> --config "http.proxy=socks5h://127.0.0.1:9050"
```

OR you may use the `http_proxy` environment variable like so:

```
http_proxy=socks5h://127.0.0.1:9050 git clone http://<key>.onion/<user>/<repo>
```

Then change directory into your repo:

```
cd <repo>
```

Then update your local config:

```
git config --local http.proxy "socks5h://127.0.0.1:9050"
```

Do this for every repo you use over HTTP/Tor.

# Git over SSH/LAN

Using Gitea over SSH/LAN (.local) is not supported. Once the embassyOS clearnet
feature has been implemented, the ability to use Gitea over SSH/LAN will be
added.

# Git over SSH/Tor

To use git over SSH/Tor with Gitea, enter this command on your development
machine to modify your ssh config to proxy all SSH connections to .onion domains
through your Tor proxy:

```
echo -e '\nHost *.onion\n  ProxyCommand /usr/bin/nc -x localhost:9050 -X5 %h %p' >> ~/.ssh/config
```

You will also need to have `netcat` (`nc`) installed, which should already be
installed if you have Mac or Linux. If it isn't, you can use
`apt install netcat` or `brew install netcat` on MacOS. If you have Windows, I
can't help you. Maybe
[this](https://www.configserverfirewall.com/windows-10/netcat-windows/) will
work.

Now you can do things like `git clone`, `git push`, `git pull` etc.

Enjoy!
