const Spring = require('../model/spring');
const axios = require('axios');
const cheerio = require("cheerio");
const parseTorrent = require('parse-torrent');
const q_v2_client = require('../config/q_v2_client')





module.exports = {
    boot: async function(ctx, next) {

        data = 'W3sidXJsIjoiaHR0cHM6Ly93d3cud2VpeHg4LmluZm8vZm9ydW0tNzk4LTEuaHRtbCIsInR5cGUiOiJociIsInRhZ3MiOlsi5YiG5LqrIiwi5Y2O5Lq6Il19LHsidXJsIjoiaHR0cHM6Ly93d3cud2VpeHg4LmluZm8vZm9ydW0tMTM0LTEuaHRtbCIsInR5cGUiOiJ5eiIsInRhZ3MiOlsi5YiG5LqrIiwi5Lqa5rSyIl19LHsidXJsIjoiaHR0cHM6Ly93d3cud2VpeHg4LmluZm8vZm9ydW0tMTM1LTEuaHRtbCIsInR5cGUiOiJvbSIsInRhZ3MiOlsi5YiG5LqrIiwi5qyn576OIl19LHsidXJsIjoiaHR0cHM6Ly93d3cud2VpeHg4LmluZm8vZm9ydW0tMTM2LTEuaHRtbCIsInR5cGUiOiJkbSIsInRhZ3MiOlsi5YiG5LqrIiwi5Yqo5ryrIl19LHsidXJsIjoiaHR0cHM6Ly93d3cuYWlxaXFpbmcueHl6L2ZvcnVtLTcwLTEuaHRtbCIsInR5cGUiOiJ5eiIsInRhZ3MiOlsi5YiG5LqrIiwi5Lit5paH5a2X5bmVIl19LHsidXJsIjoiaHR0cHM6Ly93d3cud2VpeHg4LmluZm8vZm9ydW0tMjgwLTEuaHRtbCIsInR5cGUiOiJociIsInRhZ3MiOlsi5Y6f5YibIiwi5Y2O5Lq6Il19XQ=='
        const jsonStr = Buffer.from(data, 'base64').toString('utf8');
        const dict = JSON.parse(jsonStr);
        for(item of dict){

            var html = await axios.get(item.url)
            const parsedUrl = new URL(item.url);
            const prefix = parsedUrl.protocol + '//' + parsedUrl.hostname;
            const $ = cheerio.load(html.data)

            const rows = $("#threadlisttableid tbody[id^=normalthread] .xst")
        
            for(const row of rows) {
                const title = $(row).text()
                const url = prefix + "/" + $(row).attr("href")
                await this.bootDetail(title, url, prefix, item.type, item.tags)
            }
        }        
    },

    bootDetail: async function(title, url, prefix, type, tags) {

        const exist = await Spring.find({title: title}).exec();
        if(exist.length > 0) {
            return
        }

        console.log(title)
        console.log(url)
        var html = await axios.get(url)
        
        const $ = cheerio.load(html.data)
        var main = $("#postlist .t_fsz").first()

        // images
        const images = []
        const imgs = main.find("ignore_js_op img")
        for(const img of imgs) {
            const imageSrc = $(img).attr("file") ? $(img).attr("file") : $(img).attr("src")
            if(!imageSrc || !imageSrc.startsWith("http")) {
                continue
            }
            const imageRes = await axios.get(imageSrc, {responseType: 'arraybuffer'})
            images.push(imageRes.data)
        }
        
        // torrent
        const torrents = []
        const magnets = []
        const as = main.find("ignore_js_op a")
        for(const a of as) {
            const ele = $(a)
            if(ele.text().endsWith(".torrent")) {
                const torrentUrl = prefix + "/" + ele.attr("href")
                torrents.push(torrentUrl)
                const torrentRes = await axios.get(torrentUrl, {responseType: 'arraybuffer'})
                const torrentInfo = parseTorrent(torrentRes.data)
                const magnetURI = `magnet:?xt=urn:btih:${torrentInfo.infoHash}`;
                magnets.push(magnetURI)
            }
        }

        new Spring({
            title: title,
            name: title,
            type: type,
            url: url,
            images: images,
            torrents: torrents,
            magnets: magnets,
            status: "new",
            tags: tags,
        }).save();
    },

    list: async function(ctx, next) {
        const status = ctx.params.status;
        const data = await Spring.find({status: status})
            .select('_id title name status images url')
            .exec();
        return data.map(item => {
            return {
                id: item._id,
                title: item.title,
                name: item.name,
                status: item.status,
                imagesSize: item.images.length,
                url: item.url,
            }
        });
    },

    accept: async function(ctx, next) {
        const id = ctx.params.id;
        const exist = await Spring.findById(id).exec();
        if(exist) {
            const res = await q_v2_client.add([exist.magnets[0]])        
            Spring.findByIdAndUpdate(id, {status: "accept"}).exec();
        }    
        
    },

    reject: async function(ctx, next) {
        const id = ctx.params.id;
        const exist = await Spring.findById(id).exec();
        if(exist) {
            Spring.findByIdAndUpdate(id, {status: "reject"}).exec();
        }
    },

    delete: async function(ctx, next) {
        const id = ctx.params.id;
        const exist = await Spring.findById(id).exec();
        if(exist) {
            Spring.findByIdAndUpdate(id, {status: "delete"}).exec();
        }
    },


    image: async function(ctx, next) {
        const id = ctx.params.id;
        const index = ctx.params.index;
        const data = await Spring.findById(id)
            .select('images')
            .exec();
        return data.images[index];
    }

        

}