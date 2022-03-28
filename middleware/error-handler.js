
import {StatusCodes} from 'http-status-codes'

//AS LINHAS ABAIXO NAO FAZEM MAIS SENTIDO POIS O CÓDIGO FOI MODIFICADO
//colocando next(err) nos catches dos controladores, 
//o erro é mandado para essa função
//que mostrar de volta o erro.
//Esta ainda não é uma forma confortável, ou conveniente,
//pois o erro mandado de volta, em geral, é uma mensagem gigante
//mas a ideia aqui é: todo erro vem pra cá, devido aos next(error) nos catches
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    const defaultError = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message
    }

    if (err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = Object.values(err.errors)
                            .map(item => item.message)
                            .join('\n');
    }

    if (err.code && err.code === 11000) {
        defaultError.msg = `Esse ${Object.keys(err.keyValue)} já foi usado.`;
    }
    // return res.status(defaultError.statusCode).json(err)

    return res.status(defaultError.statusCode).json({msg:defaultError.msg})
} 

export default errorHandlerMiddleware