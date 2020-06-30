const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');

const postnote = require('./postnote/postnote.js');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs')
  .use(express.static(path.join(`${__dirname}/public`)));

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.ip} ${req.method} ${req.url}`;

  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
    console.log(log);
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('ifEdited', (birthTime, editTime) => {
  if (birthTime !== editTime) {
    return `<p>Edited: ${editTime} EST`;
  }
  return '';
});

app.get('/contact', (req, res) => {
  res.render('contact.hbs');
});

app.get('*', (req, res) => {
  res.render('cover.hbs')
})

app.get('/', (req, res) => {
  res.render('about.hbs');
});

app.get('/about', (req, res) => {
  res.render('about.hbs');
});

app.get('/skills', (req, res) => {
  res.render('skills.hbs');
});

app.get('/history', (req, res) => {
  res.render('history.hbs');
});

app.get('/resume', (req, res) => {
  res.render('resume.hbs');
});

app.get('/blog', (req, res) => {
  postnote.getNotes(`${__dirname}/notes/`, (blogs) => {
    res.render('blog.hbs', {
      blogs,
    });
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs');
});

app.get('/404', (req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.url =
  next(err);
});

app.get('*', (req, res, next) => {
  const err = new Error();
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status !== 404) {
    return next();
  }

  return res.render('404.hbs', {
    message: '404: Sorry, this page doesn\'t exist!',
  });
});

app.listen(port, () => {
  const now = new Date().toString();
  const log = `${now}: Started server on port ${port}`;

  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
    console.log(log);
  });
});
