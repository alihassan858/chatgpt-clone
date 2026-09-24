const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("ChatGPT Clone Backend is working!");
        return;
    }

    if (req.method === "POST" && req.url === "/chat") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const data = JSON.parse(body || "{}");

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                reply: "Backend received: " + (data.message || "")
            }));
        });

        return;
    }

    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.end("Not Found");
});

server.listen(PORT, "0.0.0.0", () => {
    console.log("Server started on port " + PORT);
});
