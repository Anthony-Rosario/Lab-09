const pool = require('../utils/pool.js');

module.exports = class Strain {
  id;
  name;
  genetics;
  thc;
  cbd;
  effect;
  grow_climate;

  constructor(rows) {
    this.id = row.id;
    this.name = row.name;
    this.genetics = row.genetics;
    this.thc = row.thc;
    this.cbd = row.cbd;
    this.effect = row.effect;
    this.grow_climate = row.grow_climate;
  }

  static async insert({ name, genetics, thc, cbd, effect, grow_climate }) {
    const { rows } = await pool.query(`
    INSERT INTO strains (name, genetics, thc, cbd, effect, grow_climate) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *`,
    [name, genetics, thc, cbd, effect, grow_climate]);
  }

  static async getAll() {
    const { rows } = pool.query(`
    SELECT * FROM strains`,
    [])
  }
}