const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

// Configure the View Directory and Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Configure the Static Directory
app.use(express.static(path.join(__dirname, 'public')))

// URL Encoded Middleware
app.use(express.urlencoded({extended: true}))

// Read Account Data
const accountData = fs.readFileSync('src/json/accounts.json', 'utf8')
const accounts = JSON.parse(accountData)

// Read User Data
const userData = fs.readFileSync('src/json/users.json', 'utf8')
const users = JSON.parse(userData)

// Create the Index Route
app.get('/', (req, res) => {
    res.render('index', {title: 'Account Summary', accounts: accounts})
})

// Create the Savings Account Route
app.get('/savings', (req, res) => {
    res.render('account', {account: accounts.savings})
})

app.get('/checking', (req, res) => {
    res.render('account', {account: accounts.checking})
})

app.get('/credit', (req, res) => {
    res.render('account', {account: accounts.credit})
})

// Create the Profile Route
app.get('/profile', (req, res) => {
    res.render('profile', {user: users[0]})
})

// Create the Transfer GET Route
app.get('/transfer', (req, res) => {
    res.render('transfer', {user: users[0]})
})

// Create the Transfer POST Route
app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10)
    const accountsJSON = JSON.stringify(accounts, null, 4)
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8')
    res.render('transfer', {message: 'Transfer Completed'})    
})

// Create the payment Route
app.get('/payment', (req, res) => {
    res.render('payment', {account: accounts.credit})
})

// Create the payment POST Route
app.post('/payment', (req, res) => {
   accounts.credit.balance = accounts.credit.balance - req.body.amount
   accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount)
   const accountsJSON = JSON.stringify(accounts, null, 4)
   fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8')
   res.render('payment', {message: 'Payment Successful', account: accounts.credit})
})


// Create a Server
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!')
})