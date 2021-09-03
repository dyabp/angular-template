FROM registry.cn-hangzhou.aliyuncs.com/yoyosoft/node:14.13.1-slim as builder

ARG ENABLE_TAOBAO_NPM

WORKDIR /app

COPY . .

RUN  npm config set registry=https://registry.npm.taobao.org/;
RUN  npm config set disturl=https://npm.taobao.org/dist/;
RUN  npm config set electron_mirror=https://npm.taobao.org/mirrors/electron/;
RUN  npm config set phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/;
RUN  npm config set puppeteer_download_host=https://storage.googleapis.com.cnpmjs.org/;
RUN  npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/;

RUN yarn

RUN npm run build

FROM nginx:1.19.6


COPY ["./_nginx/default.conf", "/etc/nginx/nginx.conf"]

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;"]



