const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('working!!')
    console.log('entro por raiz');
})

app.post('/notifications', function (req, res) {
  const {body} = req
  res.status(200).json({'message':'OK','data':body})
})

app.get('/posts', async (req, res) => {
    try {
      const meliObject = new MeliObject("APP_USR-7000097314032908-090812-35f332ae81a93f675826a2f3b77de960-819557918");    
      const user = await meliObject.get('/users/me');
      const items = (await meliObject.get(`/users/${user.id}/items/search`)).results || [];
      if (items.length) {
        const result = [];
        const promises = items.map(item_id => meliObject.get(`/items/${item_id}`));
        for await (item of promises) {
          result.push(item);
        }
        res.render('posts', { items: result });
      } else {
        res.status(404).send('no items were found :(');
      }
    } catch(err) {
      console.log('Something went wrong', err);
      res.status(500).send(`Error! ${err}`);
    }
  });




app.listen(process.env.PORT || 3000, function () {
    console.log('server listennign on por 3000');
} )