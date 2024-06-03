import express, {Application} from "express";
import  cors  from 'cors';
import routerHeroes from "../routes/Heroe";
import routerUser from "../routes/user";
import { Heroe } from "./heroes";
import { User } from "./User";

class Server {
    private app: Application;
    private port: any;

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnection();
        
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Aplicacion corriendo en el puerto: ' + this.port)
        })
    }

    routes(){
        this.app.use('/api/heroes', routerHeroes);
        this.app.use('/api/users', routerUser);

    }

    midlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnection(){
        try{
            await Heroe.sync();
            await User.sync();
        }catch(e){
            console.log('Unable to connect to the database: ', e)
        }
    }
}
export default Server;