const express = require("express");
const path = require("path"); 
const app = express(); 

const redis = require("redis");
const redisClient = redis.createClient({ url: "redis://redis:6379" });
redisClient.connect().catch(console.error);

const PORT = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname)));
const submissions = [];

app.get("/api/visits", async (req, res) => {
  const visits = await redisClient.incr("visit_count");
  return res.json({ success: true, visits });
});

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
