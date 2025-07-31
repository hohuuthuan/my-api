import 'dotenv/config';
import * as process from "node:process";
// import apm from 'elastic-apm-node';

// apm.start({
//   serviceName: 'my-api',
//   spanStackTraceMinDuration: '50ms',
//   transactionSampleRate: 1.0,
//   serverUrl: process.env.ELASTIC_APM_SERVER_URL ?? '',
//   environment: process.env.NODE_ENV ?? 'development',
//   logLevel: 'error',
//   active: ['production', 'staging', 'development'].includes(process.env.NODE_ENV ?? '')
// });

import '@config/postgres';
import './app';
