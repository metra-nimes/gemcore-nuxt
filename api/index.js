
const express = require('express')

const app = express()

/*Require API routes*/
const auth = require('./routes/auth')

/*Import API routes*/
app.use(auth)

/*Export the server middleware*/
module.exports = {
  path: '/api',
  handler: app
}
