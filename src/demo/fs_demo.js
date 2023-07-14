const fs = require('fs');
const axios = require('axios');


axios.get("https://images.aibaaiba.xyz/5c886221594ba4dc3b43c628d15d7f1f.jpg", {responseType: 'arraybuffer'}).then(res => {
    console.log(res);
    fs.writeFileSync('/Users/chenxintong/Downloads/tmp.jpg', res.data);
    
})
// fs.writeFileSync('/Users/chenxintong/Downloads/devit-logo-square2.png', res.data);