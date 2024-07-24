
import express from 'express';
import cors from 'cors';

import UserRoute from './src/users/infrestructure/routes/UserRouter';
import AuthRoute from './src/auth/infrestructure/routes/authRouter';
import ImageRouter from './src/imagenes/infrestructure/routes/imagesRouter';


const app = express();

const PORT = '3000';

let corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/login', AuthRoute);
app.use('/users', UserRoute);
app.use('/images', ImageRouter);



app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto', PORT)
})