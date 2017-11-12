const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs')
  .use(express.static('public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.ip} ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
    console.log(log);
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get('/', (req, res) => {
  res.render('jamesskipp.hbs', {
    content: fs.readFileSync('html/about.hbs')
  });
});

app.get('/about', (req, res) => {
  res.render('jamesskipp.hbs', {
    content: fs.readFileSync('html/about.hbs')
  });
});

app.get('/skills', (req, res) => {
  res.render('jamesskipp.hbs', {
    content: fs.readFileSync('html/skills.hbs')
  });
});

app.get('/history', (req, res) => {
  res.render('jamesskipp.hbs', {
    content: fs.readFileSync('html/history.hbs')
  });
});

app.get('/resume', (req, res) => {
  res.render('jamesskipp.hbs', {
    content: fs.readFileSync('html/resume.hbs')
  });
});

app.get('/blog', (req, res) => {
  res.render('jamesskipp.hbs', {
    content: '<div><p>Blog Coming Soon!</p></div>'
  });
});

app.get('/projects', (req, res) => {
  res.render('jamesskipp.hbs', {
    content: fs.readFileSync('html/projects.hbs')
  });
});

app.listen(port, () => {
  var now = new Date().toString();
  var log = `${now}: Started server on port ${port}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
    console.log(log);
  });
});
