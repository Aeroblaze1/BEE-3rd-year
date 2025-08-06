const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname+"/public"));

app.use(express.json());
//to know the blog contetn type we navigated to the network tab under headers and content type


// Simple GET endpoint
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// POST endpoint to receive new blog data
app.post('/blog', (req, res) => {
  console.log(req.body)
  let title = req.body.title;
  let description = req.body.description;
  console.log(title,description);

  res.json({ success: true, message:"blog added"});
});

// Optional: GET endpoint to fetch all blogs 
app.get('/blogs', (req, res) => {
  res.json(blogs);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
