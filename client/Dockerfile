FROM node:19.4-bullseye as build
WORKDIR /usr/src/client
COPY package*.json ./
RUN --mount=type=cache,target=/usr/src/client/.yarn \
YARN_CACHE_FOLDER=/usr/src/client/.yarn \
yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginxinc/nginx-unprivileged:1.23-alpine-perl
COPY ngnix.conf /etc/nginx/conf.d/default.conf
COPY --from=build usr/src/client/dist/ /usr/share/nginx/html
EXPOSE 8080