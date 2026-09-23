const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // OPTIONS request
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // Test route
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("ChatGPT Clone Backend is running!");
        return;
    }

    // Chat route
    if (req.method === "POST" && req.url === "/chat") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            let data = {};

            try {
                data = JSON.parse(body);
            } catch (error) {
                data = {};
            }

            const message = data.message || "";

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(
                JSON.stringify({
                    reply: "Your backend received: " + message
                })
            );
        });

        return;
    }

    // Not found
    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.end("Not Found");
});

// Start server
server.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port " + PORT);
});
