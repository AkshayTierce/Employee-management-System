import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
import express from 'express';
import connectDB from "./config/db.ts"
import cors from "cors"
import empRouter from './routes/employeeRoutes.ts';
const app = express();
const port = process.env.PORT || 3001;
    
connectDB()
app.use(cors());
app.use(express.json());


app.use("/api", empRouter); // Use .default for ES module import


app.get("/", (req, res) => {
   res.send("Server is running")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});