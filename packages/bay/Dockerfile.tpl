ARG NOW=1
FROM {{HOST_PREFIX}}wkfe/mapp

WORKDIR /data
COPY ./dist /data/source/__entry__
COPY ./vendors /data/source/__vendors__

# 基座版本号
ENV MAPP_VERSION={{VERSION}}

# 默认主题包
ENV MAPP_NPM_THEME={{THEME}}
