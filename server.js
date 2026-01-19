const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const blogRoutes = require("./routes/blogs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogdb")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/blogs", blogRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
