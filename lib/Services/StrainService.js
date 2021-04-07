const Strain = require('../Models/Strains.js');

module.exports = class StrainService {
  static async create(strains) {
    const strainName = await Strain.insert( strains )

    return strainName;
  }
}