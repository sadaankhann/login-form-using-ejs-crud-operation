const express = require('express');
const app = express();
const path = require('path');
const Model = require('./addUser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/add', async function (req, res) {

    let check = await Model.findOne({ username: req.body.username });

    if (check) {
        return res.json({
            success: false,
            message: "User already exists"
        });
    }

    await Model.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    });

    res.json({
        success: true,
        message: "User created successfully"
    });
});


app.get('/read', async function (req, res) {
    let viewData = await Model.find();
    res.send(viewData);
})

app.listen(3000, () => {
    console.log("Server is started!");
});