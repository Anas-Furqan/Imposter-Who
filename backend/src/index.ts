import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import healthRouter from "./routes/health";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

app.use(helmet());
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use("/api", healthRouter);

app.listen(port, () => {
  console.log(`Backend listening on ${port}`);
});
