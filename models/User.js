import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const User = new mongoose.Schema({
    name:{
        type:String,
        maxlength:20,
        required: [true, "Do you have a name?"]
    },
    
    location:{
        type:String,
        default:'mycity'
    },
    
    username:{
        type:String,
        maxlength:50,
        required:[true, 'please, provide username'],
        unique:true
    },

    email:{
        type:String,
        validate: {
            validator: (v) => /[Aa-zZ\d]+@[Aa-zZ\d]+\.[a-z]+/.test(v),
            message:'Esse email não é válido'
        },
        unique:true
    },

    password:{
        type:String,
        maxlength:14,
        minlength:6,
        required:[true, 'Faltou a senha!'],
        select:false
    }
})

//assim se cria métodos numa instancia de um mongoose.model
User.methods.createJWT = function() {
    const token = jwt.sign({user_id:this._id}, process.env.JWT_SECRET, {
        expiresIn:'10d'
    });
    return token;
}

User.methods.comparePassword = async function(givenPassword) {
    const matches = await bcrypt.compare(givenPassword, this.password);
    return matches;
}

//esse método .pre define uma função a ser executada
//antes da ação especificada.
//No caso, abaixo, executa a callback antes de salvar 
//o usuário na db
User.pre('save', async function() {
    console.log('regular', this.password);
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(this.password, salt);
    this.password = encryptedPassword;
    console.log('encrypted: ', this.password);
})

export default mongoose.model('userpiggy', User);