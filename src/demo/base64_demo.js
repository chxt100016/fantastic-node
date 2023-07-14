


json = JSON.stringify([
    {
        url: "https://www.weixx8.info/forum-798-1.html",
        type: "hr",
        tags: ["分享", "华人"],
    },
    {
        url: "https://www.weixx8.info/forum-134-1.html",
        type: "yz",
        tags: ["分享", "亚洲"],
    },
    {
        url: "https://www.weixx8.info/forum-135-1.html",
        type: "om",
        tags: ["分享", "欧美"],
    },
    {
        url: "https://www.weixx8.info/forum-136-1.html",
        type: "dm",
        tags: ["分享", "动漫"],
    },
    {
        url: "https://www.aiqiqing.xyz/forum-70-1.html",
        type: "yz",
        tags: ["分享", "中文字幕"],
    },
    {
        url: "https://www.weixx8.info/forum-280-1.html",
        type: "hr",
        tags: ["原创", "华人"],
    },
])

base64Str = Buffer.from(json).toString('base64');
console.log(base64Str)




// data = 'W3sidXJsIjoiaHR0cHM6Ly93d3cud2VpeHg4LmluZm8vZm9ydW0tNzk4LTEuaHRtbCIsInR5cGUiOiJociIsInRhZyI6WyLliIbkuqsiLCLljY7kuroiXX0seyJ1cmwiOiJodHRwczovL3d3dy53ZWl4eDguaW5mby9mb3J1bS0xMzQtMS5odG1sIiwidHlwZSI6Inl6IiwidGFnIjpbIuWIhuS6qyIsIuS6mua0siJdfSx7InVybCI6Imh0dHBzOi8vd3d3LndlaXh4OC5pbmZvL2ZvcnVtLTEzNS0xLmh0bWwiLCJ0eXBlIjoib20iLCJ0YWciOlsi5YiG5LqrIiwi5qyn576OIl19LHsidXJsIjoiaHR0cHM6Ly93d3cud2VpeHg4LmluZm8vZm9ydW0tMTM2LTEuaHRtbCIsInR5cGUiOiJkbSIsInRhZyI6WyLliIbkuqsiLCLliqjmvKsiXX0seyJ1cmwiOiJodHRwczovL3d3dy5haXFpcWluZy54eXovZm9ydW0tNzAtMS5odG1sIiwidHlwZSI6Inl6IiwidGFnIjpbIuWIhuS6qyIsIuS4reaWh+Wtl+W5lSJdfSx7InVybCI6Imh0dHBzOi8vd3d3LndlaXh4OC5pbmZvL2ZvcnVtLTI4MC0xLmh0bWwiLCJ0eXBlIjoiaHIiLCJ0YWciOlsi5Y6f5YibIiwi5Y2O5Lq6Il19XQ=='
// const jsonStr = Buffer.from(data, 'base64').toString('utf8');
// const json = JSON.parse(jsonStr);

// console.log(json)