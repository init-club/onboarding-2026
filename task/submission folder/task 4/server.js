const express = require("express");
const path = require("path"); 
const app = express(); 
const PORT = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname)));
const submissions = [];

// Submission thing
app.post("/api/submit", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: "Name and email are required." });
  }
  const entry = {
    id: submissions.length + 1,
    name,
    email,
    message: message || "",
  };
  submissions.push(entry);
  console.log(`Submitted form successfully:`, entry);
  return res.status(201).json({ success: true, data: entry });
});

// Retrieving submissions

app.get("/api/submissions", (_req, res) => {
  return res.json({ success: true, count: submissions.length, data: submissions });
});

app.listen(PORT, () => {
  console.log(`\n Server running at  http://localhost:${PORT}`);
});
