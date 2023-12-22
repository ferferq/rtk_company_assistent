import express, { Request, Response } from 'express';
import { routes } from './routes';
import * as dotenv from 'dotenv';
import { Config } from './configs';
import { DocumentsLoaderHandler } from './handlers/documents-loader.handler';
import { SupabaseConnection } from './services';

const environment = process.env.NODE_ENV || 'develop';
const envFilePath = `.env.${environment}`;

dotenv.config({ path: envFilePath });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para aceitar apenas requisições de uma URL específica
app.use((req: Request, res: Response, next) => {
  //const allowedOrigin = 'http://sua-url-especifica.com'; // Substitua pela URL específica permitida
  const origin = req.headers.origin;
  // if (origin === allowedOrigin) {
    // res.setHeader('Access-Control-Allow-Origin', origin!);
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  // } else {
  //   res.status(403).send('Acesso negado.');
  // }
});

function createContext() {
  const config = new Config();
  const documentsLoaderHandler = new DocumentsLoaderHandler(config);
  const supabaseConnection = new SupabaseConnection(config);

  return {
    dependencies: {
      config,
      documentsLoaderHandler,
      supabaseConnection,
    }
  }
};
// Middleware para compartilhar dependências com todas as rotas
app.use((req, res, next) => {
  (req as any).context = createContext();
  next();
});

app.use('/v1', routes());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
