const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

// Configure the View Directory and Engine
app.set(path.join(__dirname, './views'))
app.set('view engine', 'ejs')

// Configure the Static Directory
app.use(express.static('public'))

// Create the Index Route
app.get('/', (req, res) => {
    res.render('index', {title: 'Index'})
})


// Create a Server
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!')
})