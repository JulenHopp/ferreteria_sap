const db = require("../config/db");

function execQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.prepare(query, (err, statement) => {
      if (err) return reject(err);
      statement.exec(params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
}

module.exports = { execQuery };