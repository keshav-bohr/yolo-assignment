const express = require('express')
const app = express()

// fetching env variables
require('dotenv').config()
const { PORT: appPort } = process.env

// api handler
const apiHandler = require('./api')

// api start point
app.use('/api', apiHandler)

// global error handler
app.use((error, req, res, next) => {
    res.status(500).json({
        success: false,
        error: error.message,
        stack: error.stack
    })
})


app.listen(appPort || 3000, () => { 
    console.log('server started')    
})