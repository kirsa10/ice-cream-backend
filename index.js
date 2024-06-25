const express = require("express");//express
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();//assing express function to a variable app

mongoose.connect("mongodb+srv://kirsaa101203:10-Dec-2003@cluster0.qiml6mu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")// connect mongoose and express
    .then(() => {
        console.log("db connected");
    })
    .catch((err) => {
        console.error(err);
    });

const DBSchema = new mongoose.Schema({ //Schema is used to create schema
    userName: { type: String, required: true }, //key:type String or integer ,required is optional 
    email: { type: String, unique: true },
    DOB: { type: String },
    password: { type: String }
});

const DBCollection = mongoose.model("ice creme", DBSchema); // model function is used to create tow string collection name schema referance 

app.use(express.json());//data flow
app.use(cors());//cors  connect backend and frontend

app.post("/signup", async (req, res) => { //routing paramater and write function  
    try {
        const user = new DBCollection(req.body);//front end string pass to backend
        const result = await user.save();//data
        const dataSending = result.toObject();
        res.send(dataSending);
    } catch (e) {
        console.error(e);
        res.status(500).send('Something went wrong');
    }
});

app.get('/getting', async (req, res) => {
    try {
        const users = await DBCollection.find({}, 'todo');
        res.json(users);
    } catch (e) {
        console.error(e);
        res.status(500).send('Failed to retrieve user data');
    }
});

app.put('/updating/:id', async (req, res) => {
    const { id } = req.params;
    const { todo } = req.body;

    try {
        const updatedTodo = await DBCollection.findByIdAndUpdate(
            id,
            { todo },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error('Failed to update :', error);
        res.status(500).send('Failed to update todo');
    }
});

app.delete('/deleting/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await DBCollection.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send('not found');
        }

        res.send(' deleted successfully');
    } catch (e) {
        console.error(e);
        res.status(500).send('Failed to delete ');
    }
});

app.listen(5000, () => {//app listen(express function) set port number 
    console.log("server hosted on 5000");//piplenie operator default port should be run process.environment .port
});
