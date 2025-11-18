'use strict'

const API_USERS_URL = 'https://api.github.com/users'

function getCard() {
    return get(API_USERS_URL)
        .then(data => data)
        .catch(err => console.error(err))
}