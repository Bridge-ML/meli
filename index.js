const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('working!!')
    console.log('entro por raiz');
})

app.get('/notifications', function (req, res) {
    res.send('Notifications endpoint')
    console.log('entro por notifications');
})
app.listen(process.env.PORT || 3000, function () {
    console.log('server listennign on por 3000');
} )