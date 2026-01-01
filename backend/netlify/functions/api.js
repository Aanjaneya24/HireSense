import express from "express";
import serverless from "serverless-http";
import { app } from "../../src/app.js";
import { connectDB } from "../../src/db/db.js";

// Connect to database
connectDB();

// Export the serverless function
const handler = serverless(app);

export { handler };
