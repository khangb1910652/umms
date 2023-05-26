const oracledb = require('oracledb');
oracledb.initOracleClient({ libDir: 'src\\database\\instantclient_21_10' });
const knex = require("knex")({
  client: 'oracledb',
  connection: {
    user: "ADMIN",
    password: "Thuctap2023*",
    connectString: "knum984wslt3bmix_high",
  },
});

export {knex};