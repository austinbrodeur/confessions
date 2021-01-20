const sha256 = require('crypto-js/sha256');

const createCookie = (daysToExpire, document) => {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire*24*60*60*1000));

    const dateString = date.toLocaleString();
    const id = sha256(dateString);

    document.cookie = "id=" + id + ";expires=" + date.toGMTString();
}

module.exports = {createCookie};