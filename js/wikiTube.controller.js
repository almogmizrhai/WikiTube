'use strict'


const searchInputs = []
const STORAGE_KEY = 'wikiTubeSearchHistory'

function onInit() {
  console.log('WikiTube Controller Init')
}

function onSearch() {
  const elSearchInput =document.querySelector('.search')
  const elIntro = document.querySelector('.intro')
  const elLoader = document.querySelector('.loader')

  getVideos(elSearchInput.value)

  searchInputs.push(elSearchInput.value)
  saveToStorage(STORAGE_KEY, searchInputs)
  renderSearchHistory()

  elLoader.classList.remove('hide')
  elIntro.classList.add('hide')
  
}

function renderVideoCards(data){

  const elSearchResult = document.querySelector('.search-result')

  const strHtml = data.map((video) => {
    return `<div class="video-card flex" 
    onclick="renderVideoPlayer('${video.id.videoId}' , '${video.snippet.title}')">
    <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
    <h3>${video.snippet.title}</h3> 
    </div>`
  })

  elSearchResult.innerHTML = strHtml.join('')
}

function renderVideoPlayer(videoId,videoTitle){

  const elVideoPlayer = document.querySelector('.video-player')
  if (!elVideoPlayer) {
    console.error('video-player element not found!')
    return
  }
  const strHtml = ` 
  <h2> Video Player </h2>
  <iframe width="420" height="345" src="https://www.youtube.com/embed/${videoId}"></iframe>
  `
  elVideoPlayer.innerHTML = strHtml

  renderVideoInfo(videoTitle)
}

function renderVideoInfo(videoTitle){

  getWikiArticles(videoTitle)
  .then(infoVideo => {
  
    const elVideoInfo = document.querySelector('.video-info')
    const strHtml = `
    <h2> Video Title: ${videoTitle} </h2>
    <p> ${infoVideo} </p>
    `
    elVideoInfo.innerHTML = strHtml
  })

  .catch(err => {
    console.error(err)
  })

}

function renderSearchHistory(){
  const elHistoryList = document.querySelector('.history-list')

  const storedHistory = loadFromStorage(STORAGE_KEY)
  console.log('Stored History:', storedHistory)
  
  if (storedHistory.length === 0) {
    console.log('No search history found in storage.')
    return
  }
  else {
    console.log('Loaded search history from storage:', storedHistory)
    const strHtml = storedHistory.map(input => {
    return `<li>${input}</li>`
  })
  elHistoryList.innerHTML = strHtml.join('')
  }
}

function clearSearchHistory() {
  localStorage.removeItem(STORAGE_KEY)
  searchInputs.length = 0
  renderSearchHistory()
}