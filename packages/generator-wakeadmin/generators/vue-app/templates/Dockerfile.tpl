FROM wkfe/mapp-child

ENV MAPP_CACHE_KEY=<%= UUID %>

COPY ./dist /data