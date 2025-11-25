'use strict'


const API_YOUTUBE_KEY = 'AIzaSyBxciqB5_qdgXcVbpeTnr4ndENRb61OHuA'

const WIKI_API = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=`

function getVideos(value) {
    const YOUTUBE_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_YOUTUBE_KEY}&q=${value}`
    return get(YOUTUBE_URL)
        .then(data => {
            renderVideoCards(data.items)
            renderVideoPlayer(data.items[0].id.videoId)
        })
        .catch(err => console.error(err))
}
