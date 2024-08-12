import { envs } from "./index.js";
import Sequelize from "sequelize";
import oracledb from "oracledb";

//connecting master(mariadb) database
export const sequelize = new Sequelize(envs.db.database, envs.db.username, envs.db.password, {
  host: envs.db.host,
  port: envs.db.port,
  dialect: envs.db.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {},
  logging: false,
});
export const connect = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log(`Connection(${envs.db.dialect}) has been established successfully.`);
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
};

//connecting source(oracle) database
if (process.platform === "win32") {
  // Windows
  oracledb.initOracleClient({ libDir: `${envs.ORACLE_CLIENT.WIN32}` });
} else if (process.platform === "darwin") {
  // Mac
  oracledb.initOracleClient({
    libDir: `${envs.ORACLE_CLIENT.DARWIN}`,
  });
} else if (process.platform === "linux") {
  // linux
  oracledb.initOracleClient({
    libDir: `${envs.ORACLE_CLIENT.LINUX}`,
  });
}

export const sequelizeO = new Sequelize(envs.db1.database, envs.db1.username, envs.db1.password, {
  dialect: envs.db1.dialect,
  host: envs.db1.host,
  port: envs.db1.port,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {},
  logging: false,
});

export const connectDb1 = async () => {
  sequelizeO
    .authenticate()
    .then(() => {
      console.log(`Connection(${envs.db1.dialect}) of DB1 has been established successfully.`);
    })
    .catch((err) => {
      console.error("Unable to connect to the database1:", err);
    });
};
