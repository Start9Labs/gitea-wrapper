#!/bin/sh

touch /data/start9/stats.yaml

TOR_ADDRESS=$(yq e '.tor-address' /data/start9/config.yaml)
LAN_ADDRESS=$(echo "$TOR_ADDRESS" | sed -r 's/(.+)\.onion/\1.local/g')
if [ "$(yq ".local-mode" /data/start9/config.yaml)" = "true" ]; then
    DOMAIN=$LAN_ADDRESS
    PROTOCOL=https
else
    DOMAIN=$TOR_ADDRESS
    PROTOCOL=http
fi

if ! [ -f /data/start9/secret-key.txt ]; then
    cat /dev/urandom | head -c 32 | base64 > /data/start9/secret-key.txt
fi
SECRET_KEY=$(cat /data/start9/secret-key.txt)

export GITEA__server__DOMAIN=$DOMAIN
export GITEA__server__ROOT_URL="$PROTOCOL://$DOMAIN/"
export GITEA__server__SSH_DOMAIN=$DOMAIN
export GITEA__security__INSTALL_LOCK=true
export GITEA__security__SECRET_KEY=$SECRET_KEY

if [ "$(yq ".disable-registration" /data/start9/config.yaml)" = "true" ]; then
    export GITEA__service__DISABLE_REGISTRATION=true
else
    export GITEA__service__DISABLE_REGISTRATION=false
fi

if [ "$(yq ".email-notifications.enabled" /data/start9/config.yaml)" = "true" ]; then
    export GITEA__mailer__ENABLED=true
    export GITEA__mailer__SMTP_ADDR=$(yq ".email-notifications.smtp-settings.smtp-host" /data/start9/config.yaml)
    export GITEA__mailer__SMTP_PORT=$(yq ".email-notifications.smtp-settings.smtp-port" /data/start9/config.yaml)
    export GITEA__mailer__USER=$(yq ".email-notifications.smtp-settings.smtp-user" /data/start9/config.yaml)
    export GITEA__mailer__PASSWD=$(yq ".email-notifications.smtp-settings.smtp-pass" /data/start9/config.yaml)
    export GITEA__mailer__FROM="$(yq ".email-notifications.smtp-settings.from-name" /data/start9/config.yaml)"
    export GITEA__mailer__IS_TLS_ENABLED=$(yq ".email-notifications.smtp-settings.require-transport-security" /data/start9/config.yaml)
else
    export GITEA__mailer__ENABLED=false
fi



exec tini /usr/bin/entrypoint -- /bin/s6-svscan /etc/s6
