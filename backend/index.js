import dotenv from "dotenv";
dotenv.config(); 

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

await connectDB();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
