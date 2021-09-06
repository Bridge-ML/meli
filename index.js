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

app.get('/posts', async (req, res) => {
    try {
      const meliObject = new MeliObject(res.locals.access_token);    
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