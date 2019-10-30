const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const User = require('./models').User;



const app = express();
app.use(cors())                                            
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))


const PORT = 4000


app.get('/',(req,res)=>{
    res.send('Welcome')

});

//all
app.get('/api/v1/users',(req,res)=>{
    User.findAll({})
    .then(user => res.json({
        data:user
    }))
    .catch(error => res.json({
        error:error
    }))
});


//create
app.post('/api/v1/users/',(req,res)=>{
    User.create({
        name : req.body.name,
        email : req.body.email,
        telephone : req.body.telephone
    }).then(user => res.status(201).json(user))
    .catch(error => res.send(error))
});

//update
app.put('/api/v1/users/:id',(req,res)=>{
    var id = req.params.id
    var data = req.body;
    User.findOne({
        where: {id : id}
    }).then(user =>{
        user.update(data)
        .then(user => res.json(user))
    })
    .catch(error => res.send(error))
});


//delete
app.delete('/api/v1/users/:id',(req,res)=>{
    var id = req.params.id
    User.destroy({
        where:{id : id}
    }).then(()=>{
        res.send({message:{status:'successful delete'}})
    })
    .catch(error => res.send(error))

});

//show
app.get('/api/v1/users/:id',(req,res)=>{
    var id = req.params.id
    User.findOne({
        where: {id : id}
    }).then(user => res.json(user))
    .catch(error => res.send(error))
});





app.listen(PORT,()=>{
    console.log('Run server: ' + PORT)
})



