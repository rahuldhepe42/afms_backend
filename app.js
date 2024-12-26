
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());






const { UserInfo, Contact } = require('./userSchema');



// database connection 

const mongoURl = process.env.AFMS_URL;

mongoose.connect(mongoURl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to database")
}).catch(e => console.log(e));   




// apply endpoint
app.post("/register", async (req, res) => {
    const { name, email, mobileNumber, city, state, applyfor, workexperience,  } = req.body;


    try {
        const user = await UserInfo.findOne({ email });

        if (user) {
            return res.send({ error: "User exists" });
        }

        await UserInfo.create({
            name,
            email,
            mobileNumber,
            city,
            state,
            applyfor,
            workexperience,
            registrationDate: new Date(),
        });

        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});



// contact endpoint
app.post("/contact", async (req, res) => {
    const { companyname, servicename, email, phoneNumber, message} = req.body;


    try {
        const user = await Contact.findOne({ email });

        if (user) {
            return res.send({ error: "User exists" });
        }

        await Contact.create({
            companyname,
            servicename,
            email,
            phoneNumber,
            message,
            registrationDate: new Date(),
        });

        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});



// Get all users
app.get("/users", async (req, res) => {
    try {
        const users = await UserInfo.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
});

// Get all contacts
app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).send(contacts);
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
});


// Delete user
app.delete("/users/:id", async (req, res) => {
    try {
        await UserInfo.findByIdAndDelete(req.params.id);
        res.status(200).send({ status: "User deleted" });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
});

// Delete contact
app.delete("/contacts/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).send({ status: "Contact deleted" });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
});


const port = process.env.PORT || 5001;


// Start server
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});