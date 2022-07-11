FROM wkfe/mapp

WORKDIR /data
COPY ./__entry__  /data/source/__entry__
COPY ./__theme__  /data/source/__theme__

ENV MAPP_VERSION=<%= version %>
