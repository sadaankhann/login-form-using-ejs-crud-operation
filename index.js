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
        image: req.body.image,
        confirm_password: req.body.confirm_password
    });

    res.json({
        success: true,
        message: "User created successfully"
    });
});


app.get('/users', async function (req, res) {
    let allUsers = await Model.find();
    res.render('users_page', { allUsers: allUsers });
})

app.get('/deleting', async function (req, res) {
    try {
        await Model.deleteMany({});
        res.json({
            success: true,
            message: "All Users Deleted!"
        })
    } catch (err) {
        res.json({
            success: false,
            message: "Users not deleted"
        })
    }
})

app.get('/delete/:id', async function (req, res) {
    try {
        await Model.findOneAndDelete(req.params.id);
        res.redirect('/users');
    } catch (err) {
        res.send(err);
    }
})

app.get('/edit/:id', async function (req, res) {
    try {
        let profile = await Model.findById(req.params.id);
        res.render('edit', { profile: profile })
    } catch (err) {
        console.log(err);
    }
})


app.post('/edit/:id', async function(req,res){

    await Model.findByIdAndUpdate( req.params.id ,{
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
        confirm_password: req.body.confirm_password
    });

    res.redirect('/users');

})


app.listen(3000, () => {
    console.log("Server is started!");
});