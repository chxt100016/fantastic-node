const { qBittorrentClient } = require('@robertklep/qbittorrent');

const client = new qBittorrentClient('http://2202.com:8088', 'admin', 'adminadmin');




module.exports =  {
    add: async function(magnet) {
        client.torrents.add(magnet)
    },

}
    