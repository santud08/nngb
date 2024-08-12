import Sequelize from "sequelize";
import { sequelize, sequelizeO } from "../config/index.js";
//masterDb import
//import * as emailTemplate from "./masterDb/emailTemplate.js";
//import * as user from "./masterDb/user.js";
import * as masterDb from "./masterDb/index.js";
//sourceDb import
//import * as usr from "./sourceDb/usr.js";
import * as sourceDb from "./sourceDb/index.js";

// const db = {
//   emailTemplate: emailTemplate.default(sequelize, Sequelize.DataTypes),
//   user: user.default(sequelize, Sequelize.DataTypes),
// };
//master db mapping
const db = {};
if (masterDb && Object.keys(masterDb) && Object.keys(masterDb).length > 0) {
  for (const master of Object.keys(masterDb)) {
    db[master] = masterDb[master].default(sequelize, Sequelize.DataTypes);
  }
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// const dbO = {
//   usr: usr.default(sequelizeO, Sequelize.DataTypes),
// };
const dbO = {};
if (sourceDb && Object.keys(sourceDb) && Object.keys(sourceDb).length > 0) {
  for (const source of Object.keys(sourceDb)) {
    dbO[source] = sourceDb[source].default(sequelizeO, Sequelize.DataTypes);
  }
}

Object.keys(dbO).forEach((modelName) => {
  if (dbO[modelName].associate) {
    dbO[modelName].associate(dbO);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//console.log("db", db);
dbO.sequelizeO = sequelizeO;
dbO.Sequelize = Sequelize;

//export default { db };
export { db, dbO };
