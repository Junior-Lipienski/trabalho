// Importa bibliotecas necessárias
const express = require("express");
const client = require("prom-client"); // Cliente Prometheus para métricas

// Cria a aplicação e define a porta
const app = express();
const port = process.env.PORT || 3000;

// Cria um registro padrão de métricas
const register = new client.Registry();

// ==============================================
// MÉTRICA 1 - http_requests_total
// ==============================================
const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Número total de requisições HTTP recebidas"
});
register.registerMetric(httpRequests);

// ==============================================
// MÉTRICA 2 - users_online_total
// ==============================================
const usersOnline = new client.Counter({
  name: "users_online_total",
  help: "Número total de usuários online (soma cumulativa)"
});
register.registerMetric(usersOnline);

// ==============================================
// ROTA PRINCIPAL ("/")
// ==============================================
app.get("/", (req, res) => {
  httpRequests.inc(); // Incrementa a métrica http_requests_total
  res.send("Aplicação Node.js com Prometheus e Nginx funcionando!");
});

// ==============================================
// NOVA ROTA ("/online")
// ==============================================
app.get("/online", (req, res) => {
  usersOnline.inc(); // Incrementa a métrica users_online_total
  res.send("Usuário adicionado à contagem de online!");
});

// ==============================================
// ROTA /metrics
// ==============================================
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
});

// ==============================================
// INICIA O SERVIDOR
// ==============================================
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});