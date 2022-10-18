FROM <%=HOST_PREFIX%>wkfe/mapp

WORKDIR /data
COPY ./dist /data/source/__entry__

# 主题本地备份，避免 npm 拉取失败
COPY ./theme /data/source/__theme__

# 基座版本号
ENV MAPP_VERSION=<%=VERSION%>

# 默认主题包, 如果你想远程来取主题包，需要配置这一行
ENV MAPP_NPM_THEME=<%=THEME%>

<% if (MOCK_ENABLED) { %>
ENV MAPP_MOCK_ENABLED=true
<% }%>
