const OccupationData = require('../models').OccupationData;

module.exports = {
  getAll(req, res) {
    return OccupationData
        .all()
        .then(data => res.status(200).send(JSON.stringify(data)))
        .catch(error => res.status(400).send(error));
  }
}
