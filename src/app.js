const fs = require('fs')
const path = require('path')
const express = require('express')
const {accounts, users, writeJSON} = require('./data')
const accountRoutes = require('./routes/accounts')
const servicesRoutes = require('./routes/services')

const app = express()

// Configure the View Directory and Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Configure the Static Directory
app.use(express.static(path.join(__dirname, 'public')))

// URL Encoded Middleware
app.use(express.urlencoded({extended: true}))

// Create the Index Route
app.get('/', (req, res) => {
    res.render('index', {title: 'Account Summary', accounts: accounts})
})

// Create the Profile Route
app.get('/profile', (req, res) => {
    res.render('profile', {user: users[0]})
})

//ROUTING TO ACCOUNT
app.use('/account', accountRoutes)
// ROUTING TO SERVICES
app.use('/services', servicesRoutes)

// Create a Server
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!')
})