'use strict';
module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
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
        first_name: { type: DataTypes.STRING },
        middle_name: { type: DataTypes.STRING },
        last_name: { type: DataTypes.STRING },
        preferred_name: { type: DataTypes.STRING },
        previous_last_name: { type: DataTypes.STRING },
        dob: { type: DataTypes.DATEONLY },
        email: { type: DataTypes.STRING },
        gender: { type: DataTypes.STRING },
        ssn: { type: DataTypes.INTEGER },
        phone: { type: DataTypes.STRING },
        phone_type: { type: DataTypes.STRING },
        phone2_number: { type: DataTypes.STRING },
        phone2_type: { type: DataTypes.STRING },
        race: { type: DataTypes.STRING },
        race_other_explain: { type: DataTypes.STRING },
        primary_language: { type: DataTypes.STRING },
        language_counselor_notes: { type: DataTypes.STRING },
        prior_client: { type: DataTypes.BOOLEAN },
        prior_client_explain: { type: DataTypes.STRING },

        /***********************
        *
        * Page 2
        *
        ***********************/

        //Personal Information cont.
        us_citizen: { type: DataTypes.BOOLEAN },
        work_permit: { type: DataTypes.BOOLEAN },
        //Contacts in Alternate contacts table
        contacts_counselor_notes: { type: DataTypes.STRING },
        living_situation: { type: DataTypes.STRING },
        marital_status: { type: DataTypes.STRING },
        living_with_you_self_only: { type: DataTypes.BOOLEAN },
        living_with_you_partner_children: { type: DataTypes.BOOLEAN },
        living_with_you_parents: { type: DataTypes.BOOLEAN },
        living_with_you_other: { type: DataTypes.BOOLEAN },
        living_with_you_other_explain: { type: DataTypes.STRING },
        who_reffered_you: { type: DataTypes.STRING },

        //Income
        income_SSI: { type: DataTypes.STRING },
        income_SSDI: { type: DataTypes.STRING },
        income_TANF: { type: DataTypes.STRING },
        income_SNAP: { type: DataTypes.STRING },
        income_subtotal: { type: DataTypes.STRING },
        income_workers_comp_source: { type: DataTypes.STRING },
        income_workers_comp_progam: { type: DataTypes.STRING },
        income_workers_comp_amount: { type: DataTypes.STRING },
        income_veterans_source: { type: DataTypes.STRING },
        income_veterans_progam: { type: DataTypes.STRING },
        income_veterans_amount: { type: DataTypes.STRING },
        income_personal_source: { type: DataTypes.STRING },
        income_personal_progam: { type: DataTypes.STRING },
        income_personal_amount: { type: DataTypes.STRING },
        income_other_source: { type: DataTypes.STRING },
        income_other_progam: { type: DataTypes.STRING },
        income_other_amount: { type: DataTypes.STRING },
        income_total: { type: DataTypes.STRING },
        income_counselor_notes: { type: DataTypes.STRING },

        /***********************
        *
        * Page 3
        *
        ***********************/

        //Medical Insurance Information
        insurance_medicaid: { type: DataTypes.BOOLEAN },
        insurance_medicare: { type: DataTypes.BOOLEAN },
        insurance_OHP: { type: DataTypes.BOOLEAN },
        insurance_private_other: { type: DataTypes.BOOLEAN },
        insurance_private_employer: { type: DataTypes.BOOLEAN },
        insurance_public: { type: DataTypes.BOOLEAN },
        insurance_workers_comp: { type: DataTypes.BOOLEAN },
        insurance_none: { type: DataTypes.BOOLEAN },
        insurance_counselor_notes: { type: DataTypes.STRING },

        //Employment - Also uses employment details table
        currently_employed: { type: DataTypes.BOOLEAN },
        current_hours_per_week: { type: DataTypes.STRING },
        current_salary: { type: DataTypes.STRING },
        current_hourly_wage: { type: DataTypes.STRING },
        current_seasonal_farm_worker: { type: DataTypes.BOOLEAN },

        /***********************
        *
        * Page 4
        *
        ***********************/

        //Employment cont. - Mostly uses employment details table
        employment_counselor_notes: { type: DataTypes.STRING },

        /***********************
        *
        * Page 5
        *
        ***********************/

        //Employment cont.
        military: { type: DataTypes.BOOLEAN }, //veteran
        injured_during_service: { type: DataTypes.BOOLEAN },
        receiving_VAVR_services: { type: DataTypes.BOOLEAN },
        workers_comp_claim: { type: DataTypes.STRING },
        workers_comp_claim_state: { type: DataTypes.STRING },
        oregon_preffered_worker: { type: DataTypes.BOOLEAN },

        //Disability Info
        condition1: { type: DataTypes.STRING },
        condition1_year_onset: { type: DataTypes.STRING },
        condition1_how_affects: { type: DataTypes.STRING },
        condition2: { type: DataTypes.STRING },
        condition2_year_onset: { type: DataTypes.STRING },
        condition2_how_affects: { type: DataTypes.STRING },
        condition3: { type: DataTypes.STRING },
        condition3_year_onset: { type: DataTypes.STRING },
        condition3_how_affects: { type: DataTypes.STRING },
        condition4: { type: DataTypes.STRING },
        condition4_year_onset: { type: DataTypes.STRING },
        condition4_how_affects: { type: DataTypes.STRING },
        condition5: { type: DataTypes.STRING },
        condition5_year_onset: { type: DataTypes.STRING },
        condition5_how_affects: { type: DataTypes.STRING },
        medication1: { type: DataTypes.STRING },
        medication1_purpose: { type: DataTypes.STRING },
        medication2: { type: DataTypes.STRING },
        medication2_purpose: { type: DataTypes.STRING },
        medication3: { type: DataTypes.STRING },
        medication3_purpose: { type: DataTypes.STRING },
        medication4: { type: DataTypes.STRING },
        medication4_purpose: { type: DataTypes.STRING },
        medication5: { type: DataTypes.STRING },
        medication5_purpose: { type: DataTypes.STRING },
        disability_counselor_notes: { type: DataTypes.STRING },
        pass_drug_screen: { type: DataTypes.BOOLEAN },
        medications: { type: DataTypes.TEXT },


        /***********************
        *
        * Page 6
        *
        ***********************/

        //Special Programs - column1
        program_adult_education: { type: DataTypes.BOOLEAN },
        program_adult_parole: { type: DataTypes.BOOLEAN },
        program_alcohol_drug: { type: DataTypes.BOOLEAN },
        program_alcohol_drug_youth: { type: DataTypes.BOOLEAN },
        program_american_indian: { type: DataTypes.BOOLEAN },
        program_career_workforce: { type: DataTypes.BOOLEAN },
        program_center_independent_living: { type: DataTypes.BOOLEAN },
        program_cps: { type: DataTypes.BOOLEAN },
        program_community_rehabilitation: { type: DataTypes.BOOLEAN },
        program_consumer_organization: { type: DataTypes.BOOLEAN },
        program_dd_brokerage: { type: DataTypes.BOOLEAN },
        program_dd_county: { type: DataTypes.BOOLEAN },
        program_dol_employment: { type: DataTypes.BOOLEAN },
        program_educ_elem: { type: DataTypes.BOOLEAN },
        program_educ_post_secondary: { type: DataTypes.BOOLEAN },
        program_employed_persons: { type: DataTypes.BOOLEAN },
        program_employer: { type: DataTypes.BOOLEAN },
        program_employment_network: { type: DataTypes.BOOLEAN },
        program_employment_transit: { type: DataTypes.BOOLEAN },
        program_experience: { type: DataTypes.BOOLEAN },
        program_federal_student_aid: { type: DataTypes.BOOLEAN },
        program_general_assistance: { type: DataTypes.BOOLEAN },
        program_independent_living: { type: DataTypes.BOOLEAN },
        //Special Programs - column2
        program_intellectual: { type: DataTypes.BOOLEAN },
        program_juvenile_parole: { type: DataTypes.BOOLEAN },
        program_latino_connection: { type: DataTypes.BOOLEAN },
        program_medical_health_provider: { type: DataTypes.BOOLEAN },
        program_mental_health_provider: { type: DataTypes.BOOLEAN },
        program_one_stop_employment: { type: DataTypes.BOOLEAN },
        program_other_state_agency: { type: DataTypes.BOOLEAN },
        program_other_vr: { type: DataTypes.BOOLEAN },
        program_public_housing: { type: DataTypes.BOOLEAN },
        program_not_ytp: { type: DataTypes.BOOLEAN },
        program_ytp: { type: DataTypes.BOOLEAN },
        program_special_ytp: { type: DataTypes.BOOLEAN },
        program_sfw: { type: DataTypes.BOOLEAN },
        program_ssa: { type: DataTypes.BOOLEAN },
        program_state_department: { type: DataTypes.BOOLEAN },
        program_supported_employment: { type: DataTypes.BOOLEAN },
        program_temp_assistance: { type: DataTypes.BOOLEAN },
        program_veterans_administration: { type: DataTypes.BOOLEAN },
        program_welfare_agency: { type: DataTypes.BOOLEAN },
        program_work_readiness: { type: DataTypes.BOOLEAN },
        program_workers_comp: { type: DataTypes.BOOLEAN },
        program_workers_comp_special: { type: DataTypes.BOOLEAN },
        program_none: { type: DataTypes.BOOLEAN },
        //Special Programs cont.
        other_agency1_name: { type: DataTypes.STRING },
        other_agency1_contact: { type: DataTypes.STRING },
        other_agency1_phone: { type: DataTypes.STRING },
        other_agency2_name: { type: DataTypes.STRING },
        other_agency2_contact: { type: DataTypes.STRING },
        other_agency2_phone: { type: DataTypes.STRING },
        other_agency3_name: { type: DataTypes.STRING },
        other_agency3_contact: { type: DataTypes.STRING },
        other_agency3_phone: { type: DataTypes.STRING },
        other_agency4_name: { type: DataTypes.STRING },
        other_agency4_contact: { type: DataTypes.STRING },
        other_agency4_phone: { type: DataTypes.STRING },
        special_programs_counselor_notes: { type: DataTypes.STRING },

        /***********************
        *
        * Page 7
        *
        ***********************/

        //Additional Info
        learn_find_work: { type: DataTypes.BOOLEAN },
        learn_decide_work_goal: { type: DataTypes.BOOLEAN },
        learn_work_with_disability: { type: DataTypes.BOOLEAN },
        learn_other: { type: DataTypes.BOOLEAN },
        learn_explain: { type: DataTypes.STRING },
        strengths_skills: { type: DataTypes.STRING },
        learn_counselor_notes: { type: DataTypes.STRING },
        interest_type_of_work: { type: DataTypes.STRING },
        part_time: { type: DataTypes.BOOLEAN },
        hours: { type: DataTypes.INTEGER },
        full_time: { type: DataTypes.BOOLEAN },
        part_full_time_not_sure: { type: DataTypes.BOOLEAN },
        current_computer_level: { type: DataTypes.BOOLEAN },
        source_transportation: { type: DataTypes.STRING },
        drivers_license: { type: DataTypes.BOOLEAN },
        car_insurance: { type: DataTypes.BOOLEAN },
        car_insurance_state: { type: DataTypes.STRING },
        //////From previous group, doesn't appear to be on form
        avail_date: { type: DataTypes.DATEONLY },
        expectedwage: { type: DataTypes.FLOAT },
        daysofweek: { type: DataTypes.JSON },
        willworkdays: { type: DataTypes.BOOLEAN },
        willworkswing: { type: DataTypes.BOOLEAN },
        willworknoc: { type: DataTypes.BOOLEAN },
        inside: { type: DataTypes.BOOLEAN },
        outside: { type: DataTypes.BOOLEAN },
        geo_area: { type: DataTypes.STRING },
        no_work_exp: { type: DataTypes.BOOLEAN },
        benefits_prof: { type: DataTypes.BOOLEAN },
        benefits_exp: { type: DataTypes.TEXT },
        other_agency: { type: DataTypes.BOOLEAN },
        ///////


        //Additional Info cont.
        clean_driving_record: { type: DataTypes.BOOLEAN },
        clean_driving_record_explain: { type: DataTypes.STRING },
        crime_conviction: { type: DataTypes.BOOLEAN },
        crime_conviction_explain: { type: DataTypes.STRING },
        misdemeanor: { type: DataTypes.BOOLEAN },
        misdemeanor_exp: { type: DataTypes.TEXT },
        felony: { type: DataTypes.BOOLEAN },
        felony_exp: { type: DataTypes.TEXT },
        on_probation: { type: DataTypes.BOOLEAN },
        probation_officer_name: { type: DataTypes.STRING },
        probation_officer_phone: { type: DataTypes.STRING },
        probation_counselor_notes: { type: DataTypes.STRING },
        other_legal_issues: { type: DataTypes.STRING },
        history_substance_use: { type: DataTypes.BOOLEAN },
        history_substance_use_explain: { type: DataTypes.STRING },
        can_pass_drug_test: { type: DataTypes.BOOLEAN },
        can_pass_drug_test_explain: { type: DataTypes.STRING },
        substance_use_counselor_notes: { type: DataTypes.STRING },

        //Education Info
        high_school_graduate: { type: DataTypes.BOOLEAN },
        highest_grade_completed: { type: DataTypes.STRING },
        special_ed: { type: DataTypes.BOOLEAN },
        iep: { type: DataTypes.BOOLEAN },
        plan_504: { type: DataTypes.BOOLEAN },
        participant_youth_in_transition: { type: DataTypes.BOOLEAN },
        if_yes_school_name: { type: DataTypes.STRING },
        if_yes_school_city: { type: DataTypes.STRING },
        if_yes_school_state: { type: DataTypes.STRING },


        /***********************
        *
        * Page 9
        *
        ***********************/

        //Education Info cont.
        //Uses Education Details Table For schools
        currently_attending_college: { type: DataTypes.BOOLEAN },
        where_college: { type: DataTypes.STRING },
        default_student_loans: { type: DataTypes.BOOLEAN },
        education_counselor_notes: { type: DataTypes.STRING },

        //Medical Information
        head_injury: { type: DataTypes.BOOLEAN },
        head_injury_explain: { type: DataTypes.STRING },
        working_restrictions: { type: DataTypes.BOOLEAN },
        working_counselor_notes: { type: DataTypes.STRING },
        //This should probably be changed to a table of providers 
        //and a table for client/provider relationship
        provider1_name: { type: DataTypes.STRING },
        provider1_phone: { type: DataTypes.STRING },
        provider1_address: { type: DataTypes.STRING },
        provider1_treatment_for: { type: DataTypes.STRING },
        provider1_still_seeing: { type: DataTypes.BOOLEAN },
        provider1_most_recent_visit: { type: DataTypes.STRING },
        provider2_name: { type: DataTypes.STRING },
        provider2_phone: { type: DataTypes.STRING },
        provider2_address: { type: DataTypes.STRING },
        provider2_treatment_for: { type: DataTypes.STRING },
        provider2_still_seeing: { type: DataTypes.BOOLEAN },
        provider2_most_recent_visit: { type: DataTypes.STRING },
        provider3_name: { type: DataTypes.STRING },
        provider3_phone: { type: DataTypes.STRING },
        provider3_address: { type: DataTypes.STRING },
        provider3_treatment_for: { type: DataTypes.STRING },
        provider3_still_seeing: { type: DataTypes.BOOLEAN },
        provider3_most_recent_visit: { type: DataTypes.STRING },
        provider4_name: { type: DataTypes.STRING },
        provider4_phone: { type: DataTypes.STRING },
        provider4_address: { type: DataTypes.STRING },
        provider4_treatment_for: { type: DataTypes.STRING },
        provider4_still_seeing: { type: DataTypes.BOOLEAN },
        provider4_most_recent_visit: { type: DataTypes.STRING },
        provider5_name: { type: DataTypes.STRING },
        provider5_phone: { type: DataTypes.STRING },
        provider5_address: { type: DataTypes.STRING },
        provider5_treatment_for: { type: DataTypes.STRING },
        provider5_still_seeing: { type: DataTypes.BOOLEAN },
        provider5_most_recent_visit: { type: DataTypes.STRING },
        medical_info_counselor_notes: { type: DataTypes.STRING },

        //From previous group, doesn't appear to be used on form
        odl: { type: DataTypes.STRING },
        foodhc: { type: DataTypes.BOOLEAN },
        car_access: { type: DataTypes.BOOLEAN },
        other_transport: { type: DataTypes.TEXT },
        resume: { type: DataTypes.BOOLEAN },
        computer_access: { type: DataTypes.BOOLEAN },
        can_complete_online_app: { type: DataTypes.BOOLEAN },
        can_complete_paper_app: { type: DataTypes.BOOLEAN },
        barriers: { type: DataTypes.TEXT },
        goal: { type: DataTypes.TEXT },
        meeting_venue: { type: DataTypes.TEXT },
        notes: { type: DataTypes.TEXT },
        photo: { type: DataTypes.BLOB },
        profile: { type: DataTypes.TEXT },
        interests: { type: DataTypes.TEXT },
        key_skills: { type: DataTypes.JSON }
    }, {
    classMethods: {
      associate: (models) => {
        Client.hasMany(models.Reference);
        Client.hasMany(models.AlternateContact);
        Client.hasMany(models.EmploymentDetail);
        Client.hasMany(models.EducationDetail);
        Client.belongsTo(models.JobDeveloper, {
          onDelete: 'SET NULL'
        });
        Client.belongsTo(models.Address, {
          onDelete: 'SET NULL'
        });
      },
    },
  });
  return Client;
};
