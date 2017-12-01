const Client = require('../models').Client;
const Address = require('../models').Address;
const AlternateContact = require('../models').AlternateContact;
const EducationDetail = require('../models').EducationDetail;
const EmploymentDetail = require('../models').EmploymentDetail;
const Reference = require('../models').Reference;

module.exports = {
  create(req, res) {
    let formData  = req.body;
    let date = new Date();

    console.log(formData);

    if (formData === null || formData === undefined || formData === 'undefined') {
      res.status(400).send('bad request');
      return;
    }

    // create Days of Week JSON
    const daysOfWeekJSON = getDaysOfWeekJSON(formData);

    // create client address
    Address.create({}).then( address => {
      let address_id = address.get('id');
      let keySkilsJSON = JSON.stringify(formData.key_skills);

      return Client.create({
       /***********************
        *
        * Page 1
        *
        ***********************/

        //Personal Information
        first_name: formData.fname,
        last_name: formData.lname,
        registration_date: date,
        createdAt: date,
        updatedAt: date,
        
      }).then(client => {
        let client_id = client.get('id');

        // create Alternate Contact address
        Address.create({}).then(alt_address => {
          let alt_address_id = alt_address.get('id');
          // create Alternate Contact
          AlternateContact.create({
            ClientId: client_id,
            AddressId: alt_address_id
          });
        });
        
        res.status(201).send(client);
      })
      .catch(error => res.status(400).send("Server Error Creating Client").then(console.log(error)));
    });
  },

  getAll(req, res) {
    return Client
        .all()
        .then(clients => res.status(200).send(JSON.stringify(clients)))
        .catch(error => res.status(400).send(error));
  },

  getOne(req, res) {
    return Client
        .findByPrimary(req.params.clientId)
        .then(client => {
          if (!client) {
            return res.status(404).send({
              message: 'Client Not Found'
            });
          }
          return res.status(200).send(client);
        })
        .catch(error => res.status(400).send(error));
  },

  getOneAll(req, res) {
    return Client
        .findOne({
          where: {
            id: req.params.clientId
          },
          include: [{
            all: true,
            nested: true,
            required: false
          }]
        }).then(client => {
          if (!client) {
            return res.status(404).send({
              message: 'Client Not Found'
            });
          }
          return res.status(200).send(client);
        })
        .catch(error => res.status(400).send(error));
  },

  updateOne(req, res) {
    let formData = req.body;

    if (formData === null || formData === undefined || formData === 'undefined') {
      res.status(400).send('bad request');
      return;
    }

    return Client
      .update({
        first_name: formData.fname,
        last_name: formData.lname,
        dob: formData.dob,
        race: formData.race,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        ssn: formData.ssn,
        odl: formData.odl,
        foodhc: formData.foodhc
      }, {
        where: {id: formData.id},
        returning: true,
        plain: true
      })
      .then(updatedClient => res.status(200).send(JSON.stringify(updatedClient)));
    }
};


function getDaysOfWeekJSON(data) {
  console.log("in daysofweek");
  let days_of_week = {};
  days_of_week.days = [];

  if (data.monday) {
    days_of_week.days.push('M');
  }
  if (data.tuesday) {
    days_of_week.days.push('T');
  }
  if (data.wednesday) {
    days_of_week.days.push('W');
  }
  if (data.thursday) {
    days_of_week.days.push('TH');
  }
  if (data.friday) {
    days_of_week.days.push('F');
  }
  if (data.saturday) {
    days_of_week.days.push('SA');
  }
  if (data.sunday) {
    days_of_week.days.push('SU');
  }

  return JSON.stringify(days_of_week);
}
