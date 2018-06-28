FROM mhart/alpine-node
USER root
# necessary libs for imagemin
RUN apk --update --no-cache \
  add \
  automake \
  git \
  alpine-sdk \
  nasm \
  autoconf \
  build-base \
  zlib \
  zlib-dev \
  libpng \
  libpng-dev \
  libwebp \
  libwebp-dev \
  libjpeg-turbo \
  libjpeg-turbo-dev

