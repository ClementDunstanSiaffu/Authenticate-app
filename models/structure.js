
const mongoose = require('mongoose');
const validator = require('validator')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({

name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate:value =>{
            if(!validator.isEmail(value)){
                throw new Error({error:'invalid email address'})
                }
                
            }
        },
    
    password:{
        type:String,
        required:true,
        minlength:8
    },

    topic:{
        type:String,
        required:true,
    },

    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
})

userSchema.pre('save',async function(next){
    const user = this;
    
    if(user.isModified('password')){
         user.password = await bcrypt.hash(user.password,8)
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    const user = this;

    const token = await jwt.sign({_id:user._id}, "randomString",{
        expiresIn: 10000
    });
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async function(email,password){

    const user = await User.findOne({email});

    if(!user){
        throw new Error({error:'invalid credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        throw new Error({error:'wrong password'})
    }
    
    return user;
}

mongoose.model('USER',userSchema);

const User = mongoose.model('User', userSchema)

module.exports = User