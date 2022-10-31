var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.IMAGE_PUBLIC_KEY,
    privateKey : process.env.IMAGE_PRIVATE_KEY,
    urlEndpoint : "https://ik.imagekit.io/s3tynwsqe/"
});

module.exports = {imagekit}