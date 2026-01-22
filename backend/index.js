import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js';

dotenv.config();

await connectDB();
    

const port = process.env.PORT || 4000;

app.listen(port, ()=>{

    console.log("Server running at port 4000");

})