const express = require("express"); // proxy server para evitar os problemas de CORS
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/posicoes", async (req, res) => {
  try {
    const API_KEY = "eyJucyI6InRlc3RlIiwic2MiOjE1MjY2Njk2NTJ9";
    const API_URL = `https://api.appselsyn.com.br/keek/rest/v1/integracao/posicao?apikey=${API_KEY}`;

    
    const response = await fetch(API_URL, { headers: { "Accept": "application/json" } });

    const text = await response.text();
    console.log("Status da API externa:", response.status);
    console.log("Resposta bruta:", text);

    if (!response.ok) return res.status(response.status).send(text);

    res.json(JSON.parse(text));

  } catch (err) {
    console.error("Erro no proxy:", err);
    res.status(500).json({ error: "Erro ao buscar dados da API externa" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
