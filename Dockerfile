FROM gitea/gitea:1.20.5

RUN apk add --no-cache tini curl yq --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
