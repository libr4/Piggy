import express from 'express';
import morgan from 'morgan';

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connectDB.js';

//rotas
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRouter.js'


//middlewares
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

//morgan logs


const app = express();

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

app.use(express.json())

app.get('/api/v1', (req, res) => {
    res.json({msg:'hiiiii'})
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`listening on ${port}...`))
    } catch (error) {
        console.log(error)
    }
}


startServer();