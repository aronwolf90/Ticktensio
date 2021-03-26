FROM node:15-alpine as builder

WORKDIR /app

RUN apk add libsass bash git python3 make g++
COPY yarn.lock package.json ./
RUN yarn install && yarn cache clean

COPY . ./
RUN yarn build

FROM nginx

ENV FILEDIR=/usr/share/nginx/html/

run echo "{}" > /usr/share/nginx/html/health_check.json
COPY generate_env.sh /docker-entrypoint.d/
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
