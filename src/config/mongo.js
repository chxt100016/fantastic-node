const mongoose = require('mongoose');
mongoose.set('debug', true);
const options = {

}

const url = 'mongodb://fantastic:123456@2202.com:27017/fantastic'

module.exports = {
    connect: ()=> {            
        mongoose.connect(url,options)
        let db = mongoose.connection
        db.on('error', console.error.bind(console, '连接错误:'));
        db.once('open', ()=> {
            console.log('mongodb connect suucess');
        })
    }
}
