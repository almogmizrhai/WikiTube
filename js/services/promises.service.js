// ajax.service.js
'use strict'

function get(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            const res = JSON.parse(xhr.responseText)
            resolve(res)
          } catch (err) {
            reject(err)
          }
        } else {
          reject(new Error('Request failed with status ' + xhr.status))
        }
      }
    }
    xhr.open('GET', url, true)
    xhr.send()
  })
}
