import mysql from 'mysql';

// eslint-disable-next-line
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_POOL_SIZE } = process.env;

////////////////////////////////////////////////////////////////////////////////
// Globals
////////////////////////////////////////////////////////////////////////////////

const DefaultPoolSize = 16;
const DBPoolSize = DB_POOL_SIZE || DefaultPoolSize;

let connPool = null;

////////////////////////////////////////////////////////////////////////////////
// Exported functions
////////////////////////////////////////////////////////////////////////////////

export function initDB() {
  assertEnvVars();
  console.log(`🗃  [DB] creating connection pool; max size ${DBPoolSize}`);
  connPool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    timezone: 'Z',
    connectionLimit: DBPoolSize,
  });
}

export function closeDB() {
  if (connPool) {
    connPool.end();
  }
}

export function assertEnvVars() {
  if (!(DB_HOST && DB_NAME && DB_USER && DB_PASSWORD)) {
    console.error(
      '👹 Fatal: you must provide env vars DB_HOST, DB_NAME, DB_USER, DB_PASSWORD'
    );
    // eslint-disable-next-line
    process.exit(1);
  }
}

export async function getNumbersList() {
  const rows = await runQuery('select * from example_numbers');
  return rows.map((r) => r.num);
}

export async function addNumberToList(num) {
  const query = mysql.format('insert into example_numbers (num) values (?)', [
    num,
  ]);
  await runQuery(query);
}

////////////////////////////////////////////////////////////////////////////////
// Private functions
////////////////////////////////////////////////////////////////////////////////

function runQuery(query) {
  return new Promise((resolve, reject) => {
    connPool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
