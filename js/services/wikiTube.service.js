'use strict'


const API_YOUTUBE_KEY = 'AIzaSyBxciqB5_qdgXcVbpeTnr4ndENRb61OHuA'


function getVideos(value) {
    const YOUTUBE_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_YOUTUBE_KEY}&q=${value}`
    return get(YOUTUBE_URL)
    .then(data => {
        renderVideoCards(data.items)
        renderVideoPlayer(data.items[0].id.videoId)
    })
    .catch(err => console.error(err))
    .finally(() => {
        const elLoader = document.querySelector('.loader')
        elLoader.classList.add('hide')
    })
}

function getWikiArticles(searchValue) {
    const WIKI_API = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=${searchValue}`
    return get(WIKI_API)
    .then(data => {
        const articles = data.query.search
        if (articles.length === 0) return 'No related Wikipedia articles found.'
        return articles.map(article => article.snippet).join(' ')
    })
    .catch(err => {
        console.error(err)
        return 'Error fetching Wikipedia articles.'
    })
}