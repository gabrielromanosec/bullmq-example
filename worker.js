const { Worker } = require('bullmq');


const worker = new Worker('filaConsulta', async job => {
  const { cpf } = job.data;

  if(job.name == "consulta"){
    //Aqui pode se fazer o processo de validação ou abrir mais jobs
  }
  
  console.log(`${job.name}Consultando cpf: ${cpf}`);
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  console.log(`Consulta concluída para cpf: ${cpf}`);
  
  return { resultado: 'Informações da cpf', cpf };
});
