require('../settings')
const express = require('express')
var isUrl = require("is-url")
var fetch = require('node-fetch')
const fs = require('fs-extra')
const request = require('request')
const isImageURL = require('image-url-validator').default
const textpro = require('../lib/textpro')
const photooxy = require('../lib/photooxy')
const { fetchJson, runtime, getBuffer } = require('../lib/functions')
const { onGoing, BatchAnimeS, quotesanime, pornovid, hentaivid, WibuDl, xnxxs, xnxxdl, tikhd, WibuSearch, BokepRandom, OtakuS, tikcd, ighd, pin, wallpaper, ytplay, ytvid, ytmplay, ytmpvid, isgd, fbvid, fbimg, ai, kfdl, tts, txtoimg, TTStalk, igs, botTT, allindl, unsplash, ytplay2, WallFlare, mynime, NimeDl } = require('../lib/myscrape')
const yts = require('ytsearch.js')
const { set } = require('lodash')
var router = express.Router()

// - TOOLS MENU \\


// - RANDOM MENU - \\
router.get('/random/bokep', async (req, res, mext) => {
var apikey = req.query.apikey
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
let x = await BokepRandom()
res.json({
author: "Alfa",
result: x.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/random/hentai', async (req, res, mext) => {
var apikey = req.query.apikey
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
let x = await hentaivid()
res.json({
status: true,
creator: `${creator}`,
result: x
})
} else {
res.json(loghandler.notapikey)
}
})

router.get('/random/katajawa', async (req, res, next) => {
let data = JSON.parse(fs.readFileSync('./lib/jw.json'))
var result = data[Math.floor(Math.random() * data.length)];
res.json({
status: true,
creator: creator,
result: result
})
})
// AKHIR RANDOM \\
// ANIME \\
router.get('/anime/mynimeku', async (req,  res, next) => {
let text = req.query.text
if (!text) return res.json(loghandler.nottext)
let apikey = req.query.apikey
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
mynime(text).then((x) => {
status: true,
creator: creator,
result: x
}).catch((e) => {
res.json({
status: false,
creator: creator,
message: e.message
})
})
} else {
res.json(loghandler.notapikey)
}
})

router.get('/anime/mynimedl', async (req,  res, next) => {
let url = req.query.url
if (!url) return res.json(loghandler.noturl)
let apikey = req.query.apikey
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
NimeDl(text).then((x) => {
status: true,
creator: creator,
result: x
}).catch((e) => {
res.json({
status: false,
creator: creator,
message: e.message
})
})
} else {
res.json(loghandler.notapikey)
}
})

