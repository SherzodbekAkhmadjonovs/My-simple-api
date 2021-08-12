const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 2000;

const books = [
  { id: 1, name: "Eloquent JavaScript" },
  { id: 2, name: "Rework" },
];
console.log(app.get("env"));
app.get("/api/books", (req, res) => {
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send("Not found");
  }
  res.status(200).send(book);
});

app.post("/api/books", (req, res) => {
  if (!req.body.name) {
    res.status(400).send("name is reuqired");
    return;
  }
  if (req.body.name.length < 3) {
    res.status(400).send("name should be at least 4 characters");
    return;
  }
  const book = {
    id: books.length + 1,
    name: req.body.name,
  };
  books.push(book);
  res.status(201).send("created");
});

app.put("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Not found");
  book.name = req.body.name;
  res.send(book);
});
app.delete("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Not found");
  const bookIndex = books.indexOf(book);
  books.splice(bookIndex, 1);
  res.send(book);
});
app.listen(port, () => {
  console.log(`${port} aktiv`);
});
