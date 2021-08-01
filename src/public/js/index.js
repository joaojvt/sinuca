const api = require('./api')

const init = async () => {
  api.get('/')
}

window.onload = init;

