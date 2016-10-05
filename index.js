'use strict'
var pully = require('pully')
var converter = require('video-converter')
var parse = require('./util/parse-playlist')
var argv = require('minimist')(process.argv.slice(2))
var Regex = require('regex')
let DIR = './music/'
let Yt = require('./util/util'),
  teste = new Yt()

var regex = new Regex(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/watch\?v=\w+(&\S*)?$/)
var list_id = argv._[0] || 'PLpRjkOHBe_TgmznCle__jWDhoV4aFgCjw',
  protocol = 'https://',
  host = 'youtube.com',
  path = '/playlist?list=',
  url = protocol + host + path + list_id

var options = {
  url: 'https://youtu.be/0Gkhol2Q1og',
  preset: 'audio'
}

converter.setFfmpegPath('/usr/local/Cellar/ffmpeg/3.1.4/', function (err) {
  if (err) throw err
})

// pully(options, function (err, info, filePath) {
//   // console.log(info)
//   console.log('Downloaded to ' + filePath)
//   // convert mp4 to mp3 
//   converter.convert(filePath, 'sample.mp3', function (err) {
//     if (err) throw err
//     console.log('done')
//   })
// })

converter.on('progress', function (percentage) {
  console.log(percentage)
})

function init (url) {
  if (isVideo(url)) {
    console.log('isVideo')
    video2audio(url)
  }else {
    console.log('isList')
    parse(url, function (err, id) {
      var title = id.substr(9) + '.mp3'
      var target = protocol + host + id
    // video2audio(id)
    })
  }
}
video2audio('zhl-Cs1-sG4')
function video2audio (url) {
  console.log(url)
  teste.videoDownload(url, DIR)
  teste
    .on('download', (title) => console.log('Download: ' + title))
    .on('conversion', (title) => console.log('Conversion: ' + title))
    .on('error', (err) => console.log(err))
    .on('finished', () => console.log('Everything is over now'))
}

function isVideo (url) {
  var result = url.match(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/watch\?v=\w+(&\S*)?$/)
  console.log(result)
  return result != null ? true : false
}

init(list_id)
