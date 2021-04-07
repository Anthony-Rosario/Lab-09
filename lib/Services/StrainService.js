const Strain = require('../Models/Strains.js');

module.exports = class StrainService {
  static async create({ name, genetics, thc, cbd, effect, grow_climate }) {
    const strainName = await Strain.insert({name, genetics, thc, cbd, effect, grow_climate})

    return strainName;
  }
}