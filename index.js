import express from "express";
import methodOverride from "method-override";

const app = express();
const PORT = 3000;
const data = {
    blogPosts: [],
};

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

function getCurrentYear(req, res, next) {
    data.year = new Date().getFullYear();
    next();
}

app.use(getCurrentYear);

app.get('/', (req, res) => {
    res.render('index.ejs', {
        pageTitle: 'Blog',
        currentYear: data.year,
        blogPosts: data.blogPosts
    });
});

app.get('/new', (req, res) => {
    res.render('new.ejs', {
        pageTitle: 'New Post',
        currentYear: data.year
    });
});

app.post('/new', (req, res) => {
    req.body.date = getDate();
    req.body.ID = Date.now();
    data.blogPosts.push(req.body);
    res.redirect('/');
});

app.get('/post/:postID', (req, res) => {
    let currentPost;
    data.blogPosts.forEach((post) => {
        if (post.ID === parseInt(req.params.postID)) {
            currentPost = post;
        }
    });

    res.render('post.ejs', {
        pageTitle: currentPost.title,
        currentYear: data.year,
        postID: req.params.id,
        post: currentPost
    });
});

app.get('/edit/:postID', (req, res) => {
    let currentPost;
    data.blogPosts.forEach((post) => {
        if (post.ID === parseInt(req.params.postID)) {
            currentPost = post;
        }
    });

    res.render('edit.ejs', {
        pageTitle: `Edit ${currentPost.title}`,
        currentYear: data.year,
        postID: req.params.id,
        post: currentPost
    });
});

app.post('/edit/:postID', (req, res) => {
    data.blogPosts.forEach((post) => {
        if (post.ID === parseInt(req.params.postID)) {
            post.title = req.body.title;
            post.author = req.body.author;
            post.imageURL = req.body.imageURL;
            post.body = req.body.body;
        }
    });

    res.redirect(`/post/${req.params.postID}`);
});

app.delete('/post/delete/:postID', (req, res) => {
    data.blogPosts.forEach((post, index) => {
        if (post.ID === parseInt(req.params.postID)) {
            data.blogPosts.splice(index, 1);
        }
    });

    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});

function getDate() {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',,
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const month = months[new Date().getMonth()];
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const date = `${month} ${day}, ${year}`;
    return date;
}