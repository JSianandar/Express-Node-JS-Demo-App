const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');
// serving static files/assets in the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
// joining the index.js path with /views
app.set('views', path.join(__dirname, '/views'));
// use render to call the ejs in the views dir
app.get('/', (req, res) => {
	res.render('home.ejs');
});
app.get('/cats', (req, res) => {
	const cats = [ 'Blue', 'Rockett', 'Monty', 'Winston' ];
	res.render('cats', { cats });
});
// Taking data from json file
app.get('/r/:subreddit', (req, res) => {
	const { subreddit } = req.params;
	const data = redditData[subreddit];
	if (data) {
		res.render('subreddit', { ...data });
	} else {
		res.render('notfound', { subreddit });
	}
});
// creating a variable to be passed to the ejs
app.get('/rand', (req, res) => {
	const num = Math.floor(Math.random() * 10) + 1;
	res.render('random', { rand: num });
});

app.listen(8080, () => {
	console.log('Listening on port 8080');
});
