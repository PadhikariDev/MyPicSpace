
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectMD from "./connect.js";
import router from "./routes/userRoutes.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
    res.render("login");
});

app.use("/api", router);


connectMD("mongodb://127.0.0.1:27017/myPicSpace").then(() => {
    console.log("Connection to Database has been established.")
}).catch(err => {
    console.error("Error connecting to the DataBase.");
})

app.listen(PORT, () => {
    console.log("Server started.");
});

