import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import notesRoutes from "./routes/notesRoutes.js"
import ratelimiter from "./middleware/rateLimiter.js"
import { connectDB } from "./config/db.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

// default cors policy
if(process.env.NODE_ENV !== "production") {
  app.use(cors({origin: "http://localhost:5173"}))
}
// middleware allows parsing of json bodies: req.body
app.use(express.json())
// middleware to ratelimit requests to server using upstash ratelimit & redis
app.use(ratelimiter)
// middleware logs method and url
app.use((req, res, next) => {
  console.log(`req method: ${req.method}, req URL: ${req.url}`)
  next()
})

app.use("/api/notes", notesRoutes)

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server started on PORT:", PORT)
  })
})
