FROM gitea/gitea:1.18.3

RUN apk update
RUN apk add --no-cache tini curl --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
