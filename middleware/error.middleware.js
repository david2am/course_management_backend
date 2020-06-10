function errorHandler(err, req, res, next) {
    console.log(ex.stack)
    res.status(500).send('Something failed.')
}

module.exports = errorHandler;