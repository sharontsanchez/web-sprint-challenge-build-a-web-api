// add middlewares here related to projects

const handleError = (err, req, res) => {
    res.status(err.status || 500).json({
        message: err.message,
    })
}

module.exports = handleError;