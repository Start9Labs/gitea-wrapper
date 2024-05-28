FROM gitea/gitea:1.22.0

RUN apk add --no-cache tini curl yq; \
    rm -f /var/cache/apk/*

COPY --chmod=755 docker_entrypoint.sh /usr/local/bin/
