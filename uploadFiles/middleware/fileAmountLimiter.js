const LimitNum = 3 // limit amount

const fileAmountLimiter = (req, res, next) => {
  const { files } = req
  const filesAmount = Object.keys(files).length

  if (filesAmount > LimitNum)
    return res.status(413).json({ status: 'error', message: 'upload imgs over limited amount' })

  next()
}

module.exports = fileAmountLimiter
