const insertUser = `INSERT INTO users VALUES (?,?,?,'user',now(),now(),null,null)`;

export default {
  insertUser,
};
