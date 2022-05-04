require('dotenv').config()
const express = require("express");
const async = require("hbs/lib/async");
const app = express();
const router = new express.Router();
const userModel = require("../../db/models/model")
const bcrypt = require("bcryptjs");
const auth = require("../../db/middleware/auth");


// all requests

// get requests
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/notes", auth, (req, res) => {
    res.render("notes");
});
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/signup", (req, res) => {
    res.render("signup");
});
router.get("/myprofile", auth, (req, res) => {
    res.render("myprofile");
});
router.get("/logout", auth, async (req, res) => {
    try {
        res.clearCookie("notesapp");
        req.user.tokens = req.user.tokens.filter((elem) => {
            return elem.token !== req.token;
        })

        await req.user.save();
        res.status(200).redirect("login");
    } catch (err) {
        console.log(err);
        res.status(401).send(err.message);
    }
});

router.get("/api/user", auth, async (req, res) => {
    let user = req.user;
    res.json(user);
})
router.get("/notes/edit/:id", auth, async (req, res) => {
    try {
        let _id = req.params.id;
        let user = req.user;
        let note;

        user.notes.forEach(element => {
            if (_id == element._id) {
                note = element;
            }
        });
        res.render("edit", {
            title: note.title,
            text: note.note
        });
    } catch (err) {
        console.log(err);
        res.status(401).send(err.message);
    }
});

// post requests
router.post("/signup", async (req, res) => {
    try {
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;

        const userDetails = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            password,
            confirmPassword
        });

        if (password === confirmPassword) {
            const user = await userDetails.save();
            res.status(201).redirect("login");
        } else {
            res.send('password is not matching');
        }
    } catch (err) {
        console.log(err.message);
        res.status(401).send(err.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await userModel.findOne({ email });
        let isMatch = await bcrypt.compare(password, user.password);
        const token = await user.generateAuthToken();


        res.cookie("notesapp", token, {
            httpOnly: true,
            secure: true
        });
        if (isMatch) {
            // res.status(201).render("notes", {
            //     username: user.firstName
            // });
            res.status(200).redirect("notes");
        } else {
            res.send("Invalid credentials");
        }
    } catch (err) {
        console.log(err.message);
        res.status(401).send("some error occured ", err.message);
    }
});

router.post("/notes", auth, async (req, res) => {
    let title = req.body.title;
    let note = req.body.note;
    let body = {
        title,
        note
    };
    let user = req.user;
    await user.notes.push(body);
    await user.save();
    res.status(201).render("notes");
});

// patch request for editing note
router.patch("/notes/edit/:id", auth, async (req, res) => {
    try {
        let _id = req.params.id;
        let user = req.user;
        let updatedTitle = req.body.title;
        let updatedNote = req.body.note;
        user.notes.forEach(element => {
            if (_id == element._id) {
                element.title = updatedTitle;
                element.note = updatedNote;
            }
        });

        await user.save();
        res.status(200).send("notes saved successfully");
    } catch (err) {
        console.log(err);
        res.status(401).send(err.message);
    }
});

// delete request for deleting note
router.delete("/notes/delete/:id", auth, async (req, res) => {
    let _id = req.body._id;
    _id = req.params.id;
    let user = req.user;
    let toRemove;
    user.notes = user.notes.filter((element)=>{
        if(element._id == _id){
            toRemove = element;
        }
        return element !== toRemove;
    });
    await user.save(); 
    res.status(200).send("deleted successfully");
});

// exporting module router
module.exports = router;