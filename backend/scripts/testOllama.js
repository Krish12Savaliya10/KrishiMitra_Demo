require("dotenv").config({ path: __dirname + "/../.env" });
async function test() {
  console.log("URL:", process.env.OLLAMA_BASE_URL);
  try {
    const response = await fetch(`${process.env.OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "llama3.2:1b",
        messages: [{ role: "user", content: "Hi" }],
        stream: false
      })
    });
    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Data:", data);
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
