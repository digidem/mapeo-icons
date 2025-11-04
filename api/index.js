import "dotenv/config";
import express from "express";
import cors from "cors";
import search from "./lib/iconSearch.js";
import generate from "./lib/generateMapeoIcon.js";

const { CORS } = process.env;
const app = express();
const corsOptions = {
  origin: CORS
    ? typeof CORS === "string"
      ? CORS.includes(",")
        ? CORS.split(",")
        : CORS
      : "*"
    : false,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/search", async function (req, res, next) {
  const { s = "tree", l = "pt", p = "1" } = req.query;
  try {
    const data = await search(s, l, parseInt(p));
    res.json(data);
  } catch (err) {
    console.error(err);
    next(new Error(err.data));
  }
});

app.get("/generate", async function (req, res) {
  const { image, color } = req.query;
  const data = await generate(image, `#${color}`);
  res.json([
    {
      svg: data,
    },
  ]);
});

export default {
  path: "/api",
  handler: app,
};
