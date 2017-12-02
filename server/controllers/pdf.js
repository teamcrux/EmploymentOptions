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
                if(school.hs_diploma){
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
                if(school.ged){
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
                  doc.moveDown(0.1)
                  doc.fontSize(9)
                  doc.font('Times-Roman')
                  doc.text ("GED",{
                    width: 412,
                    indent: 10,
                    align: 'left',
                    ellipsis: true
                  })
                }
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
                doc.text (school.certificate ,{
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
        /*
        if(client.military){
          pdfFillerData["Yes_Vet"] = true
        }else{
          pdfFillerData["No_Vet"] = true
        }

        if(client.full_time){
          pdfFillerData["Full_Time"] = true
        }
        if(client.part_time){
          pdfFillerData["Part_Time"] = true
        }
        if(client.hours){
          pdfFillerData["Part_Time_Hrs_Per_Week"] = client.hours.toString()
        }

        if(client.drivers_license){
          pdfFillerData["DL_Yes"] = true
        }else{
          pdfFillerData["DL_No"] = true
        }

        if(client.car_access){
          pdfFillerData["Car"] = true
        }

        if(client.other_transport == "bus"){
          pdfFillerData["Bus"] = true
        }else if(client.other_transport == "bike"){
          pdfFillerData["Bike"] = true
        }else if(client.other_transport == "other"){
          pdfFillerData["Other_10"] = true
        }


        if(client.pass_drug_screen){
          pdfFillerData["Pass_Drug_Test_Yes"] = true
        }else{
          if(client.pass_drug_screen == false){
            pdfFillerData["Pass_Drug_Test_Yes"] = true
          }
        }

        if(client.felony || client.misdemeanor){
          pdfFillerData["fel_mis_Yes"] = true
        }else{
          pdfFillerData["fel_mis_No"] = true
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


        //displays Employment Details(if any)
        let exp = client.EmploymentDetails
        if(exp != null){
          for(var i = 0; i < exp.length; i++){
            var job = exp[i]
            if(i == 0){
              pdfFillerData["Employer 1"] = job.organization
              pdfFillerData["Job duties"] = job.description
              pdfFillerData["Job title"] = job.job_title
              pdfFillerData["Last salarypay rate"] = job.pay
              pdfFillerData["Start date"] = (job.start.getMonth() + 1) + "/" + job.start.getDate() + "/" + job.start.getFullYear()
              pdfFillerData["End date"] = (job.end.getMonth() + 1) + "/" + job.end.getDate() + "/" + job.end.getFullYear()
            }else if(i == 1){
              pdfFillerData["Employer 2"] = job.organization
              pdfFillerData["Job duties_2"] = job.description
              pdfFillerData["Job title_2"] = job.job_title
              pdfFillerData["Last salarypay rate_2"] = job.pay
              pdfFillerData["Start date_2"] = (job.start.getMonth() + 1) + "/" + job.start.getDate() + "/" + job.start.getFullYear()
              pdfFillerData["End date_2"] = (job.end.getMonth() + 1) + "/" + job.end.getDate() + "/" + job.end.getFullYear()
            }else if(i == 2){
              pdfFillerData["Employer 3"] = job.organization
              pdfFillerData["Job duties_3"] = job.description
              pdfFillerData["Job title_3"] = job.job_title
              pdfFillerData["Last salarypay rate_3"] = job.pay
              pdfFillerData["Start date_3"] = (job.start.getMonth() + 1) + "/" + job.start.getDate() + "/" + job.start.getFullYear()
              pdfFillerData["End date_3"] = (job.end.getMonth() + 1) + "/" + job.end.getDate() + "/" + job.end.getFullYear()
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


        //This chunk gets the form field names to programatically fill out pdf
*/
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
