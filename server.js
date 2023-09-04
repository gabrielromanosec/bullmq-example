const express = require('express');
const { Queue, Worker, QueueScheduler } = require('bullmq');
const { BullMQAdapter } = require('bull-board/bullMQAdapter'); // Importe o adaptador BullMQ
const { createBullBoard } = require('bull-board');

const app = express();
const port = 3000;

const redisConfig = {
  host: 'localhost',
  port: 6379,
};

const queue = new Queue('filaConsulta', { redis: redisConfig });

// Configurar o Bull Board
const { router: bullBoardRouter, setQueues } = createBullBoard([
  new BullMQAdapter(queue), // Adicione sua fila BullMQ aqui
]);

app.use(express.json());

app.use('/admin/queues', bullBoardRouter); // Defina a rota para o painel de controle

app.post('/consultaTeste', async (req, res) => {
  const { cpf } = req.body;

  if (!cpf) {
    return res.status(400).json({ error: 'O cpf não foi informado' });
  }

  const job = await queue.add('consulta', { cpf });
  return res.json({ jobID: job.id });
});

app.get('/status/:jobID', async (req, res) => {
  const { jobID } = req.params;

  try {
    const job = await queue.getJob(jobID);

    if (!job) {
      return res.status(404).json({ error: 'Job não encontrado.' });
    }

    const status = await job.getState();
    return res.json({ jobID: job.id, status, job });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao verificar o status do job.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
