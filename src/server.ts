import 'dotenv/config';
import express from 'express';
import '@config/postgres';

const app = express();

console.log('===============================');
console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
console.log(`🚀 App listening on port ${process.env.PORT}`);
console.log('===============================');

app.listen(Number(process.env.PORT || 3000));
