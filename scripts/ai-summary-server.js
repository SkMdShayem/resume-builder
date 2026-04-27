const http = require("http");
const fs = require("fs");
const path = require("path");

const loadEnvFromFile = () => {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex < 0) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    if (!key || process.env[key]) {
      return;
    }

    let value = trimmed.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  });
};

loadEnvFromFile();

const PORT = Number(process.env.AI_SERVER_PORT) || 8787;
const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...CORS_HEADERS,
  });
  res.end(JSON.stringify(payload));
};

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON payload."));
      }
    });

    req.on("error", reject);
  });

const extractTextFromResponse = (data) => {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const output = Array.isArray(data?.output) ? data.output : [];
  const textParts = [];

  output.forEach((item) => {
    const content = Array.isArray(item?.content) ? item.content : [];
    content.forEach((contentItem) => {
      if (typeof contentItem?.text === "string" && contentItem.text.trim()) {
        textParts.push(contentItem.text.trim());
      }
    });
  });

  return textParts.join("\n").trim();
};

const improveSummary = async (summary) => {
  if (typeof fetch !== "function") {
    throw new Error(
      "Global fetch is not available. Use Node.js 18+ to run ai-summary-server.",
    );
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      input: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Improve the user's professional summary to be concise, specific, and impact-focused. Return only the improved summary text.",
        },
        {
          role: "user",
          content: `Improve this resume summary professionally:\n${summary}`,
        },
      ],
      max_output_tokens: 220,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const apiError =
      data?.error?.message || `OpenAI API request failed (${response.status}).`;
    throw new Error(apiError);
  }

  const improved = extractTextFromResponse(data);
  if (!improved) {
    throw new Error("OpenAI API returned an empty response.");
  }

  return improved;
};

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    sendJson(res, 200, {
      status: "ok",
      openAiKeyConfigured: Boolean(OPENAI_API_KEY),
      model: MODEL,
    });
    return;
  }

  if (req.method !== "POST" || req.url !== "/api/improve-summary") {
    sendJson(res, 404, { error: "Not found" });
    return;
  }

  if (!OPENAI_API_KEY) {
    sendJson(res, 500, {
      error:
        "Missing OPENAI_API_KEY. Set it before starting the AI summary server.",
    });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const summary = typeof body?.summary === "string" ? body.summary.trim() : "";

    if (!summary) {
      sendJson(res, 400, { error: "summary is required." });
      return;
    }

    const result = await improveSummary(summary);
    sendJson(res, 200, { result });
  } catch (error) {
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : "Failed to improve summary.",
    });
  }
});

server.listen(PORT, () => {
  console.log(`AI summary server running on http://localhost:${PORT}`);
});
