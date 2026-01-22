import express from 'express'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);



app.get('/', (req, res)=>{
    res.send("Backend API is running");
});

export default app;