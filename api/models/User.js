const db = require('../db');
const ExpressError = require('../helpers/expressError');
const bcrypt = require('bcrypt');


class User {

    static async register({username, email, password}) {
        const duplicateCheck = await db.query(
          `SELECT username 
            FROM users 
            WHERE username = $1`,
          [username]
        );
    
        if (duplicateCheck.rows[0]) {
          throw new ExpressError(
            `There already exists a user with username '${username}'`,
            400
          );
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const result = await db.query(
          `INSERT INTO users 
              (username, email, password) 
            VALUES ($1, $2, $3) 
            RETURNING id, username, password`,
          [
            username,
            email,
            hashedPassword,
          ]
        );
    
        return result.rows[0];
      }

      static async get(username) {
        const userRes = await db.query(
              `SELECT id,
                      username,
                      password
               FROM users
               WHERE username = $1`,
            [username],
        );
    
        const user = userRes.rows[0];
    
        return user;
      }
    

}

module.exports = User;
