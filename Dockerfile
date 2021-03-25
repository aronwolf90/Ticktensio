FROM ruby:2.6-alpine AS base

ENV DOCKER true
ENV DISABLE_SPRING true
ENV DISABLE_BOOTSNAP true

WORKDIR  /app

RUN echo "export PATH=/app/bin:$PATH" >> ~/.profile && \
  apk add --no-cache \
  tzdata postgresql-client \
  libressl-dev gnupg libstdc++ \
  less git g++ make \
  bash openssh-client \
  nodejs yarn vim tmux \
  postgresql-dev \
  grep curl python2 \
  shared-mime-info

FROM base AS builder

COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs $(nproc)
COPY yarn.lock package.json ./
RUN yarn install && yarn cache clean

COPY . ./

RUN SECRET_KEY_BASE='9479a648d2fb' \
  DATABASE_URL=postgres://root:password@db%5Ftest/root \
  RAILS_ENV=production \
  bundle exec rails assets:clean webpacker:compile && \
  rm -r tmp/ && \
  mkdir -p tmp/pids

FROM base

COPY . ./
COPY --from=builder /usr/local/bundle/ /usr/local/bundle/
COPY --from=builder /app/public /app/public

CMD bundle exec puma -C config/puma.rb
