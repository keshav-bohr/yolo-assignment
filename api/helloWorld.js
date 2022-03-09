function helloWorld(req, res, next) {
    console.log('Hello World')
    res.json({
        success: true,
        message: 'Hello World'
    })
}

module.exports = {
    helloWorld
}