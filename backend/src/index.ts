import "dotenv/config";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import authRouter from "./routes/auth";
import gameRouter from "./routes/game";
import healthRouter from "./routes/health";
import packsRouter from "./routes/packs";
import userRouter from "./routes/user";

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
app.use("/api/auth", authRouter);
app.use("/api/packs", packsRouter);
app.use("/api/game", gameRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Backend listening on ${port}`);
});
