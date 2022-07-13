ARG HOST_PREFIX
ARG VERSION
FROM ${HOST_PREFIX}wkfe/mapp

WORKDIR /data
COPY ./dist  /data/source/__entry__

# 基座版本号
ENV MAPP_VERSION=${VERSION}

# 默认主题包
ENV MAPP_NPM_THEME=@wakeadmin/theme-wakedata
