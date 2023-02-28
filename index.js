import express from 'express';
import cors from 'cors';
import nocache from 'nocache';

import { initDB, getNumbersList, addNumberToList } from './db';

////////////////////////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////////////////////////

function homeHandler(req, res) {
  res.send('This is an example API');
}

async function getNumbersHandler(req, res) {
  const unusedVar = 23;
  const numList = await getNumbersList();
  console.log(`🎓 [ExampleAPI] returning ${numList.length} number(s)`);
  res.json(numList);
}

async function addNumberHandler(req, res) {
  const { numStr } = req.params;
  const num = parseInt(numStr);
  console.log(`🎓 [ExampleAPI] adding number ${num} to list`);
  await addNumberToList(num);
  res.json({ result: 'ok' });
}

////////////////////////////////////////////////////////////////////////////////
// Mainline
////////////////////////////////////////////////////////////////////////////////
async function runMain() {
  // Initialize HTTP server
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(nocache());
  app.set('etag', false); // Don't set etag header to prevent caching

  app.get('/', homeHandler);
  app.get('/numbers', getNumbersHandler);
  app.get('/addnumber/:numStr', addNumberHandler);

  console.log(`🎓 [ExampleAPI] initializing DB`);
  await initDB();

  app.listen(80, () => {
    console.log(`🎓 [ExampleAPI] listening on port 80`);
  });
}
runMain();
