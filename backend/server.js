import express from "express"

const app = express()
app.get("/api/notes", (request, response) => {
  response.send("You've got 5 notes")
})

app.listen(5001, () => {
  console.log("Server started on PORT: 5001")
})