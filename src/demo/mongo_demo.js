var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://fantastic:123456@2202.com:27017/fantastic');

var Cat = mongoose.model('Cat', {
    name: String,
    friends: [String],
    age: Number,
    images: Buffer,
});

async function main() {
    const data = await Cat.find();
    console.log(data)
    console.log(data.length);
    mongoose.disconnect();
}

main();