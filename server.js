const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, "user.json");

async function readDB() {
    return await fs.readJson(DB_PATH);
}

async function writeDB(data) {
    await fs.writeJson(DB_PATH, data, { spaces: 2 });
}

const API_KEY = "cc183d0a7fba7908e5a73dc8c6bae3e1";

// ===================== USERS =====================

// Get Users
app.get("/users", async (req, res) => {

    try {

        const data = await readDB();

        res.json(data.users);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

// Register User
app.post("/users", async (req, res) => {

    try {

        const data = await readDB();

        const users = data.users;

        const newUser = req.body;

        newUser.id =
            users.length > 0
                ? Math.max(...users.map(u => u.id)) + 1
                : 1;

        users.push(newUser);

        await writeDB(data);

        res.status(201).json(newUser);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

// ===================== ADMINS =====================

// Get Admins
app.get("/admins", async (req, res) => {

    try {

        const data = await readDB();

        res.json(data.admins);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

// ===================== CHALLENGES =====================

// Get Challenges
app.get("/challenges", async (req, res) => {

    try {

        const data = await readDB();

        res.json(data.challenges);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

// Add Challenge
app.post("/challenges", async (req, res) => {

    try {

        const data = await readDB();

        const challenges = data.challenges;

        const newChallenge = req.body;

        newChallenge.id =
            challenges.length > 0
                ? Math.max(...challenges.map(c => c.id)) + 1
                : 1;

        challenges.push(newChallenge);

        await writeDB(data);

        res.status(201).json(newChallenge);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

// Update Challenge
app.put("/challenges/:id", async (req, res) => {

    try {

        const data = await readDB();

        const id = Number(req.params.id);

        const index = data.challenges.findIndex(c => c.id === id);

        if (index === -1) {

            return res.status(404).json({
                message: "Challenge not found"
            });

        }

        data.challenges[index] = {
            ...data.challenges[index],
            ...req.body,
            id
        };

        await writeDB(data);

        res.json(data.challenges[index]);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

// Delete Challenge
app.delete("/challenges/:id", async (req, res) => {

    try {

        const data = await readDB();

        const id = Number(req.params.id);

        data.challenges = data.challenges.filter(c => c.id !== id);

        await writeDB(data);

        res.json({
            message: "Challenge Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

// ===================== PROGRESS =====================

// Get Progress
app.get("/progress", async (req, res) => {

    try {

        const data = await readDB();

        res.json(data.progress);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

// Save Progress
app.post("/progress", async (req, res) => {

    try {

        const data = await readDB();

        const progress = data.progress;

        const newProgress = req.body;

        newProgress.id =
            progress.length > 0
                ? Math.max(...progress.map(p => p.id)) + 1
                : 1;

        progress.push(newProgress);

        await writeDB(data);

        res.status(201).json(newProgress);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

// ===================== RUN JAVA CODE =====================

app.post("/run", async (req, res) => {

    try {

        const response = await fetch(
            "https://api.onlinecompiler.io/api/run-code-sync/",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": API_KEY
                },

                body: JSON.stringify({

                    compiler: "openjdk-25",

                    code: req.body.code,

                    input: req.body.input || ""

                })

            }
        );

        const result = await response.json();

        res.json(result);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ===================== START SERVER =====================

app.listen(5000, () => {

    console.log("Server running on http://localhost:5000");

});