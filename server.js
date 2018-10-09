const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');

const app = express();

mongoose
  .connect(
    'mongodb://localhost/contact-list',
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('successfully connected to database...'))
  .catch(ex => console.log('DB CONNECT ERROR: ', ex.message));

app.use((req, res, next) => {
  const origin = req.get('origin');

  // TODO Add origin validation
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, x-auth-token'
  );

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`server is listining on port ${PORT}...`));
