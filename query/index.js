const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;


    //create new post id db
    if (type === "PostCreated") {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] }
     
    }

    //find specific post and add comment to it
    if (type === "CommentCreated") {
        const { id, content, postId } = data;

        const post = posts[postId];
        post.comments.push({ id, content });
    }

    console.log(posts);
    res.status(201).send({});

});

app.listen(4002, () => {
    console.log('Server is running on port 4002');
})
