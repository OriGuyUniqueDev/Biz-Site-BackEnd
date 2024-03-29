const express = require("express");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const addBizCard = require("./routes/addBizCard");
const getBizCard = require("./routes/getBizCard");
const pageNotFound = require("./routes/pageNotFound");
const updateBizCard = require("./routes/updateBizCard");
const updateUser = require("./routes/updateUser");
const deleteBizCard = require("./routes/deleteBizCard");
const getUserBizCard = require("./routes/getUserBizCard");
const getAllCards = require("./routes/getAllCards");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); // to handle JSON
app.use(express.urlencoded({ extended: true })); // to handle form
app.use(express.static("public")); // to handle static files like CSS or Img
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/addBizCard", addBizCard);
app.use("/api/getBizCard", getBizCard);
app.use("/api/updateBizCard", updateBizCard);
app.use("/api/updateUser", updateUser);
app.use("/api/deleteBizCard", deleteBizCard);
app.use("/api/getUserBizCard", getUserBizCard);
app.use("/api/getAllCards", getAllCards);
app.use("*", pageNotFound);

mongoose
	.connect(`mongodb+srv://origuydev:${process.env.SERVER_PASSWORD}@fullstackreactbcard.ojrla6s.mongodb.net/businessCardsProject?retryWrites=true&w=majority`)
	.then((res) => console.log(res.connections[0].name))
	.catch((err) => console.log(`couldn't Connect to MongoDB : ${err}`));

app.listen(PORT, () => console.log(`Runing on PORT: ${PORT}`));
