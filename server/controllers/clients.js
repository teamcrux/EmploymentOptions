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

    return Client.create({
      first_name: formData.fname,
      last_name: formData.lname,
      registration_date: date,
      createdAt: date,
      updatedAt: date,
    }).then(client => { res.status(201).send(client); })
      .catch(error => res.status(400).send(error));
  },
    











    /*
    // create client address
    Address.create({
      street_address_one: formData.street1,
      street_address_two: formData.street2,
      apt_num: formData.apt_num,
      city: formData.city,
      state: formData.cli_state,
      zip: formData.zip,
      po_box: formData.po_box
    })
    .then( address => {
      let address_id = address.get('id');
      let keySkilsJSON = JSON.stringify(formData.key_skills);

      return Client
          // create client
          .create({
            first_name: formData.fname,
            last_name: formData.lname,
            dob: formData.dob,
            race: formData.race,
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email,
            ssn: formData.ssn,
            odl: formData.odl,
            foodhc: formData.foodhc,
            AddressId: address_id,
            registration_date: date,
            avail_date: formData.date_avail,
            military: formData.military,
            misdemeanor: formData.misdemeanor,
            misdemeanor_exp: formData.misdemeanor_exp,
            felony: formData.felony,
            felony_exp: formData.felony_exp,
            full_time: formData.fulltime,
            part_time: formData.parttime,
            hours: formData.num_hours,
            expectedwage: formData.expected_wage,
            daysofweek: daysOfWeekJSON,
            willworkdays: formData.hours_days,
            willworkswing: formData.hours_swing,
            willworknoc: formData.hours_noc,
            inside: formData.inside,
            outside: formData.outside,
            geo_area: formData.geo_pref,
            no_work_exp: formData.no_work_exp,
            benefits_prof: formData.consulted,
            benefits_exp: formData.fin_exp,
            other_agency: formData.other_agencies,
            drivers_license: formData.license,
            car_access: formData.car_access,
            other_transport: formData.transport_exp,
            pass_drug_screen: formData.drug_screen,
            medications: formData.med_use,
            resume: formData.resume,
            computer_access: formData.comp_access,
            can_complete_online_app: formData.online_app,
            can_complete_paper_app: formData.paper_app,
            goal: formData.emp_goal,
            meeting_venue: formData.venue,
            barriers: formData.barriers,
            notes: formData.notes,
            profile: formData.profess_profile,
            interests: formData.interests,
            key_skills: keySkilsJSON

          })
          .then(client => {
            let client_id = client.get('id');

            if (formData.alt_fname !== undefined && formData.alt_fname !== null) {

              // create Alternate Contact address
              Address.create({
                street_address_one: formData.alt_street1,
                street_address_two: formData.alt_street2,
                apt_num: formData.alt_apt_num,
                city: formData.alt_city,
                state: formData.alt_state,
                zip: formData.alt_zip,
                po_box: formData.alt_po_box
              })
              .then(alt_address => {
                let alt_address_id = alt_address.get('id');

                // create Alternate Contact
                AlternateContact.create({
                  first_name: formData.alt_fname,
                  last_name: formData.alt_lname,
                  phone: formData.alt_phone,
                  relationship: formData.alt_rlnship,
                  ClientId: client_id,
                  AddressId: alt_address_id
                });
              });
            }

            if (formData.school_name !== undefined && formData.school_name !== null) {

              // create School address
              Address.create({
                street_address_one: formData.sch_street1,
                street_address_two: formData.sch_street2,
                city: formData.sch_city,
                state: formData.sch_state,
                zip: formData.sch_zip
              })
              .then( sch_address => {
                let sch_address_id = sch_address.get('id');

                // create School
                EducationDetail.create({
                  name: formData.school_name,
                  college: false,
                  high_school: true,
                  vocational: false,
                  ged: formData.ged,
                  hs_diploma: formData.diploma,
                  AddressId: sch_address_id,
                  ClientId: client_id
                });
              });
            }

            if (formData.col_name !== undefined && formData.col_name !== null) {

              // create College address
              Address.create({
                street_address_one: formData.col_street1,
                street_address_two: formData.col_street2,
                city: formData.col_city,
                state: formData.col_state,
                zip: formData.col_zip
              })
              .then( col_address => {
                let col_address_id = col_address.get('id');

                // create College
                EducationDetail.create({
                  name: formData.col_name,
                  college: true,
                  high_school: false,
                  vocational: false,
                  certificate: formData.cert_name,
                  AddressId: col_address_id,
                  ClientId: client_id
                });
              });
            }

            if (formData.voc_cert_name !== undefined && formData.voc_cert_name !== null) {

              // create Vocational education details
              EducationDetail.create({
                college: false,
                high_school: false,
                vocational: true,
                certificate: formData.voc_cert_name,
                ClientId: client_id
              });
            }

            if (!formData.no_work_exp && formData.experience !== undefined && formData.experience !== null) {

              // create Work Experience(s)
              formData.experience.forEach(function(exp) {
                let tasksJSON = JSON.stringify(exp.tasks);
                EmploymentDetail.create({
                  organization: exp.org_name,
                  description: exp.description,
                  job_title: exp.pos_name,
                  location: exp.loc,
                  job_duties: tasksJSON,
                  pay: exp.work_pay,
                  leaving_reason: exp.reason_left,
                  start: exp.emp_start,
                  end: exp.emp_end,
                  ClientId: client_id
                });
              });
            }

            if (formData.reference !== undefined && formData.reference !== null) {

              // create Reference(s)
              formData.reference.forEach(function(ref) {
                if (ref.ref_type === 'business') {
                  is_biz = true;
                  is_personal = false;
                }
                else {
                  is_biz = false;
                  is_personal = true;
                }
                Reference.create({
                  first_name: ref.ref_fname,
                  last_name: ref.ref_lname,
                  phone: ref.ref_phone,
                  years_known: ref.ref_known,
                  notes: ref.ref_notes,
                  business: is_biz,
                  personal: is_personal,
                  ClientId: client_id
                });
              });
            }

            res.status(201).send(client);
          })
          .catch(error => res.status(400).send(error));
    });
  },*/

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
