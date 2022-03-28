//eu ainda não entendo essas funções e o que elas farão exatamente
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js"
import { Error400, Error401 } from "../errors/index.js";

export const register = async (req, res, next) => {
    const {username, password, name, email} = req.body;

    if (!username || !password || !name || !email) {
        return next(new Error400('Por favor, preencha todos os campos'));
    }

    const usernameAlreadyExists = await User.findOne({username});
    if (usernameAlreadyExists) {
        return next(new Error400('Esse nome de usuário já existe'));
    }

    try {
        const user = await User.create({username, password, name, email});
        const token = user.createJWT();
        

        //no código abaixo, a senha está sendo removida da resposta
        //'à mão'. Nesse caso, a propriedade "select" no schema User
        //não funciona. A propriedade serve para selecionar um item do schema
        //para certos própositos, como removê-lo da resposta.
        res.status(StatusCodes.CREATED).json({user: {
            username:user.username,
            name:user.name,
            email: user.email,
            location:user.location,
            token
        }});

    } catch (error) {

        //aqui em next(error), os erros sao mandados para
        //errorHandlerMiddleWare, pois ela é a última middleware
        //a ser executada.
        next(error)
        // res.status(500).json({msg:'houve um erro'})
    }
}

export const login = async (req, res, next) => {
    const {username, password} = req.body;
    
    if (!username || !password) {
       return next(new Error400(`Please provide ${username ? 'password'
        : password ? 'username' 
        : 'email and password'}`));
    }

        let user = await User.findOne({username}).select('+password');
        console.log(typeof user)
        const passwordIsCorrect = await user.comparePassword(password);
        if (!passwordIsCorrect) return next(new Error401('Informações incorretas'));
        
        const token = user.createJWT();
        user = user.toObject({versionKey:false});
        user.password = undefined;
        

        
        res.status(StatusCodes.OK).json({...user, token})
 
}

export const updateUser = async (req, res) => res.send('update user')