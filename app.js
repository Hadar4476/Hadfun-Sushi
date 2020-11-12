const auth = require('./routes/auth');
const users = require('./routes/users');
const dish_types = require('./routes/dish_types');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

mongoose
  .connect(
    process.env.MONGODB_URI ||
      'mongodb+srv://hadrame:hadar123456@cluster0.ctitj.mongodb.net/hadfun_and_sushi',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log(
      'Connected to mongodb database: hadfun_and_sushi, successfully.'
    );
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());
app.use('/api/users', users);
app.use('/api/dish-types', dish_types);
app.use('/api/auth', auth);
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3008;

http.listen(PORT, () => {
  console.log(`NodeJS server started at port ${PORT}.`);
});
