import dotenv from 'dotenv';
dotenv.config();
   
export const appConfig={
    DB:{
        connectionString:process.env.MONGODB_URL
    }
}


