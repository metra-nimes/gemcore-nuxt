const { Router } = require('express')

const router = Router()


/* SET Session vars. */
router.post('/login', function (req, res) {
  //res.status(200).json(req.body)
  let {username,token} = req.body
  if (username && token) {
    req.session.authToken = token
    req.session.isLogged = true
    res.status(200).json('Success')
  } else res.status(400).send({ error: 'Session store failed!' })
})

router.get('/logout', function (req, res) {
  if (req.session && req.session.authToken && req.session.isLogged) {
    req.session.authToken = null
    req.session.isLogged = false
    res.status(200).json('Success')
  } else res.status(400).send({ error: 'Session store failed!' })
})

module.exports = router