router.get('/anime/otaku', async (req,  res, next) => {
let text = req.query.text
if (!text) return res.json(loghandler.nottext)
let apikey = req.query.apikey
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
let x = await OtakuS(text)
res.json({
status: true,
creator: creator,
result: x
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/anime/wibudesu', async (req,  res, next) => {
let text = req.query.text
if (!text) return res.json(loghandler.nottext)
let apikey = req.query.apikey
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
let x = await WibuSearch(text)
res.json({
status: true,
creator: creator,
result: x.res
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/anime/wibudl', async (req,  res, next) => {
let url = req.query.url
if (!url) return res.json(loghandler.noturl)
let apikey = req.query.apikey
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
let x = await WibuDl(url)
res.json({
status: true,
creator: creator,
result: x.result,
link_dl: x.file
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/anime/ongoing', async (req,  res, next) => {
let apikey = req.query.apikey
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
let x = await onGoing()
res.json({
status: true,
creator: creator,
result: x
})
} else {
res.json(loghandler.notapikey)
}
})
// AKHIR ANIME \\
// AI MENU \\
router.get('/ai/gpt', async (req, res, next) => {
let text = req.query.text
if (!text) return res.json(loghandler.nottext)
let z = await ai(text)
res.json({
status: true,
author: "Alfa",
result: z.reply
})
})
router.get('/ai/txt2img', async (req, res, next) => {
let text = req.query.text
let apikey = req.query.apikey
if (!text) return res.json(loghandler.noturl)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
let x = await txtoimg(text)
var requestSettings = {
        url: x.url,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    } else {
    res.json(loghandler.notapikey)
    }
})
// AKHIR AI \\
/*router.get('/nsfw/arty', async (req, res, next) => {
const data = JSON.parse(fs.readFileSync('./onlyfans/arty.json'))
var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
})*/
// - DOWNLOADER MENU - \\
router.get('/downloader/ssweb', async (req, res,  next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
var requestSettings = {
        url: "https://screenia.best/api/screenshot?url="+url,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    } else {
    res.json(loghandler.notapikey)
    }
})
router.get('/downloader/ighd', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)  
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
ighd(url).then((x) => {
const resnyo = {
title: x.title,
durasi: x.durasi,
link_dl: x.medias[0].url,
quality: x.medias[0].quality,
size: x.medias[0].formattedSize,
sizeS: x.medias[0].size
}
res.json({
status: true,
creator: `${creator}`,
result: resnyo
})
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/fbdl', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)  
if (!url.includes('facebook.com')) return res.json({ message: 'Itu Bkn Link FB Bnh 🗿 Lawak Lu 🤣. Btw Kalo Mau Request Chat +6287715768324' })
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
let { res } = await fbvid(url)
res.json({
status: true,
creator: `${creator}`,
result: res
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/tiktok', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!url.includes('tiktok.com')) return res.json({ message: 'Itu Bkn Link TikTok Bnh 🗿 Lawak Lu 🤣. Btw Kalo Mau Request Chat +6287715768324' })
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
tikhd(url).then((x) => {
res.json({
status: true,
result: x
})
}).catch((e) => {
res.json({
status: false,
message: e
})
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/tiktok2', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!url.includes('tiktok.com')) return res.json({ message: 'Itu Bkn Link TikTok Bnh 🗿 Lawak Lu 🤣. Btw Kalo Mau Request Chat +6287715768324' })
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
tikcd(url).then((x) => {
res.json({
status: true,
creator: `${creator}`,
result: x
})
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/tiktok3', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!url.includes('tiktok.com')) return res.json({ message: 'Itu Bkn Link TikTok Bnh 🗿 Lawak Lu 🤣. Btw Kalo Mau Request Chat +6287715768324' })
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
tts(url).then((x) => {
res.json({
status: true,
creator: `${creator}`,
result: x
})
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/ytplay2', async (req, res,  next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
const o = await ytplay2(q)
res.json({
status: true,
creator: `${creator}`,
result: o
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/ytplay', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
const o = await ytplay(q)
res.json({
status: true,
creator: `${creator}`,
result: o
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/ytdl', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!url.includes('youtube.com' || 'youtu.be')) return res.json({ message: 'Itu Bkn Link YT Bnh 🗿 Lawak Lu 🤣. Btw Kalo Mau Request Chat +6287715768324' })
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
ytdl(url).then((d) => {
res.json({
status: true,
creator: `${creator}`,
result: d.result
})
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/xnxxdl', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
xnxxdl(q).then(({ result }) => {
res.json({
status: true,
creator: `${creator}`,
result: result
})
})
} else {
res.json(loghandler.notapikey)
}
})
// - SEARCH MENU - \\
router.get('/search/unsplash', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!q) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
unsplash(text).then((x) => {
res.json({
status: true,
creator: creator,
result: x
})
}).catch((e) => {
res.json(e)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/search/wallflare', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!q) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
WallFlare(text).then((x) => {
res.json({
status: true,
creator: creator,
result: x
})
}).catch((e) => {
res.json(e)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/search/xnxx', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
xnxxs(q).then(({ res }) => {
res.json({
status: true,
creator: `${creator}`,
result: res
})
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/search/ytsearch', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
yts(q).then((x) => {
res.json({
status: true,
creator: `${creator}`,
result: x
})
})
} else {
res.json(loghandler.notapikey)
}
})

// - PHOTOOXY MENU - \\
router.get('/photooxy/dark-metal', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/elegant-3d-neon-dark-metal-text-effect-online-free-416.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/white-stone', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/online-3d-white-stone-text-effect-utility-411.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/shadow', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/white-cube', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/3d-text-effect-under-white-cube-217.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/gradient', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/gradient-avatar-text-effect-207.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/fur-text', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/fur-text-effect-generator-198.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/flaming', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/scary-cemetery', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/text-on-scary-cemetery-gate-172.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/harry-potter', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/3d-wood', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/3d-wood-text-black-style-182.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/illuminated-metallic', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/put-your', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/8-bit', async(req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/8-bit-text-on-arcade-rift-175.html", [text1,text2]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})


// - TOOLS MENU - \\
router.get('/tools/ssweb', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
let result = await getBuffer(`https://saipulanuar.ga/api/download/ssweb?url=${url}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})

module.exports = router