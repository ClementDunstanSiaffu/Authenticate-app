const mongoose = require('mongoose');

const User = mongoose.model('USER');
const User1 = require('../models/structure')

var user3 = [];

console.log(user3)

/*exports.home = function(req,res) {

    res.render('home')
    
}; */

/*exports.about = function(req,res) {

    res.render('about')

};

exports.services = function(req,res){

    res.render('services')
        
    
};

exports.contacts = function(req,res){

       res.render('contacts')
} */

exports.order =  function(req,res){
    res.render('order')
}

exports.register = function(req,res){
   res.render('login',{name:""})
}

exports.users = async function(req,res){

    insertRecords(req,res);
   
}

async function insertRecords(req,res){
    const user = new User(req.body);
    

    await user.save()
    const token = user.generateAuthToken()
    res.redirect('http://localhost:3000/login')
}
exports.user =  async function (req,res,){

    try{
        const {email,password} = req.body;
        const user =  await User1.findByCredentials(email,password);
        console.log(user)
        /* */
       // var uname = uniname
      
         //login(user)
         var user4 = await takeUser(user.tokens[0].id)
       // var user4 = await takeUser({"name":user.name,"room":user.topic,"id":user.tokens[0].id}); 
        console.log(user4) 
        
        if(user){
           //res.json(user)
           res.redirect(`http://localhost:3000/chat?name=${user.name}&room=${user.topic}&id=${user.tokens[0].id}`)
        }else{
            res.status(401).send("failed to login")
        }
        
       /*  */
    
            
        
    } catch(error){
       res.status(400).render('login',{name:"Either password or email is incorrect"})
}
   
       
}

function takeUser (id){
    
  user3.push(id);
  return user3;
 }

/*function takeUser (name){
   if(user3.length > 0){
       user3 = []
       
   }else {
       console.log("it's empty")
   }
 user3.push(name);
 return user3;
}*/



exports.chat = (req,res) =>{
    /*var uname = "uniname"
        req.session[uname] = user3
        console.log(req.session) */
    console.log(user3)
    res.json(user3)
    
}

exports.logout = (req,res)=>{
    const {id} = req.body
    user3.pop(id)
    const index = user3.indexOf(id)
    if(index===-1){
        console.log(id)
        res.redirect('http://localhost:3000/login')
    }else{
        console.log("there is an error")
    }
    
}

exports.replace = (req,res)=>{

   const {name1,room1} = req.body
   // console.log(name1)
   // console.log(room1)
   console.log({name1,room1})
    user3[0].name = name1
    user3[0].room = room1
    res.redirect('http://localhost:3000/chat')
}

exports.new = (req,res)=>{
    res.json(user3)
}


/*exports.order1 = function(req,res){
    res.render('orders');
}



exports.read = function(req,res){
  
   Order.find((err,docs) =>{
        if(!err){
            res.render('park',{
              list:docs  
            });
        
    }
    else{
        console.log('There is an error' +err)
    }
})

}






exports.okay = function(req,res){

    //console.log(req.body)
    insertRecords(req,res);
}


function insertRecords(req,res){

    var order = new Order();

    order.name = req.body.name;
    order.phone = req.body.phone;
    order.location = req.body.location;
    order.message = req.body.message;

    order.save((err,doc)  =>{

        if(!err){
           res.redirect('/ordering')
        }
        else{
            console.log('There is an error')
        }
    });
}

*/



