'use strict'
const pully = require('pully')
const converter = require('video-converter')
const parse = require('./util/parse-playlist')
const argv = require('minimist')(process.argv.slice(2))
const Regex = require('regex')
const DIR = './music/'
const Yt = require('./util/util'),
  teste = new Yt()

const regex = new Regex(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/watch\?v=\w+(&\S*)?$/)
const regxVideoID = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
const regxListID = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(playlist\/)|(playlist\?))\??list?=?([^#\&\?]*).*/

const list_id = argv._[0] || 'https://www.youtube.com/watch?v=uMDRKr1yiBo',
  protocol = 'https://',
  host = 'youtube.com',
  path = '/playlist?list=',
  url = protocol + host + path + list_id

function init (url) {
  if (isVideo(url)) {
    console.log('isVideo')
    video2audio(url)
  }
  if (isPlayList(url)) {
    console.log('isPlayList')
    list2audio(url)
  }
}

function video2audio (url) {
  let vID = getVideoId(url)
  if (!vID) {
    console.log('video id not found exit app')
    return null
  }

  teste.videoDownload(vID, DIR)
  teste
    .on('download', (title) => console.log('Download: ' + title))
    .on('conversion', (title) => console.log('Conversion: ' + title))
    .on('error', (err) => console.log(err))
    .on('finished', () => console.log('Everything is over now'))
}
function list2audio (url) {
  let lID = getListID(url)
  if (!lID) {
    console.log('playlist not found')
    return null
  }
  console.log(lID)
  teste.playlistDownload(lID, DIR)
  teste
    .on('download', (title) => console.log('Download: ' + title))
    .on('conversion', (title) => console.log('Conversion: ' + title))
    .on('error', (err) => console.log(err))
    .on('finished', () => console.log('Everything is over now'))
}

function isVideo (url) {
  let result = url.match(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/watch\?v=\w+(&\S*)?$/)
  console.log(result)
  return result != null ? true : false
}
function getVideoId (url) {
  let match = url.match(regxVideoID)
  // console.log(match)
  return match && match[7].length > 0 ? match[7] : null
}
function isPlayList (url) {
  let resutl = url.match(regxListID)
  return resutl != null ? true : false
}

function getListID (argument) {
  let match = url.match(regxListID)
  // console.log(match)
  return match && match[7].length > 0 ? match[7] : null
}

init(list_id)
// video2audio('zhl-Cs1-sG4')
