var mongoose = require('mongoose');

module.exports = mongoose.model('spring', {
    title: String,
    name: String,
    type: String,
    url: String,
    images: [Buffer],
    torrents: [String],
    magnets: [String],
    tags:[String],
    status: String,
});