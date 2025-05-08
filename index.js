
import express from "express";
import path from "path";



const PORT = 3000;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded());





app.listen(PORT, () => {
    console.log("Server started.");
});

