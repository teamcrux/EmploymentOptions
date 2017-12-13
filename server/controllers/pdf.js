const fs = require('fs');
const hummus = require('hummus')
const fillForm = require('./fillform').fillForm
const PDFDigitalForm = require('./pdfparser')
const Client = require('../models').Client;
const Address = require('../models').Address;
const AlternateContact = require('../models').AlternateContact;
const EducationDetail = require('../models').EducationDetail;
const EmploymentDetail = require('../models').EmploymentDetail;
const Reference = require('../models').Reference;
const PDFDocument = require('pdfkit');




module.exports = {



  getResume(req, res) {
    //console.log(req.body);
    return Client
    .findOne({
      where: {
        id: req.params.ClientId
      },
      include: [{
        all: true,
        nested: true,
        required: false
      }]
    })
    .then(client => {
        if (!client) {
          return res.status(404).send({
            message: 'Client Not Found'
          });
        }

        filename = client.first_name + "_" + client.last_name + "_Resume"

        res.setHeader('Content-disposition', 'attachment;')
        res.setHeader('filename', filename)
        res.setHeader('Content-type', 'application/pdf')

        //Creates pdf document
        const doc = new PDFDocument()

        //Creates color scheme on edges
        doc.rect(0,0,doc.page.width,20).fillAndStroke('#7c4399')
        doc.rect(0,0,20,doc.page.height).fillAndStroke('black')

        //Creates Header with Name, Address, Email, and Phone #
        doc.fillColor('#7c4399')
        doc.font('Times-Roman')
        doc.fontSize(25)
        doc.fillColor('#7c4399')
        doc.text (client.first_name + " " + client.last_name, 0, 30 ,{
          width: (doc.page.width/2),
          indent: 30,
          align: 'left',
          ellipsis: true
        })

        doc.moveDown(0.1)
        doc.fontSize(9)
        doc.text (client.Address.street_address_one +
                  ", " +  client.Address.city + ", " + client.Address.state,{
          width: (doc.page.width/2),
          indent: 30,
          align: 'left',
          ellipsis: true
        })

        doc.moveDown(0.1)
        doc.fontSize(9)
        doc.text (client.email ,{
          width: (doc.page.width/2),
          indent: 30,
          align: 'left',
          ellipsis: true
        })

        doc.moveDown(0.1)
        doc.fontSize(9)
        doc.text (client.phone ,{
          width: (doc.page.width/2),
          indent: 30,
          align: 'left',
          ellipsis: true
        })


        //Sets Objective
        doc.rect(30, 100, 500, 16).fillAndStroke('#E3E3E3', '#7c4399')
        doc.fillColor('#7c4399')
        doc.moveDown(1)
        doc.fontSize(12)
        doc.text ("Objective", 35, (doc.y + 1) ,{
          width: (doc.page.width/2),
          align: 'left',
          ellipsis: true
        })

        doc.moveDown(0.5)
        doc.fillColor('black')
        doc.fontSize(10)
        doc.text (client.goal, 35, (doc.y + 1) ,{
          width: (doc.page.width/2),
          indent: 5,
          align: 'left',
          ellipsis: true
        })


        //displays Key Skills(if any)
        let skills = JSON.parse(client.key_skills)
        if(skills != null){

          doc.moveDown(0.5)
          doc.rect(30, doc.y - 2, 500, 16).fillAndStroke('#E3E3E3', '#7c4399')
          doc.fillColor('#7c4399')
          doc.fontSize(12)
          doc.text ("Key Skills", 35, (doc.y + 1) ,{
            width: (doc.page.width/2),
            align: 'left',
            ellipsis: true
          })
          doc.moveDown(0.5)
          doc.fillColor('black')

          //console.log(skills.length);
          for (var i = 0; i < skills.length; i++) {
            //console.log(skills[i]['key_skill'])
            doc.moveDown(0.1)
            doc.fontSize(9)
            doc.text (skills[i]['key_skill'] ,{
              width: 412,
              indent: 5,
              align: 'left',
              ellipsis: true
            })
          }
        }

        //displays Employment Details(if any)
        let exp = client.EmploymentDetails
        if(exp != null){
          doc.moveDown(0.5)
          doc.rect(30, doc.y - 2, 500, 16).fillAndStroke('#E3E3E3', '#7c4399')
          doc.fillColor('#7c4399')
          doc.fontSize(12)
          doc.text ("Employment", 35, (doc.y + 1) ,{
            width: (doc.page.width/2),
            align: 'left',
            ellipsis: true
          })

          doc.moveDown(0.5)
          //console.log(exp.length)
          for(var i = 0; i < exp.length; i++){
            if(i != 0){
              doc.moveDown(1.5)
            }
            doc.fillColor('#7c4399')
            var job = exp[i]
            //console.log(job)
            doc.moveDown(0.1)
            doc.fontSize(11)
            doc.font('Times-Bold')
            doc.fillColor('#7c4399')
            doc.text (job.organization ,{
              width: doc.page.width - 125,
              indent: 5,
              align: 'left',
              continued: true
            })
            .fillColor('black')
            .font('Times-Italic')
            .text(job.location,{
              align: 'right'
            })
            doc.font('Times-Roman')
            doc.moveDown(0.2)
            monthNum = job.start.getMonth()
            switch (monthNum) {
              case 0:
                month = "January"
                break;
              case 1:
                month = "February"
                break
              case 2:
                month = "March"
                break
              case 3:
                month = "April"
                break
              case 4:
                month = "May"
                break
              case 5:
                month = "June"
                break;
              case 6:
                month = "July"
                break
              case 7:
                month = "August"
                break
              case 8:
                month = "September"
                break
              case 9:
                month = "October"
                break;
              case 10:
                month = "November"
                break
              default:
                month = "December"

            }
            monthNum2 = job.end.getMonth()
            switch (monthNum2) {
              case 0:
                Emonth = "January"
                break;
              case 1:
                Emonth = "February"
                break
              case 2:
                Emonth = "March"
                break
              case 3:
                Emonth = "April"
                break
              case 4:
                Emonth = "May"
                break
              case 5:
                Emonth = "June"
                break;
              case 6:
                Emonth = "July"
                break
              case 7:
                Emonth = "August"
                break
              case 8:
                Emonth = "September"
                break
              case 9:
                Emonth = "October"
                break;
              case 10:
                Emonth = "November"
                break
              default:
                Emonth = "December"

            }
            doc.text (job.job_title ,{
              width: doc.page.width - 125,
              indent: 5,
              align: 'left',
              continued: true
            })
            .fillColor('black')
            .font('Times-Italic')
            .text(month + " " + job.start.getFullYear() + " - " + Emonth + " " + job.end.getFullYear(),{
              align: 'right'
            })
            doc.moveDown(1)
            doc.fontSize(9)
            doc.fillColor('black')
            doc.text (job.description ,{
              width: doc.page.width - 125,
              indent: 20,
              align: 'left',
              ellipsis: true
            })
          }
        }

        //Displays Education Details (if any)
        let edu = client.EducationDetails
        if(edu != null){
          doc.moveDown(0.5)
          doc.rect(30, doc.y - 2, 500, 16).fillAndStroke('#E3E3E3', '#7c4399')
          doc.fillColor('#7c4399')
          doc.fontSize(12)
          doc.font('Times-Roman')
          doc.text ("Education", 35, (doc.y + 1) ,{
            width: (doc.page.width/2),
            align: 'left',
            ellipsis: true
          })
          doc.fillColor('black')
          doc.moveDown(0.5)
          if (edu){
            //console.log(edu.length)
            for(var i = 0; i < edu.length; i++){
              doc.moveDown(0.5)
              var school = edu[i]
              if(school.high_school){
                  doc.moveDown(0.1)
                  doc.fontSize(11)
                  doc.font('Times-Bold')
                  doc.fillColor('#7c4399')
                  doc.text (school.name,{
                    width: 412,
                    indent: 5,
                    align: 'left',
                    ellipsis: true
                  })

                  doc.fillColor('black')
                  doc.moveDown(0.1)
                  doc.fontSize(9)
                  doc.font('Times-Roman')
                  doc.text ("Diploma",{
                    width: 412,
                    indent: 10,
                    align: 'left',
                    ellipsis: true
                  })
              }
              if(school.college){
                doc.moveDown(0.1)
                doc.fontSize(11)
                doc.fillColor('#7c4399')
                doc.font('Times-Bold')
                doc.text (school.name ,{
                  width: 412,
                  indent: 5,
                  align: 'left',
                  ellipsis: true
                })

                doc.fillColor('black')
                doc.font('Times-Roman')
                doc.text (school.diploma_type ,{
                  width: 412,
                  indent: 10,
                  align: 'left',
                  ellipsis: true
                })
              }
              if(school.vocational){
                doc.moveDown(0.1)
                doc.fontSize(9)
                doc.fillColor('#7c4399')
                doc.text (school.certificate ,{
                  width: 412,
                  align: 'left',
                  ellipsis: true
                })
              }
              //console.log(school)
            }
          }
        }

        let ref = client.Reference
        if(ref != null){
          doc.moveDown(0.5)
          doc.rect(30, doc.y - 2, 500, 16).fillAndStroke('#E3E3E3', '#7c4399')
          doc.fillColor('#7c4399')
          doc.fontSize(12)
          doc.font('Times-Roman')
          doc.text ("References", 35, (doc.y + 1) ,{
            width: (doc.page.width/2),
            align: 'left',
            ellipsis: true
          })
          doc.fillColor('black')
          doc.moveDown(0.5)
          doc.text(ref.name)
        }

        doc.pipe(res)
        doc.end()
        //return res.status(200).send(client);
      })
      .catch(error => res.status(400).send(error));

  },


  getForm(req, res) {
    //console.log(req.body);
    return Client
    .findOne({
      where: {
        id: req.params.ClientId
      },
      include: [{
        all: true,
        nested: true,
        required: false
      }]
    })
    .then(client => {
        if (!client) {
          return res.status(404).send({
            message: 'Client Not Found'
          });
        }

        filename = client.first_name + "_" + client.last_name + "_de1277"

        res.setHeader('Content-disposition', 'attachment;')
        res.setHeader('filename', filename)
        res.setHeader('Content-type', 'application/pdf')


        //populates data object to pass to fillform() to allow it to fill
        //out proper fields in the pdf
        var sourcePDF = "uploads/de1277.pdf"
        var pdfFillerData = Object()

        /**********************************************
        *
        * Page 1
        *
        **********************************************/

        pdfFillerData["Last_Name"] = client.last_name
        pdfFillerData["First_Name"] = client.first_name
        pdfFillerData["Middle_Name"] = client.middle_name
        pdfFillerData["Preferred_Name"] = client.preferred_name
        pdfFillerData["Previous_Last_Name"] = client.previous_last_name
        pdfFillerData["Email"] = client.email
        pdfFillerData["Birthdate"] = (client.dob.getMonth() + 1) + "/" + client.dob.getDate() + "/" + client.dob.getFullYear()
        var num = client.ssn
        var digits = [];
        while (num > 0) {
            digits[digits.length] = num % 10;
            num = parseInt(num / 10);
        }
        digits.reverse();
        pdfFillerData["SSN1"] = "" + digits[0] + digits[1] + digits[2]
        pdfFillerData["SSN2"] = "" + digits[3] + digits[4]
        pdfFillerData["SSN3"] = "" + digits[5] + digits[6] + digits[7]

        pdfFillerData["Phone1_Number"] = client.phone
        pdfFillerData["Phone1_Cell_Box"] = false
        pdfFillerData["Phone1_Land_Box"] = false
        pdfFillerData["Phone1_Other_Box"] = false

        //need to use client.phone_type
        //need to use client.phone2_type
        /*
        pdfFillerData["Phone2_Cell_Box"] =
        pdfFillerData["Phone2_Land_Box"] =
        pdfFillerData["Phone2_Other_Box"] =
        */

        pdfFillerData["Home_Address"] = client.Address.street_address_one
        //pdfFillerData["Home_Address_Begin_Date"] =
        pdfFillerData["Home_City"] = client.Address.city
        pdfFillerData["Home_State"] = client.Address.state
        //pdfFillerData["Home_County"] =
        pdfFillerData["Home_ZIP"] = client.Address.zip
        //pdfFillerData["Mailing_Address"] =
        //pdfFillerData["Mailing_City"] =
        //pdfFillerData["Mailing_State"] =
        //pdfFillerData["Mailing_ZIP"] =
        if(client.race == "white"){
          pdfFillerData["Race_White"] = true
        } else if(client.race == "asian"){
          pdfFillerData["Race_Asian"] = true
        } else if(client.race == "hispanic" || client.race == "latino"){
          pdfFillerData["Race_Hispanic or Latino"] = true
        } else if(client.race == "Hawaiian" || client.race == "pacific islander"){
          pdfFillerData["Race_Native Hawaiian or other Pacific Islander"] = true
        } else if(client.race == "black" || client.race == "african american"){
          pdfFillerData["Race_Black or African American"] = true
        } else {
          pdfFillerData["Race_Other specify"] = true
          pdfFillerData["Race_other race_Text_Box"] = client.race
        }

        if(client.primary_language == "English"){
          pdfFillerData["Language_English"] = true
        } else if(client.primary_language == "Spanish"){
          pdfFillerData["Language_Spanish"] = true
        } else{
          pdfFillerData["Language_Other"] = true
          pdfFillerData["Language_other language_Text_Box"] = client.primary_language
        }

        pdfFillerData["Counselor_notes_2"] = client.language_counselor_notes
        if(client.prior_client){

        }else{

        }
        /**********************************************
        *
        * Page 2
        *
        **********************************************/
        if(client.us_citizen){
          pdfFillerData["US_Citizen_Yes"] = true
        }else{
          pdfFillerData["US_Citizen_No"] = true
          if(client.work_permit){
            pdfFillerData["Work_Permit_Yes"] = true
          }else{
            pdfFillerData["Work_Permit_No"] = true
          }
        }

        pdfFillerData["Counselor_Notes_2"] = client.contacts_counselor_notes

        if(client.living_situation == "Community residential/group home"){
          pdfFillerData["Community residentialgroup home"] = true
        }else if(client.living_situation == "Halfway house"){
          pdfFillerData["Halfway house transition living"] = true
        }else if(client.living_situation == "Homeless Shelter"){
          pdfFillerData["Homelessshelter"] = true
        }else if(client.living_situation == "Private residence"){
          pdfFillerData["Private residence independent"] = true
        }else if(client.living_situation == "Live with parents"){
          pdfFillerData["Live with parents"] = true
        }

        //pdfFillerData["Contact1_Name"] =
        //pdfFillerData["Contact1_Relationship"] =
        //pdfFillerData["Contact1_Phone_Number"] =
        //pdfFillerData["Contact2_Name"] =
        //pdfFillerData["Contact2_Relationship"] =
        //pdfFillerData["Contact2_Phone_Number"] =
        pdfFillerData["Counselor_Notes_2"] = client.contacts_counselor_notes

        if(client.marital_status == "Never"){
          pdfFillerData["Marital_Status_Never"] = true
        }else if(client.marital_status == "Married"){
          pdfFillerData["Marital_Status_Married"] = true
        }else if(client.marital_status == "Divorced"){
          pdfFillerData["Marital_Status_Divorced"] = true
        }else if(client.marital_status == "Seperated"){
          pdfFillerData["Marital_Status_Seperated"] = true
        }else if(client.marital_status == "Widowed"){
          pdfFillerData["Marital_Status_Widowed"] = true
        }else if(client.marital_status == "Domestic Partner"){
          pdfFillerData["Marital_Status_Domestic_Partner"] = true
        }

        if(client.living_with_you_self_only){
          pdfFillerData["Living_With_Self"] = true
        }
        if(client.living_with_you_partner_children){
          pdfFillerData["Living_With_Partner_Children"] = true
        }
        if(client.living_with_you_parents){
          pdfFillerData["Living_With_Parents"] = true
        }
        if(client.living_with_you_other){
          pdfFillerData["Living_With_Other"] = true
          pdfFillerData["Living_With_Other_Text_Box"] = client.living_with_you_other_explain
        }

        pdfFillerData["Referral_Person"] = client.who_reffered_you

        pdfFillerData["SSI"] = client.income_SSI
        pdfFillerData["SSDI"] = client.income_SSDI
        pdfFillerData["TANF"] = client.income_TANF
        pdfFillerData["SNAP"] = client.income_SNAP
        pdfFillerData["subtotal"] = client.income_subtotal

        pdfFillerData["Workers_Comp_Source"] = client.income_workers_comp_source
        pdfFillerData["Workers_Comp_Veteran"] = client.income_veterans_source
        pdfFillerData["Workers_Comp_Program"] = client.income_veterans_progam
        pdfFillerData["Personal_Income_Source"] = client.income_personal_source
        pdfFillerData["Other_Source"] = client.income_other_source
        pdfFillerData["Income_Workers_Comp"] = client.income_workers_comp_amount
        pdfFillerData["Income_Veteran"] = client.income_veterans_amount
        pdfFillerData["Income_Personal"] = client.income_personal_amount
        pdfFillerData["Income_Other"] = client.income_other_amount
        pdfFillerData["Income_Total"] = client.income_total
        pdfFillerData["Counselor_Notes_3"] = client.income_counselor_notes

        /**********************************************
        *
        * Page 3/4
        *
        **********************************************/
        pdfFillerData["Insurance_Medicaid"] = client.insurance_medicaid
        pdfFillerData["Insurance_Private_Other"] = client.insurance_private_other
        pdfFillerData["Insurance_Workers_Comp"] = client.insurance_workers_comp
        pdfFillerData["Insurance_Medicare"] = client.insurance_medicare
        pdfFillerData["Insurance_Private_Employer"] = client.insurance_private_employer
        pdfFillerData["Insurance_None"] = client.insurance_none
        pdfFillerData["Insurance_OHP"] = client.insurance_OHP
        pdfFillerData["Insurance_Public"] = client.insurance_public
        pdfFillerData["Counselor_Notes_4"] = client.insurance_counselor_notes

        if(client.currently_employed){
          pdfFillerData["Employed_Yes"] = true
        }else{
          pdfFillerData["Employed_No"] = true
        }
        pdfFillerData["Employed_Hours_Per_Week"] = client.current_hours_per_week
        pdfFillerData["Employed_Salary"] = client.current_salary
        pdfFillerData["Employed_Hourly_Wage"] = client.current_hourly_wage
        if(client.current_seasonal_farm_worker){
          pdfFillerData["Migrant_Farmer_Yes"] = true
        } else{
          pdfFillerData["Migrant_Farmer_No"] = true
        }

        //displays Employment Details(if any)
        let exp = client.EmploymentDetails
        if(exp != null){
          for(var i = 0; i < exp.length; i++){
            var job = exp[i]
            if(i == 0){
              pdfFillerData["Employer_1"] = job.organization
              pdfFillerData["Job_Duties_1"] = job.description
              pdfFillerData["Job_Title_1"] = job.job_title
              if(job.difficulties){
                pdfFillerData["Disability_1_Yes"] = true
                pdfFillerData["Difficulties_1_Explanation"] = job.difficulties_explain
              }else if(!job.difficulties){
                pdfFillerData["Disability_1_No"] = true
              }
              pdfFillerData["Job_1_Salary"] = job.pay
              pdfFillerData["Job_1_Start"] = (job.start.getMonth() + 1) + "/" + job.start.getDate() + "/" + job.start.getFullYear()
              pdfFillerData["Job_1_End"] = (job.end.getMonth() + 1) + "/" + job.end.getDate() + "/" + job.end.getFullYear()
              if(job.leaving_reason == "Terminated"){
                pdfFillerData["Reason_For_Leaving_1_Terminated"] = true
              }else if(job.leaving_reason == "Laid Off"){
                pdfFillerData["Reason_For_Leaving_1_Laid_Off"] = true
              }else if(job.leaving_reason == "Quit"){
                pdfFillerData["Reason_For_Leaving_1_Quit"] = true
              }else if(job.leaving_reason == "Relocated"){
                pdfFillerData["Reason_For_Leaving_1_Relocated"] = true
              }else{
                pdfFillerData["Reason_For_Leaving_1_Other"] = true
              }
              pdfFillerData["Job_1_Reason_For_Leaving"] = job.leaving_reason_explain
              if(job.full_time){
                pdfFillerData["Job_1_Full_Time"] = true
              }
              if(job.part_time){
                pdfFillerData["Job_1_Part_Time"] = true
              }
            }else if(i == 1){
              pdfFillerData["Employer_2"] = job.organization
              pdfFillerData["Job_Duties_2"] = job.description
              pdfFillerData["Job_Title_2"] = job.job_title
              if(job.difficulties){
                pdfFillerData["Disability_2_Yes"] = true
                pdfFillerData["Difficulties_2_Explanation"] = job.difficulties_explain
              }else if(!job.difficulties){
                pdfFillerData["Disability_2_No"] = true
              }
              pdfFillerData["Job_2_Salary"] = job.pay
              pdfFillerData["Job_2_Start"] = (job.start.getMonth() + 1) + "/" + job.start.getDate() + "/" + job.start.getFullYear()
              pdfFillerData["Job_2_End"] = (job.end.getMonth() + 1) + "/" + job.end.getDate() + "/" + job.end.getFullYear()
              if(job.leaving_reason == "Terminated"){
                pdfFillerData["Reason_For_Leaving_2_Terminated"] = true
              }else if(job.leaving_reason == "Laid Off"){
                pdfFillerData["Reason_For_Leaving_2_Laid_Off"] = true
              }else if(job.leaving_reason == "Quit"){
                pdfFillerData["Reason_For_Leaving_2_Quit"] = true
              }else if(job.leaving_reason == "Relocated"){
                pdfFillerData["Reason_For_Leaving_2_Relocated"] = true
              }else{
                pdfFillerData["Reason_For_Leaving_2_Other"] = true
              }
              pdfFillerData["Job_2_Reason_For_Leaving"] = job.leaving_reason_explain
              if(job.full_time){
                pdfFillerData["Job_2_Full_Time"] = true
              }
              if(job.part_time){
                pdfFillerData["Job_2_Part_Time"] = true
              }
            }else if(i == 2){
              pdfFillerData["Employer_3"] = job.organization
              pdfFillerData["Job_Duties_3"] = job.description
              pdfFillerData["Job_Title_3"] = job.job_title
              if(job.difficulties){
                pdfFillerData["Disability_3_Yes"] = true
                pdfFillerData["Difficulties_3_Explanation"] = job.difficulties_explain
              }else if(!job.difficulties){
                pdfFillerData["Disability_3_No"] = true
              }
              pdfFillerData["Job_3_Salary"] = job.pay
              pdfFillerData["Job_3_Start"] = (job.start.getMonth() + 1) + "/" + job.start.getDate() + "/" + job.start.getFullYear()
              pdfFillerData["Job_3_End"] = (job.end.getMonth() + 1) + "/" + job.end.getDate() + "/" + job.end.getFullYear()
              if(job.leaving_reason == "Terminated"){
                pdfFillerData["Reason_For_Leaving_3_Terminated"] = true
              }else if(job.leaving_reason == "Laid Off"){
                pdfFillerData["Reason_For_Leaving_3_Laid_Off"] = true
              }else if(job.leaving_reason == "Quit"){
                pdfFillerData["Reason_For_Leaving_3_Quit"] = true
              }else if(job.leaving_reason == "Relocated"){
                pdfFillerData["Reason_For_Leaving_3_Relocated"] = true
              }else{
                pdfFillerData["Reason_For_Leaving_3_Other"] = true
              }
              pdfFillerData["Job_3_Reason_For_Leaving"] = job.leaving_reason_explain
              if(job.full_time){
                pdfFillerData["Job_3_Full_Time"] = true
              }
              if(job.part_time){
                pdfFillerData["Job_3_Part_Time"] = true
              }
            }else if(i == 3){
              pdfFillerData["Employer 4"] = job.organization
              pdfFillerData["Job duties_4"] = job.description
              pdfFillerData["Job title_4"] = job.job_title
              pdfFillerData["Last salarypay rate_4"] = job.pay
              pdfFillerData["Start date_4"] = (job.start.getMonth() + 1) + "/" + job.start.getDate() + "/" + job.start.getFullYear()
              pdfFillerData["End date_4"] = (job.end.getMonth() + 1) + "/" + job.end.getDate() + "/" + job.end.getFullYear()
            }else if(i == 4){
              pdfFillerData["Employer 5"] = job.organization
              pdfFillerData["Job duties_5"] = job.description
              pdfFillerData["Job title_5"] = job.job_title
              pdfFillerData["Last salarypay rate_5"] = job.pay
              pdfFillerData["Start date_5"] = (job.start.getMonth() + 1) + "/" + job.start.getDate() + "/" + job.start.getFullYear()
              pdfFillerData["End date_5"] = (job.end.getMonth() + 1) + "/" + job.end.getDate() + "/" + job.end.getFullYear()
            }
          }
        }

        pdfFillerData["Counselor notes_5"] = client.employment_counselor_notes

        /**********************************************
        *
        * Page 5
        *
        **********************************************/

        if(client.military){
          pdfFillerData["Yes_Vet"] = true
          if(client.injured_during_service){
            pdfFillerData["Injured_During_Service_Yes"] = true
          }else{
            pdfFillerData["Injured_During_Service_No"] = true
          }

          if(client.receiving_VAVR_services){
            pdfFillerData["VA_VR_Yes"] = true
          }else{
            pdfFillerData["VA_VR_No"] = true
          }
        }else{
          pdfFillerData["No_Vet"] = true
        }

        if(client.workers_comp_claim == "Yes"){
          pdfFillerData["Workers_Comp_Claim_Yes"] = true
        }else if(client.workers_comp_claim == "No"){
          pdfFillerData["Workers_Comp_Claim_No"] = true
        }else if(client.workers_comp_claim == "Pending"){
          pdfFillerData["Workers_Comp_Claim_Pending"] = true
        }

        pdfFillerData["Worker_Comp_Claim_State"] = client.workers_comp_claim_state

        if(client.oregon_preffered_worker){
          pdfFillerData["Oregon_Preferred_Worker_Yes"] = true
        }else{
          pdfFillerData["Oregon_Preferred_Worker_No"] = true
        }

        pdfFillerData["Disability_Condition_1"] = client.condition1
        pdfFillerData["DC_1_Year"] = client.condition1_year_onset
        pdfFillerData["DC_1_Affect"] = client.condition1_how_affects
        pdfFillerData["Disability_Condition_2"] = client.condition2
        pdfFillerData["DC_2_Year"] = client.condition2_year_onset
        pdfFillerData["DC_2_Affect"] = client.condition2_how_affects
        pdfFillerData["Disability_Condition_3"] =client.condition3
        pdfFillerData["DC_3_Year"] = client.condition3_year_onset
        pdfFillerData["DC_3_Affect"] = client.condition3_how_affects
        pdfFillerData["Disability_Condition_4"] = client.condition4
        pdfFillerData["DC_4_Year"] = client.condition4_year_onset
        pdfFillerData["DC_4_Affect"] =client.condition4_how_affects
        pdfFillerData["DC_5_Affect"] = client.condition5_how_affects
        pdfFillerData["DC_5_Yead"] = client.condition5_year_onset
        pdfFillerData["Disability_Condition_5"] = client.condition5
        pdfFillerData["Counselor_Notes_6"] = client.disability_counselor_notes


        pdfFillerData["Medication1"] = client.medication1
        pdfFillerData["Medication2"] = client.medication2
        pdfFillerData["Medication3"] = client.medication3
        pdfFillerData["Medication4"] = client.medication4
        pdfFillerData["Medication5"] = client.medication5

        pdfFillerData["Purpose1"] = client.medication1_purpose
        pdfFillerData["Purpose2"] = client.medication2_purpose
        pdfFillerData["Purpose3"] = client.medication3_purpose
        pdfFillerData["Purpose4"] = client.medication4_purpose
        pdfFillerData["Purpose5"] = client.medication5_purpose

        /**********************************************
        *
        * Page 8/9
        *
        **********************************************/

        if(client.high_school_graduate){
          pdfFillerData["HS_Yes"] = true
        }else{
          pdfFillerData["grade"] = client.highest_grade_completed
        }
        //currently 4 education rows so will only accept 4 education data points
        edu = client.EducationDetails
        if (edu){
          for(var i = 0; i < edu.length; i++){
            var school = edu[i]
            if(school.high_school){
              if(school.hs_diploma){
                if(i == 0){
                  pdfFillerData["School nameRow1"] = school.name
                  pdfFillerData["Degreecertification or area of studyRow1"] = "Diploma"
                }else if(i == 1){
                  pdfFillerData["School nameRow2"] = school.name
                  pdfFillerData["Degreecertification or area of studyRow2"] = "Diploma"
                }else if(i == 2){
                  pdfFillerData["School nameRow3"] = school.name
                  pdfFillerData["Degreecertification or area of studyRow3"] = "Diploma"
                }else if(i == 3){
                  pdfFillerData["School nameRow4"] = school.name
                  pdfFillerData["Degreecertification or area of studyRow4"] = "Diploma"
                }
              }
              if(school.ged){
                if(i == 0){
                  pdfFillerData["School nameRow1"] = school.name
                  pdfFillerData["Degreecertification or area of studyRow1"] = "GED"
                }else if(i == 1){
                  pdfFillerData["School nameRow2"] = school.name
                  pdfFillerData["Degreecertification or area of studyRow2"] = "GED"
                }else if(i == 2){
                  pdfFillerData["School nameRow3"] = school.name
                  pdfFillerData["Degreecertification or area of studyRow3"] = "GED"
                }else if(i == 3){
                  pdfFillerData["School nameRow4"] = school.name
                  pdfFillerData["Degreecertification or area of studyRow4"] = "GED"
                }
              }
            }
            if(school.college){
              if(i == 0){
                pdfFillerData["School nameRow1"] = school.name
                pdfFillerData["Degreecertification or area of studyRow1"] = school.certificate
              }else if(i == 1){
                pdfFillerData["School nameRow2"] = school.name
                pdfFillerData["Degreecertification or area of studyRow2"] = school.certificate
              }else if(i == 2){
                pdfFillerData["School nameRow3"] = school.name
                pdfFillerData["Degreecertification or area of studyRow3"] = school.certificate
              }else if(i == 3){
                pdfFillerData["School nameRow4"] = school.name
                pdfFillerData["Degreecertification or area of studyRow4"] = school.certificate
              }
            }
            if(school.vocational){
              if(i == 0){
                pdfFillerData["School nameRow1"] = school.name
                pdfFillerData["Degreecertification or area of studyRow1"] = school.certificate
              }else if(i == 1){
                pdfFillerData["School nameRow2"] = school.name
                pdfFillerData["Degreecertification or area of studyRow2"] = school.certificate
              }else if(i == 2){
                pdfFillerData["School nameRow3"] = school.name
                pdfFillerData["Degreecertification or area of studyRow3"] = school.certificate
              }else if(i == 3){
                pdfFillerData["School nameRow4"] = school.name
                pdfFillerData["Degreecertification or area of studyRow4"] = school.certificate
              }
            }
          }
        }





        //This chunk gets the form field names to programatically fill out pdf
        var destinationPDF =  "uploads/test_complete.pdf";

        pdfParser = hummus.createReader(sourcePDF),
				digitalForm = new PDFDigitalForm(pdfParser);
        if(digitalForm.hasForm()) {
          digitalForm.fields.forEach(function(field) {

              console.log("pdfFillerData[\"" + field.name + "\"] = ")
          });
        }
        //console.log("HELPs")


        //fills out pdf form
        var writer = hummus.createWriterToModify(sourcePDF, {
       			modifiedFilePath: destinationPDF
       		});
      //  var writer = hummus.createWriter(new hummus.PDFStreamForResponse(res))
        fillForm(writer,pdfFillerData);
        writer.end();
        fs.createReadStream(destinationPDF).pipe(res)

      })
      .catch(error => res.status(400).send(error));

  }

};
