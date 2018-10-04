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

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`server is listining on port ${PORT}...`));
