const cheerio = require("cheerio");
const markup = `<ul><li class="chxt">1</li><li>2</li></ul><ul><li>11</li><li>22</li></ul>`;

const $ = cheerio.load(markup);

const data = $("li");
console.log($(data[0]).attr("class"));
