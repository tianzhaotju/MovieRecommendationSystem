// use addon to mock http request
module.exports = {
  // GET
  'POST /login': function (req, res, next) {
    const normal = {
      error: '',
    };
    const error = {
      error: '密码不对',
    }
    if (req.body.username === 'a') {
      res.send(normal)
    } else res.send(error)
  },
}
