const pool = require('../utils/pool.js');

module.exports = class Strain {
  id;
  name;
  genetics;
  thc;
  cbd;
  effect;
  grow_climate;

  constructor(row) {
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

    return new Strain(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
    'SELECT * FROM strains'
    );

    return rows.map(row => new Strain(row));
  }

  static async getStrainById(id) {
    const { rows } = await pool.query(`
    SELECT * 
    FROM strains
    WHERE id=$1`,
    [id]);

    return new Strain(rows[0]);
  }

  static async updateStrain(id, { name, genetics, thc, cbd, effect, grow_climate }) {
    const { rows } = await pool.query(`
    UPDATE strains
    SET name=$1, genetics=$2, thc=$3, cbd=$4, effect=$5, grow_climate=$6
    WHERE id=$7
    RETURNING *`, 
    [name, genetics, thc, cbd, effect, grow_climate, id]);

    return new Strain(rows[0])
  }

  static async deleteStrain(id) {
  await pool.query(`
    DELETE
    FROM strains
    WHERE id=$1`, 
    [id]);
  };
  
}