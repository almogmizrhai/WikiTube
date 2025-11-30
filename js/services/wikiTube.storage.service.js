

'use strict'


function saveToStorage(key, value) {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
}

function loadFromStorage(key){
    const json = JSON.parse(localStorage.getItem(key))
    return json
}