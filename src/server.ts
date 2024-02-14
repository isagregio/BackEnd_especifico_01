import express from 'express';
import routes from './routes'; // Importe as rotas do arquivo

const app = express();

app.use(express.json()); // Para permitir o uso do JSON no corpo das requisições

// Use as rotas definidas
app.use(routes);

app.listen(3333, () => {
    console.log('Server started');
});
