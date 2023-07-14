const api = require('qbittorrent-api-v2');




(async () => {
	

	const client = await api.connect('http://2202.com:8088', 'admin', 'adminadmin')	

	// const ss = await client.torrents.delete('66c05bf675aa4a05fcf039472026a80f59b54bfe', true)
	// console.log(ss);
	const torrents = await client.torrents()

	// qbt.deleteTorrents("66c05bf675aa4a05fcf039472026a80f59b54bfe", true);
	console.log(torrents);



	
})();


