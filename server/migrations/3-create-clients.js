'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      registration_date: { type: Sequelize.DATEONLY },
      createdAt: { 
        allowNull: false,
        type: Sequelize.DATE 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE 
      },

      /***********************
       * Master Form Sections:
       *   Personal Info
       *   Income
       *   Insurance
       *   Employment
       *   Disability Info
       *   Special Programs
       *   Aditional Info
       *   Education
       *   Medical Info
       ***********************/

      /***********************
       *
       * Page 1
       *
       ***********************/

      //Personal Information
      first_name: { type: Sequelize.STRING },
      middle_name: { type: Sequelize.STRING },
      last_name: { type: Sequelize.STRING },
      preferred_name: { type: Sequelize.STRING },
      previous_last_name: { type: Sequelize.STRING },
      dob: { type: Sequelize.DATEONLY },
      email: { type: Sequelize.STRING },
      gender: { type: Sequelize.STRING },
      ssn: { type: Sequelize.INTEGER },
      phone: { type: Sequelize.STRING },
      phone_type: { type: Sequelize.STRING },
      phone2_number: { type: Sequelize.STRING },
      phone2_type: { type: Sequelize.STRING },
      race: { type: Sequelize.STRING },
      race_other_explain: { type: Sequelize.STRING },
      primary_language: { type: Sequelize.STRING },
      language_counselor_notes: { type: Sequelize.STRING },
      prior_client: { type: Sequelize.BOOLEAN },
      prior_client_explain: { type: Sequelize.STRING },

      /***********************
       *
       * Page 2
       *
       ***********************/

      //Personal Information cont.
      us_citizen: { type: Sequelize.BOOLEAN },
      work_permit: { type: Sequelize.BOOLEAN },
      //Contacts in Alternate contacts table
      contacts_counselor_notes: { type: Sequelize.STRING },
      living_situation: { type: Sequelize.STRING },
      marital_status: { type: Sequelize.STRING },
      living_with_you_self_only: { type: Sequelize.BOOLEAN },
      living_with_you_partner_children: { type: Sequelize.BOOLEAN },
      living_with_you_parents: { type: Sequelize.BOOLEAN },
      living_with_you_other: { type: Sequelize.BOOLEAN },
      living_with_you_other_explain: { type: Sequelize.STRING },
      who_reffered_you: { type: Sequelize.STRING },

      //Income
      income_SSI: { type: Sequelize.STRING },
      income_SSDI: { type: Sequelize.STRING },
      income_TANF: { type: Sequelize.STRING },
      income_SNAP: { type: Sequelize.STRING },
      income_subtotal: { type: Sequelize.STRING },
      income_workers_comp_source: { type: Sequelize.STRING },
      income_workers_comp_progam: { type: Sequelize.STRING },
      income_workers_comp_amount: { type: Sequelize.STRING },
      income_veterans_source: { type: Sequelize.STRING },
      income_veterans_progam: { type: Sequelize.STRING },
      income_veterans_amount: { type: Sequelize.STRING },
      income_personal_source: { type: Sequelize.STRING },
      income_personal_progam: { type: Sequelize.STRING },
      income_personal_amount: { type: Sequelize.STRING },
      income_other_source: { type: Sequelize.STRING },
      income_other_progam: { type: Sequelize.STRING },
      income_other_amount: { type: Sequelize.STRING },
      income_total: { type: Sequelize.STRING },
      income_counselor_notes: { type: Sequelize.STRING },

      /***********************
       *
       * Page 3
       *
       ***********************/

      //Medical Insurance Information
      insurance_medicaid: { type: Sequelize.BOOLEAN },
      insurance_medicare: { type: Sequelize.BOOLEAN },
      insurance_OHP: { type: Sequelize.BOOLEAN },
      insurance_private_other: { type: Sequelize.BOOLEAN },
      insurance_private_employer: { type: Sequelize.BOOLEAN },
      insurance_public: { type: Sequelize.BOOLEAN },
      insurance_workers_comp: { type: Sequelize.BOOLEAN },
      insurance_none: { type: Sequelize.BOOLEAN },
      insurance_counselor_notes: { type: Sequelize.STRING },

      //Employment - Also uses employment details table
      currently_employed: { type: Sequelize.BOOLEAN },
      current_hours_per_week: { type: Sequelize.STRING },
      current_salary: { type: Sequelize.STRING },
      current_hourly_wage: { type: Sequelize.STRING },
      current_seasonal_farm_worker: { type: Sequelize.BOOLEAN },

      /***********************
       *
       * Page 4
       *
       ***********************/

      //Employment cont. - Mostly uses employment details table
      employment_counselor_notes: { type: Sequelize.STRING },

      /***********************
       *
       * Page 5
       *
       ***********************/

      //Employment cont.
      military: { type: Sequelize.BOOLEAN }, //veteran
      injured_during_service: { type: Sequelize.BOOLEAN },
      receiving_VAVR_services: { type: Sequelize.BOOLEAN },
      workers_comp_claim: { type: Sequelize.STRING },
      workers_comp_claim_state: { type: Sequelize.STRING },
      oregon_preffered_worker: { type: Sequelize.BOOLEAN },

      //Disability Info
      condition1: { type: Sequelize.STRING },
      condition1_year_onset: { type: Sequelize.STRING },
      condition1_how_affects: { type: Sequelize.STRING },
      condition2: { type: Sequelize.STRING },
      condition2_year_onset: { type: Sequelize.STRING },
      condition2_how_affects: { type: Sequelize.STRING },
      condition3: { type: Sequelize.STRING },
      condition3_year_onset: { type: Sequelize.STRING },
      condition3_how_affects: { type: Sequelize.STRING },
      condition4: { type: Sequelize.STRING },
      condition4_year_onset: { type: Sequelize.STRING },
      condition4_how_affects: { type: Sequelize.STRING },
      condition5: { type: Sequelize.STRING },
      condition5_year_onset: { type: Sequelize.STRING },
      condition5_how_affects: { type: Sequelize.STRING },
      medication1: { type: Sequelize.STRING },
      medication1_purpose: { type: Sequelize.STRING },
      medication2: { type: Sequelize.STRING },
      medication2_purpose: { type: Sequelize.STRING },
      medication3: { type: Sequelize.STRING },
      medication3_purpose: { type: Sequelize.STRING },
      medication4: { type: Sequelize.STRING },
      medication4_purpose: { type: Sequelize.STRING },
      medication5: { type: Sequelize.STRING },
      medication5_purpose: { type: Sequelize.STRING },
      disability_counselor_notes: { type: Sequelize.STRING },
      pass_drug_screen: { type: Sequelize.BOOLEAN },
      medications: { type: Sequelize.TEXT },


      /***********************
       *
       * Page 6
       *
       ***********************/

      //Special Programs - column1
      program_adult_education: { type: Sequelize.BOOLEAN },
      program_adult_parole: { type: Sequelize.BOOLEAN },
      program_alcohol_drug: { type: Sequelize.BOOLEAN },
      program_alcohol_drug_youth: { type: Sequelize.BOOLEAN },
      program_american_indian: { type: Sequelize.BOOLEAN },
      program_career_workforce: { type: Sequelize.BOOLEAN },
      program_center_independent_living: { type: Sequelize.BOOLEAN },
      program_cps: { type: Sequelize.BOOLEAN },
      program_community_rehabilitation: { type: Sequelize.BOOLEAN },
      program_consumer_organization: { type: Sequelize.BOOLEAN },
      program_dd_brokerage: { type: Sequelize.BOOLEAN },
      program_dd_county: { type: Sequelize.BOOLEAN },
      program_dol_employment: { type: Sequelize.BOOLEAN },
      program_educ_elem: { type: Sequelize.BOOLEAN },
      program_educ_post_secondary: { type: Sequelize.BOOLEAN },
      program_employed_persons: { type: Sequelize.BOOLEAN },
      program_employer: { type: Sequelize.BOOLEAN },
      program_employment_network: { type: Sequelize.BOOLEAN },
      program_employment_transit: { type: Sequelize.BOOLEAN },
      program_experience: { type: Sequelize.BOOLEAN },
      program_federal_student_aid: { type: Sequelize.BOOLEAN },
      program_general_assistance: { type: Sequelize.BOOLEAN },
      program_independent_living: { type: Sequelize.BOOLEAN },
      //Special Programs - column2
      program_intellectual: { type: Sequelize.BOOLEAN },
      program_juvenile_parole: { type: Sequelize.BOOLEAN },
      program_latino_connection: { type: Sequelize.BOOLEAN },
      program_medical_health_provider: { type: Sequelize.BOOLEAN },
      program_mental_health_provider: { type: Sequelize.BOOLEAN },
      program_one_stop_employment: { type: Sequelize.BOOLEAN },
      program_other_state_agency: { type: Sequelize.BOOLEAN },
      program_other_vr: { type: Sequelize.BOOLEAN },
      program_public_housing: { type: Sequelize.BOOLEAN },
      program_not_ytp: { type: Sequelize.BOOLEAN },
      program_ytp: { type: Sequelize.BOOLEAN },
      program_special_ytp: { type: Sequelize.BOOLEAN },
      program_sfw: { type: Sequelize.BOOLEAN },
      program_ssa: { type: Sequelize.BOOLEAN },
      program_state_department: { type: Sequelize.BOOLEAN },
      program_supported_employment: { type: Sequelize.BOOLEAN },
      program_temp_assistance: { type: Sequelize.BOOLEAN },
      program_veterans_administration: { type: Sequelize.BOOLEAN },
      program_welfare_agency: { type: Sequelize.BOOLEAN },
      program_work_readiness: { type: Sequelize.BOOLEAN },
      program_workers_comp: { type: Sequelize.BOOLEAN },
      program_workers_comp_special: { type: Sequelize.BOOLEAN },
      program_none: { type: Sequelize.BOOLEAN },
      //Special Programs cont.
      other_agency1_name: { type: Sequelize.STRING },
      other_agency1_contact: { type: Sequelize.STRING },
      other_agency1_phone: { type: Sequelize.STRING },
      other_agency2_name: { type: Sequelize.STRING },
      other_agency2_contact: { type: Sequelize.STRING },
      other_agency2_phone: { type: Sequelize.STRING },
      other_agency3_name: { type: Sequelize.STRING },
      other_agency3_contact: { type: Sequelize.STRING },
      other_agency3_phone: { type: Sequelize.STRING },
      other_agency4_name: { type: Sequelize.STRING },
      other_agency4_contact: { type: Sequelize.STRING },
      other_agency4_phone: { type: Sequelize.STRING },
      special_programs_counselor_notes: { type: Sequelize.STRING },

      /***********************
       *
       * Page 7
       *
       ***********************/

      //Additional Info
      learn_find_work: { type: Sequelize.BOOLEAN },
      learn_decide_work_goal: { type: Sequelize.BOOLEAN },
      learn_work_with_disability: { type: Sequelize.BOOLEAN },
      learn_other: { type: Sequelize.BOOLEAN },
      learn_explain: { type: Sequelize.STRING },
      strengths_skills: { type: Sequelize.STRING },
      learn_counselor_notes: { type: Sequelize.STRING },
      interest_type_of_work: { type: Sequelize.STRING },
      part_time: { type: Sequelize.BOOLEAN },
      hours: { type: Sequelize.INTEGER },
      full_time: { type: Sequelize.BOOLEAN },
      part_full_time_not_sure: { type: Sequelize.BOOLEAN },
      current_computer_level: { type: Sequelize.BOOLEAN },
      source_transportation: { type: Sequelize.STRING },
      drivers_license: { type: Sequelize.BOOLEAN },
      car_insurance: { type: Sequelize.BOOLEAN },
      car_insurance_state: { type: Sequelize.STRING },
      //////From previous group, doesn't appear to be on form
      avail_date: { type: Sequelize.DATEONLY },
      expectedwage: { type: Sequelize.FLOAT },
      daysofweek: { type: Sequelize.JSON },
      willworkdays: { type: Sequelize.BOOLEAN },
      willworkswing: { type: Sequelize.BOOLEAN },
      willworknoc: { type: Sequelize.BOOLEAN },
      inside: { type: Sequelize.BOOLEAN },
      outside: { type: Sequelize.BOOLEAN },
      geo_area: { type: Sequelize.STRING },
      no_work_exp: { type: Sequelize.BOOLEAN },
      benefits_prof: { type: Sequelize.BOOLEAN },
      benefits_exp: { type: Sequelize.TEXT },
      other_agency: { type: Sequelize.BOOLEAN },
      ///////


      //Additional Info cont.
      clean_driving_record: { type: Sequelize.BOOLEAN },
      clean_driving_record_explain: { type: Sequelize.STRING },
      crime_conviction: { type: Sequelize.BOOLEAN },
      crime_conviction_explain: { type: Sequelize.STRING },
      misdemeanor: { type: Sequelize.BOOLEAN },
      misdemeanor_exp: { type: Sequelize.TEXT },
      felony: { type: Sequelize.BOOLEAN },
      felony_exp: { type: Sequelize.TEXT },
      on_probation: { type: Sequelize.BOOLEAN },
      probation_officer_name: { type: Sequelize.STRING },
      probation_officer_phone: { type: Sequelize.STRING },
      probation_counselor_notes: { type: Sequelize.STRING },
      other_legal_issues: { type: Sequelize.STRING },
      history_substance_use: { type: Sequelize.BOOLEAN },
      history_substance_use_explain: { type: Sequelize.STRING },
      can_pass_drug_test: { type: Sequelize.BOOLEAN },
      can_pass_drug_test_explain: { type: Sequelize.STRING },
      substance_use_counselor_notes: { type: Sequelize.STRING },

      //Education Info
      high_school_graduate: { type: Sequelize.BOOLEAN },
      highest_grade_completed: { type: Sequelize.STRING },
      special_ed: { type: Sequelize.BOOLEAN },
      iep: { type: Sequelize.BOOLEAN },
      plan_504: { type: Sequelize.BOOLEAN },
      participant_youth_in_transition: { type: Sequelize.BOOLEAN },
      if_yes_school_name: { type: Sequelize.STRING },
      if_yes_school_city: { type: Sequelize.STRING },
      if_yes_school_state: { type: Sequelize.STRING },


      /***********************
       *
       * Page 9
       *
       ***********************/

      //Education Info cont.
      //Uses Education Details Table For schools
      currently_attending_college: { type: Sequelize.BOOLEAN },
      where_college: { type: Sequelize.STRING },
      default_student_loans: { type: Sequelize.BOOLEAN },
      education_counselor_notes: { type: Sequelize.STRING },

      //Medical Information
      head_injury: { type: Sequelize.BOOLEAN },
      head_injury_explain: { type: Sequelize.STRING },
      working_restrictions: { type: Sequelize.BOOLEAN },
      working_counselor_notes: { type: Sequelize.STRING },
      //This should probably be changed to a table of providers 
      //and a table for client/provider relationship
      provider1_name: { type: Sequelize.STRING },
      provider1_phone: { type: Sequelize.STRING },
      provider1_address: { type: Sequelize.STRING },
      provider1_treatment_for: { type: Sequelize.STRING },
      provider1_still_seeing: { type: Sequelize.BOOLEAN },
      provider1_most_recent_visit: { type: Sequelize.STRING },
      provider2_name: { type: Sequelize.STRING },
      provider2_phone: { type: Sequelize.STRING },
      provider2_address: { type: Sequelize.STRING },
      provider2_treatment_for: { type: Sequelize.STRING },
      provider2_still_seeing: { type: Sequelize.BOOLEAN },
      provider2_most_recent_visit: { type: Sequelize.STRING },
      provider3_name: { type: Sequelize.STRING },
      provider3_phone: { type: Sequelize.STRING },
      provider3_address: { type: Sequelize.STRING },
      provider3_treatment_for: { type: Sequelize.STRING },
      provider3_still_seeing: { type: Sequelize.BOOLEAN },
      provider3_most_recent_visit: { type: Sequelize.STRING },
      provider4_name: { type: Sequelize.STRING },
      provider4_phone: { type: Sequelize.STRING },
      provider4_address: { type: Sequelize.STRING },
      provider4_treatment_for: { type: Sequelize.STRING },
      provider4_still_seeing: { type: Sequelize.BOOLEAN },
      provider4_most_recent_visit: { type: Sequelize.STRING },
      provider5_name: { type: Sequelize.STRING },
      provider5_phone: { type: Sequelize.STRING },
      provider5_address: { type: Sequelize.STRING },
      provider5_treatment_for: { type: Sequelize.STRING },
      provider5_still_seeing: { type: Sequelize.BOOLEAN },
      provider5_most_recent_visit: { type: Sequelize.STRING },
      medical_info_counselor_notes: { type: Sequelize.STRING },

      //From previous group, doesn't appear to be used on form
      odl: { type: Sequelize.STRING },
      foodhc: { type: Sequelize.BOOLEAN },
      car_access: { type: Sequelize.BOOLEAN },
      other_transport: { type: Sequelize.TEXT },
      resume: { type: Sequelize.BOOLEAN },
      computer_access: { type: Sequelize.BOOLEAN },
      can_complete_online_app: { type: Sequelize.BOOLEAN },
      can_complete_paper_app: { type: Sequelize.BOOLEAN },
      barriers: { type: Sequelize.TEXT },
      goal: { type: Sequelize.TEXT },
      meeting_venue: { type: Sequelize.TEXT },
      notes: { type: Sequelize.TEXT },
      photo: { type: Sequelize.BLOB },
      profile: { type: Sequelize.TEXT },
      interests: { type: Sequelize.TEXT },
      key_skills: { type: Sequelize.JSON },
      AddressId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Addresses',
          key: 'id'
        },
      },
      JobDeveloperId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'JobDevelopers',
          key: 'id'
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Clients');
  }
};
