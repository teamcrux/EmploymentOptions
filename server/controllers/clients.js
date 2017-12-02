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

    //console.log(formData);

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
        /***********************
        *
        * Page 1
        *
        ***********************/

        //Personal Information
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        preferred_name: formData.preferred_name,
        previous_last_name: formData.previous_last_name,
        dob: formData.dob,
        email: formData.email,
        gender: formData.gender,
        ssn: formData.ssn,
        phone: formData.phone,
        phone_type: formData.phone_type,
        phone2_number: formData.phone2_number,
        phone2_type: formData.phone2_type,
        race: formData.race,
        race_other_explain: formData.race_other_explain,
        primary_language: formData.primary_language,
        language_counselor_notes: formData.language_counselor_notes,
        prior_client: formData.prior_client,
        prior_client_explain: formData.prior_client_explain,

        /***********************
        *
        * Page 2
        *
        ***********************/

        //Personal Information cont.
        us_citizen: formData.us_citizen,
        work_permit: formData.work_permit,
        //Contacts in Alternate contacts table
        contacts_counselor_notes: formData.contacts_counselor_notes,
        living_situation: formData.living_situation,
        marital_status: formData.marital_status,
        living_with_you_self_only: formData.living_with_you_self_only,
        living_with_you_partner_children: formData.living_with_you_partner_children,
        living_with_you_parents: formData.living_with_you_parents,
        living_with_you_other: formData.living_with_you_other,
        living_with_you_other_explain: formData.living_with_you_other_explain,
        who_reffered_you: formData.who_reffered_you,

        //Income
        income_SSI: formData.income_SSI,
        income_SSDI: formData.income_SSDI,
        income_TANF: formData.income_TANF,
        income_SNAP: formData.income_SNAP,
        income_subtotal: formData.income_subtotal,
        income_workers_comp_source: formData.income_workers_comp_source,
        income_workers_comp_progam: formData.income_workers_comp_progam,
        income_workers_comp_amount: formData.income_workers_comp_amount,
        income_veterans_source: formData.income_veterans_source,
        income_veterans_progam: formData.income_veterans_progam,
        income_veterans_amount: formData.income_veterans_amount,
        income_personal_source: formData.income_personal_source,
        income_personal_progam: formData.income_personal_progam,
        income_personal_amount: formData.income_personal_amount,
        income_other_source: formData.income_other_source,
        income_other_progam: formData.income_other_progam,
        income_other_amount: formData.income_other_amount,
        income_total: formData.income_total,
        income_counselor_notes: formData.income_counselor_notes,

        /***********************
        *
        * Page 3
        *
        ***********************/

        //Medical Insurance Information
        insurance_medicaid: formData.insurance_medicaid,
        insurance_medicare: formData.insurance_medicare,
        insurance_OHP: formData.insurance_OHP,
        insurance_private_other: formData.insurance_private_other,
        insurance_private_employer: formData.insurance_private_employer,
        insurance_public: formData.insurance_public,
        insurance_workers_comp: formData.insurance_workers_comp,
        insurance_none: formData.insurance_none,
        insurance_counselor_notes: formData.insurance_counselor_notes,

        //Employment - Also uses employment details table
        currently_employed: formData.currently_employed,
        current_hours_per_week: formData.current_hours_per_week,
        current_salary: formData.current_salary,
        current_hourly_wage: formData.current_hourly_wage,
        current_seasonal_farm_worker: formData.current_seasonal_farm_worker,

        /***********************
        *
        * Page 4
        *
        ***********************/

        //Employment cont. - Mostly uses employment details table
        employment_counselor_notes: formData.employment_counselor_notes,

        /***********************
        *
        * Page 5
        *
        ***********************/

        //Employment cont.
        military: formData.military,
        injured_during_service: formData.injured_during_service,
        receiving_VAVR_services: formData.receiving_VAVR_services,
        workers_comp_claim: formData.workers_comp_claim,
        workers_comp_claim_state: formData.workers_comp_claim_state,
        oregon_preffered_worker: formData.oregon_preffered_worker,

        //Disability Info
        condition1: formData.condition1,
        condition1_year_onset: formData.condition1_year_onset,
        condition1_how_affects: formData.condition1_how_affects,
        condition2: formData.condition2,
        condition2_year_onset: formData.condition2_year_onset,
        condition2_how_affects: formData.condition2_how_affects,
        condition3: formData.condition3,
        condition3_year_onset: formData.condition3_year_onset,
        condition3_how_affects: formData.condition3_how_affects,
        condition4: formData.condition4,
        condition4_year_onset: formData.condition4_year_onset,
        condition4_how_affects: formData.condition4_how_affects,
        condition5: formData.condition5,
        condition5_year_onset: formData.condition5_year_onset,
        condition5_how_affects: formData.condition5_how_affects,
        medication1: formData.medication1,
        medication1_purpose: formData.medication1_purpose,
        medication2: formData.medication2,
        medication2_purpose: formData.medication2_purpose,
        medication3: formData.medication3,
        medication3_purpose: formData.medication3_purpose,
        medication4: formData.medication4,
        medication4_purpose: formData.medication4_purpose,
        medication5: formData.medication5,
        medication5_purpose: formData.medication5_purpose,
        disability_counselor_notes: formData.disability_counselor_notes,
        pass_drug_screen: formData.pass_drug_screen,
        medications: formData.medications,


        /***********************
        *
        * Page 6
        *
        ***********************/

        //Special Programs - column1
        program_adult_education: formData.program_adult_education,
        program_adult_parole: formData.program_adult_parole,
        program_alcohol_drug: formData.program_alcohol_drug,
        program_alcohol_drug_youth: formData.program_alcohol_drug_youth,
        program_american_indian: formData.program_american_indian,
        program_career_workforce: formData.program_career_workforce,
        program_center_independent_living: formData.program_center_independent_living,
        program_cps: formData.program_cps,
        program_community_rehabilitation: formData.program_community_rehabilitation,
        program_consumer_organization: formData.program_consumer_organization,
        program_dd_brokerage: formData.program_dd_brokerage,
        program_dd_county: formData.program_dd_county,
        program_dol_employment: formData.program_dol_employment,
        program_educ_elem: formData.program_educ_elem,
        program_educ_post_secondary: formData.program_educ_post_secondary,
        program_employed_persons: formData.program_employed_persons,
        program_employer: formData.program_employer,
        program_employment_network: formData.program_employment_network,
        program_employment_transit: formData.program_employment_transit,
        program_experience: formData.program_experience,
        program_federal_student_aid: formData.program_federal_student_aid,
        program_general_assistance: formData.program_general_assistance,
        program_independent_living: formData.program_independent_living,
        //Special Programs - column2
        program_intellectual: formData.program_intellectual,
        program_juvenile_parole: formData.program_juvenile_parole,
        program_latino_connection: formData.program_latino_connection,
        program_medical_health_provider: formData.program_medical_health_provider,
        program_mental_health_provider: formData.program_mental_health_provider,
        program_one_stop_employment: formData.program_one_stop_employment,
        program_other_state_agency: formData.program_other_state_agency,
        program_other_vr: formData.program_other_vr,
        program_public_housing: formData.program_public_housing,
        program_not_ytp: formData.program_not_ytp,
        program_ytp: formData.program_ytp,
        program_special_ytp: formData.program_special_ytp,
        program_sfw: formData.program_sfw,
        program_ssa: formData.program_ssa,
        program_state_department: formData.program_state_department,
        program_supported_employment: formData.program_supported_employment,
        program_temp_assistance: formData.program_temp_assistance,
        program_veterans_administration: formData.program_veterans_administration,
        program_welfare_agency: formData.program_welfare_agency,
        program_work_readiness: formData.program_work_readiness,
        program_workers_comp: formData.program_workers_comp,
        program_workers_comp_special: formData.program_workers_comp_special,
        program_none: formData.program_none,
        //Special Programs cont.
        other_agency1_name: formData.other_agency1_name,
        other_agency1_contact: formData.other_agency1_contact,
        other_agency1_phone: formData.other_agency1_phone,
        other_agency2_name: formData.other_agency2_name,
        other_agency2_contact: formData.other_agency2_contact,
        other_agency2_phone: formData.other_agency2_phone,
        other_agency3_name: formData.other_agency3_name,
        other_agency3_contact: formData.other_agency3_contact,
        other_agency3_phone: formData.other_agency3_phone,
        other_agency4_name: formData.other_agency4_name,
        other_agency4_contact: formData.other_agency4_contact,
        other_agency4_phone: formData.other_agency4_phone,
        special_programs_counselor_notes: formData.special_programs_counselor_notes,

        /***********************
        *
        * Page 7
        *
        ***********************/

        //Additional Info
        learn_find_work: formData.learn_find_work,
        learn_decide_work_goal: formData.learn_decide_work_goal,
        learn_work_with_disability: formData.learn_work_with_disability,
        learn_other: formData.learn_other,
        learn_explain: formData.learn_explain,
        strengths_skills: formData.strengths_skills,
        learn_counselor_notes: formData.learn_counselor_notes,
        interest_type_of_work: formData.interest_type_of_work,
        part_time: formData.part_time,
        hours: formData.hours,
        full_time: formData.full_time,
        part_full_time_not_sure: formData.part_full_time_not_sure,
        current_computer_level: formData.current_computer_level,
        source_transportation: formData.source_transportation,
        drivers_license: formData.drivers_license,
        car_insurance: formData.car_insurance,
        car_insurance_state: formData.car_insurance_state,
        //////From previous group, doesn't appear to be on form
        avail_date: formData.avail_date,
        expectedwage: formData.expectedwage,
        daysofweek: formData.daysofweek,
        willworkdays: formData.willworkdays,
        willworkswing: formData.willworkswing,
        willworknoc: formData.willworknoc,
        inside: formData.inside,
        outside: formData.outside,
        geo_area: formData.geo_area,
        no_work_exp: formData.no_work_exp,
        benefits_prof: formData.benefits_prof,
        benefits_exp: formData.benefits_exp,
        other_agency: formData.other_agency,
        ///////


        //Additional Info cont.
        clean_driving_record: formData.clean_driving_record,
        clean_driving_record_explain: formData.clean_driving_record_explain,
        crime_conviction: formData.crime_conviction,
        crime_conviction_explain: formData.crime_conviction_explain,
        misdemeanor: formData.misdemeanor,
        misdemeanor_exp: formData.misdemeanor_exp,
        felony: formData.felony,
        felony_exp: formData.felony_exp,
        on_probation: formData.on_probation,
        probation_officer_name: formData.probation_officer_name,
        probation_officer_phone: formData.probation_officer_phone,
        probation_counselor_notes: formData.probation_counselor_notes,
        other_legal_issues: formData.other_legal_issues,
        history_substance_use: formData.history_substance_use,
        history_substance_use_explain: formData.history_substance_use_explain,
        can_pass_drug_test: formData.can_pass_drug_test,
        can_pass_drug_test_explain: formData.can_pass_drug_test_explain,
        substance_use_counselor_notes: formData.substance_use_counselor_notes,

        //Education Info
        high_school_graduate: formData.high_school_graduate,
        highest_grade_completed: formData.highest_grade_completed,
        special_ed: formData.special_ed,
        iep: formData.iep,
        plan_504: formData.plan_504,
        participant_youth_in_transition: formData.participant_youth_in_transition,
        if_yes_school_name: formData.if_yes_school_name,
        if_yes_school_city: formData.if_yes_school_city,
        if_yes_school_state: formData.if_yes_school_state,


        /***********************
        *
        * Page 9
        *
        ***********************/

        //Education Info cont.
        //Uses Education Details Table For schools
        currently_attending_college: formData.currently_attending_college,
        where_college: formData.where_college,
        default_student_loans: formData.default_student_loans,
        education_counselor_notes: formData.education_counselor_notes,

        //Medical Information
        head_injury: formData.head_injury,
        head_injury_explain: formData.head_injury_explain,
        working_restrictions: formData.working_restrictions,
        working_counselor_notes: formData.working_counselor_notes,
        //This should probably be changed to a table of providers 
        //and a table for client/provider relationship
        provider1_name: formData.provider1_name,
        provider1_phone: formData.provider1_phone,
        provider1_address: formData.provider1_address,
        provider1_treatment_for: formData.provider1_treatment_for,
        provider1_still_seeing: formData.provider1_still_seeing,
        provider1_most_recent_visit: formData.provider1_most_recent_visit,
        provider2_name: formData.provider2_name,
        provider2_phone: formData.provider2_phone,
        provider2_address: formData.provider2_address,
        provider2_treatment_for: formData.provider2_treatment_for,
        provider2_still_seeing: formData.provider2_still_seeing,
        provider2_most_recent_visit: formData.provider2_most_recent_visit,
        provider3_name: formData.provider3_name,
        provider3_phone: formData.provider3_phone,
        provider3_address: formData.provider3_address,
        provider3_treatment_for: formData.provider3_treatment_for,
        provider3_still_seeing: formData.provider3_still_seeing,
        provider3_most_recent_visit: formData.provider3_most_recent_visit,
        provider4_name: formData.provider4_name,
        provider4_phone: formData.provider4_phone,
        provider4_address: formData.provider4_address,
        provider4_treatment_for: formData.provider4_treatment_for,
        provider4_still_seeing: formData.provider4_still_seeing,
        provider4_most_recent_visit: formData.provider4_most_recent_visit,
        provider5_name: formData.provider5_name,
        provider5_phone: formData.provider5_phone,
        provider5_address: formData.provider5_address,
        provider5_treatment_for: formData.provider5_treatment_for,
        provider5_still_seeing: formData.provider5_still_seeing,
        provider5_most_recent_visit: formData.provider5_most_recent_visit,
        medical_info_counselor_notes: formData.medical_info_counselor_notes,

        //From previous group, doesn't appear to be used on form
        odl: formData.odl,
        foodhc: formData.foodhc,
        car_access: formData.car_access,
        other_transport: formData.other_transport,
        resume: formData.resume,
        computer_access: formData.computer_access,
        can_complete_online_app: formData.can_complete_online_app,
        can_complete_paper_app: formData.can_complete_paper_app,
        barriers: formData.barriers,
        goal: formData.goal,
        meeting_venue: formData.meeting_venue,
        notes: formData.notes,
        photo: formData.photo,
        profile: formData.profile,
        interests: formData.interests,
        key_skills: formData.key_skills
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
