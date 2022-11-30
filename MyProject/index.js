const mongoose = require('mongoose')

const express = require('express')

const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/students_Details')

const db = mongoose.connection

app.get('/', (req, res) => {
    res.render('form')
})

app.post('/register', (req, res) => {
    var email = req.body.email
    var name = req.body.name
    var password = req.body.password
    var course = req.body.course
    var age = req.body.age

    const students_info = {
        'email': email,
        'name': name,
        'password': password,
        'course': course,
        'age': age,
    };
    db.collection('students_data').insertOne(students_info, (err, collection) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Students Data Inserted !  (Check Your DataBase)")
        }
        return res.render('successfull')
    })
})

app.listen(3000, () => console.log(`listening to port 3000 http://localhost:3000`))

