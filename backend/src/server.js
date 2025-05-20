import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import ratelimiter from "./middleware/rateLimiter.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

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

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server started on PORT:", PORT)
  })
})
