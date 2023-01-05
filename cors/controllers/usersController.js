const getUser = async (req, res) => {
  res.json({ msg: 'test CORS pass success' })
}

module.exports = {
  getUser
}
