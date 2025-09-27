import express from "express";
import { Server } from "socket.io";
import "./config/config";
import errorHandler from "./middlewares/error.middleware";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import cors from "cors";
import VAR from "./config/constants";
import userRouter from "./routes/user.route";
import { Api } from "./config/settings/api";
import messageRouter from "./routes/message.route";

const { version, routes } = Api.api;

const app = express();
const io = new Server();

app.use(
  cors({
    origin: VAR.ORIGIN ?? "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

io.on("connection", () => {
  io.emit("hi how are you doing!");
});

app.get("/api/", (req, res) => {
  res.send("hi how are you doing?");
});

app.use(`/api/${version}/${routes.authentication.baseurl}`, authRouter);
app.use(`/api/${version}/${routes.user.baseurl}`, userRouter);
app.use(`/api/${version}/${routes.message.baseurl}`, messageRouter);

app.get("/", (req, res) => {
  return res.json([
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
    {
      name: "product",
      price: 12,
      description:
        "this is a product that is very good product you must buy this product",
      seller: "adeelahmed",
    },
  ]);
});

app.use(errorHandler);

export default app;
