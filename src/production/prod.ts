import helmet from 'helmet';
import compression from 'compression';
import {Router} from 'express';

export default function(app:Router){
    app.use(helmet());
    app.use(compression());
}