import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// CORS configuration to allow all origins
app.use(cors({
    origin: '*',  // Allow all origins
    credentials: true,
}));

app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(express.static("public"));

app.use(cookieParser());

// Routes import
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);

export { app };
