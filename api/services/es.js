const { Client } = require('@elastic/elasticsearch');

const es = new Client({ node: process.env.ES_URI, requestTimeout: 100000 });
try {
  es.ping();
  console.log(
    `Server connected to elasticsearch on ${process.env.ES_URI}`.green
  );
} catch (error) {
  console.log(`Error: ${error.message}`.red);
}

module.exports = es;
