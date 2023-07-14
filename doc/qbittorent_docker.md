docker run -d \
  --name=etc \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  -e WEBUI_PORT=8088 \
  -p 8088:8088 \
  -v /etc/download/qbittorrent/config:/config \
  -v /etc/download/qbittorrent/downloads:/downloads \
  --restart unless-stopped \
  linuxserver/qbittorrent

  admin
  adminadmin