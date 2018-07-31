// Following the description for double submit cookie:

//https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#Double_Submit_Cookie

const express =require('express')
const cookieSession = require('cookie-session')

const app = express()

app.use(cookieSession({
  name: 'session',
  keys: ['imasupersecretkey', 'imanothersupersecretkey'],

  maxAge: 24*60*60*60,
}))

app.use(function(req, res, next) {
  req.session.views = (req.session.views || 0) + 1
  req.session.submit = 'some long string for submitting data'
  next()
})

app.get('/', function (req, res, next) {

  res.json({ views: req.session.views, submit: req.session.submit })

})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
