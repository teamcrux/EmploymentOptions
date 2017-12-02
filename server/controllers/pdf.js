const fs = require('fs');
const hummus = require('hummus')
const fillForm = require('./fillform').fillForm
const PDFDigitalForm = require('./pdfparser')
var pdfFiller = require('pdffiller')
const Client = require('../models').Client;
const Address = require('../models').Address;
const AlternateContact = require('../models').AlternateContact;
const EducationDetail = require('../models').EducationDetail;
const EmploymentDetail = require('../models').EmploymentDetail;
const Reference = require('../models').Reference;
const pdf = require('../models').pdf;
const PDFDocument = require('pdfkit');




module.exports = {



  all(req, res) {
    //console.log(req.body);
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
            ////console.log(skills[i]['key_skill'])
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
  /*getForm(req, res) {
    //console.log(req.body);
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
    })
    .then(client => {
       var stream = fs.readStream('/uploads/de1277.pdf');
       stream.pipe(res)
    })
      .catch(error => res.status(400).send(error));
  }*/


  getForm(req, res) {
    //console.log(req.body);
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
        //console.log("HERE1")

        var sourcePDF = "uploads/de1277-1.pdf"

        var data2 = Object()
        data2["Last_Name"] = client.last_name
        data2["First_Name"] = client.first_name
        data2["Phone1_Cell_Box"] = true
        ////console.log("\""+client.phone+"\"")
        data2["Phone1_Number"] = client.phone
        data2["Home_Address"] = client.Address.street_address_one
        data2["Home_City"] = client.Address.city
        data2["Home_State"] = client.Address.state
        data2["Home_ZIP"] = client.Address.zip
        //data["Phone2_Number"] = "help"


         //"Last name" : client.last_name,
         //"First name" : client.first_name,
         //"Middle name" :
         //"Preferred name" :
         //"Previous last name" :
         //"Birthdate" : client.dob.getMonth()+ "/" + client.dob.getDay() + "/" +client.dob.getFullYear(),
         //"Email address" : client.email,
         //"Phone number cell land other" : client.phone,
         //"undefined" :
         //"undefined_2" :
         //"undefined_3" :
         //"Second phone number cell land other" :
         //"undefined_4" :
         //"undefined_5" :
         //"undefined_6" :
         //"City" : client.Address.city,
         //"State" : client.Address.state,
         //"County" :
         //"ZIP code" :
         //"Mailing address if different than above home address" :
         //"City_2" :
         //"State_2" :
         //"American Indian or Alaskan Native" :
         //"Asian" :
         //"Black or African American" :
         //"Hispanic or Latino" :
         //"Native Hawaiian or other Pacific Islander" :
         //"White" :
         //"Other specify" :
         //"English" :
         //"Spanish" :
         //"Other" :
         //"Counselor notes" :
         //"Have you been a prior client of Vocational Rehabilitation" :
         //"Are you a US citizen" :
         //"Name" :
         //"Relationship" :
         //"Phone number" :
         //"Name_2" :
         //"Relationship_2" :
         //"Phone number_2" :
         //"Counselor notes_2" :
         //"Community residentialgroup home" :
         //"Halfway house transition living" :
         //"Homelessshelter" :
         //"Live with parents" :
         //"Private residence independent" :
         //"Never" :
         //"Married" :
         //"Divorced" :
         //"Separated" :
         //"Widowed" :
         //"Domestic partner" :
         //"Self only" :
         //"Selfpartner andor children" :
         //"Parents" :
         //"Other_2" :
         //"Workers compensation" :
         //"Veterans" : client.military
         //"Personal income" :
         //"Other_3" :
         //"Counselor notes_3" :
         //"Medicaid" :
         //"Medicare" :
         //"OHP Oregon Health Plan" :
         //"Private insurance other" :
         //"Private insurance own employer" :
         //"Public insurance other" :
         //"Workers compensation_2" :
         //"None" :
         //"Counselor notes_4" :
         //"Are you currently employed" :
         //"Hours per week" :
         //"Hourly wage" :
         //"Are you a migrant or seasonal farm worker" :
         //"Did you have any difficulties with these duties because of your disability" :
         //"Employer 3" :
         //"Job title_3" :
         //"Job duties_3" :
         //"Did you have any difficulties with these duties because of your disability_3" :
         //"Start date_3" :
         //"End date_3" :
         //"Last salarypay rate_3" :
         //"undefined_12" :
         //"undefined_13" :
         //"Terminated_3" :
         //"Laid off_3" :
         //"Quit_3" :
         //"Relocatedmoved_3" :
         //"Other_6" :
         //"Employer 4" :
         //"Job title_4" :
         //"Job duties_4" :
         //"Did you have any difficulties with these duties because of your disability_4" :
         //"Start date_4" :
         //"End date_4" :
         //"Last salarypay rate_4" :
         //"undefined_14" :
         //"undefined_15" :
         //"Terminated_4" :
         //"Laid off_4" :
         //"Quit_4" :
         //"Relocatedmoved_4" :
         //"Other_7" :
         //"Employer 5" :
         //"Job title_5" :
         //"Job duties_5" :
         //"Did you have any difficulties with these duties because of your disability_5" :
         //"Start date_5" :
         //"End date_5" :
         //"Last salarypay rate_5" :
         //"undefined_16" :
         //"undefined_17" :
         //"Terminated_5" :
         //"Laid off_5" :
         //"Quit_5" :
         //"Relocatedmoved_5" :
         //"Other_8" :
         //"Counselor notes_5" :
         //"Are you a veteran" :
         //"Are you receiving services from Veteran Affairs Vocational Rehabilitation" :
         //"Are you a preferred worker in Oregon" :
         //"Year of onset1" :
         //"How it affects me1" :
         //"Year of onset2" :
         //"How it affects me2" :
         //"Year of onset3" :
         //"Year of onset4" :
         //"Year of onset5" :
         //"Purpose1" :
         //"Purpose2" :
         //"Purpose3" :
         //"Purpose4" :
         //"Purpose5" :
         //"Counselor notes_6" :
         //"Adult Education and Literacy Programs" :
         //"Adult ParoleProbation" :
         //"Alcohol and Drug" :
         //"Alcohol and Drug  Youth" :
         //"American Indian VR Services Program" :
         //"Career Workforce Skills Training" :
         //"Center for Independent Living" :
         //"Child Protective Services" :
         //"Community Rehabilitation Program" :
         //"Consumer Organization or Advocacy Group" :
         //"DD Brokerage" :
         //"DD County Case Management" :
         //"DOL Employment and Training" :
         //"Educational Institution" :
         //"Educational Institution postsecondary" :
         //"Employed Persons with Disability" :
         //"Employer" :
         //"Employment Network not otherwise listed" :
         //"Employment Transition Services" :
         //"Experience Works" :
         //"Federal Student Aid pell grant SEOG" :
         //"General assistance" :
         //"Independent Living Services" :
         //"Intellectual and Developmental" :
         //"Juvenile ParoleProbation" :
         //"Latino ConnectionEaster Seals" :
         //"OneStop EmploymentTraining Center" :
         //"Other State Agency" :
         //"Other VR State Agency" :
         //"Public Housing Authority" :
         //"School  not Youth Transition Program YTP" :
         //"Schools Youth Transition Program" :
         //"Seasonal Farm Workers SFW" :
         //"SSA Disability Determination Service or" :
         //"State Department of Correction" :
         //"State Employment Service Agency" :
         //"Supported Employment" :
         //"Temp Assistance to Needy Families TANF" :
         //"Veterans Administration" :
         //"Welfare Agency state or local government" :
         //"Work Readiness Workshops" :
         //"Workers Compensation" :
         //"Workers Compensation special fund" :
         //"None_2" :
         //"Name of agencyRow1" :
         //"Contact personRow1" :
         //"Phone numberRow1" :
         //"Name of agencyRow2" :
         //"Contact personRow2" :
         //"Phone numberRow2" :
         //"Name of agencyRow3" :
         //"Contact personRow3" :
         //"Phone numberRow3" :
         //"Name of agencyRow4" :
         //"Contact personRow4" :
         //"Phone numberRow4" :
         //"Counselor notes counselor see application section page two for benefits information" :
         //"Learn how to look for and find work" :
         //"Learn how to work with my disability" :
         //"Help to decide a work goal" :
         //"Other_9" :
         //"Counselor notes_7" :
         //"What types of work are you interested in doing" :
         //"undefined_19" :
         //"undefined_20" :
         //"undefined_21" :
         //"undefined_22" :
         //"If yes what state" :
         //"Do you have a clean driving record Yes No If no please explain" :
         //"Do you have a clean driving record" :
         //"Have you ever been arrested or convicted of a felony or a misdemeanor Yes No If yes please explain" :
         //"Are you currently on supervision of any type" :
         //"Name_3" :
         //"Phone" :
         //"Counselor notes_8" :
         //"Do you have any other current legal issuesproblems specify" :
         //"Do you have any history of substance use or abuse Yes No If yes please explain" :
         //"Could you pass a drug test Yes No If no please explain" :
         //"Counselor notes_9" :
         //"Are you a high school graduate or do you have a GED" :
         //"School nameRow1" :
         //"Begin dateRow1" :
         //"End dateRow1" :
         //"Degreecertification or area of studyRow1" :
         //"School nameRow2" :
         //"Begin dateRow2" :
         //"End dateRow2" :
         //"Degreecertification or area of studyRow2" :
         //"School nameRow3" :
         //"Begin dateRow3" :
         //"End dateRow3" :
         //"Degreecertification or area of studyRow3" :
         //"School nameRow4" :
         //"Begin dateRow4" :
         //"End dateRow4" :
         //"Degreecertification or area of studyRow4" :
         //"Are you currently attending college" :
         //"Are you currently in default on any prior student loans" :
         //"Counselor notes_10" :
         //"Have you ever had a head injury or been knocked unconscious" :
         //"If yes please explain" :
         //"Do you have any restrictions from your doctor about working" :
         //"Counselor notes_11" :
         //"Medical providers Vocational Rehabilitation VR will need your help to get your medical records We need them to document your medical conditions identify your limitations determine if you are eligible for our program plan work goals and identify services you may need to help you get or keep a job If there is not enough space list additional providers on a separate piece of paper Please list all doctors clinics counselors or therapists you have seen in the past or are seeing now for treatment related to your disability Include any physical exams andor learning disability testingRow1" :
         //"Are you still seeing this provider" :
         //"Are you still seeing this provider_3" :
         //"Are you still seeing this provider_4" :
         //"Medical providerclinic name_5" :
         //"Are you still seeing this provider_5" :
         //"Counselor notes_12" :
         //"Home address" :
         //"RESIDENCY DATE" :
         //"Gender" :
         //"SSN2" :
         //"SSN1" :
         //"SSN3" :
         //"ZIP code_2" :
         //"other race" :
         //"other language" :
         //"prior client" :
         //"other members" :
         //"referral" :
         //"SSDI" :
         //"TANF" :
         //"SNAP" :
         //"subtotal" :
         //"program" :
         //"SSI" :
         //"WC amount" :
         //"Veterans amount" :
         //"PI amount" :
         //"other amount" :
         //"Total" :
         //"salary" :
         //"difficulties3" :
         //"reason for leaving 3" :
         //"difficulties4" :
         //"difficulties5" :
         //"reason for leaving 5" :
         //"state" :
         //"reason for leaving 4" :
         //"Medication1" :
         //"Medication2" :
         //"Medication3" :
         //"Medication4" :
         //"Medication5" :
         //"explain services" :
         //"grade" :
         //"school name" :
         //"school city" :
         //"school state" :
         //"attend college" :
         //"Medical providerclinic name1" :
         //"Phone number_3" :
         //"treatment1" :
         //"recent visit" :
         //"Are you still seeing this provider2" :
         //"Medical providerclinic name2" :
         //"Address2" :
         //"treatment2" :
         //"Medical providerclinic name3" :
         //"Address3" :
         //"Medical providerclinic name4" :
         //"Address4" :
         //"treatment3" :
         //"treatment4" :
         //"recent visit4" :
         //"work_permit" :
         //"undefined_8" :
         //"undefined_9" :
         //"Terminated" :
         //"Laid off" :
         //"Quit" :
         //"Relocatedmoved" :
         //"Other_4" :
         //"reason for leaving" :
         //"difficulties1" :
         //"Job title_2" :
         //"Other_5" :
         //"Relocatedmoved_2" :
         //"Quit_2" :
         //"Laid off_2" :
         //"Terminated_2" :
         //"undefined_11" :
         //"Did you have any difficulties with these duties because of your disability_2" :
         //"Job duties_2" :
         //"Start date_2" :
         //"End date_2" :
         //"Last salarypay rate_2" :
         //"undefined_10" :
         //"difficulties2" :
         //"Start date" :
         //"End date" :
         //"Last salarypay rate" :
         //"Job duties" :
         //"reason for leaving 2" :
         //"computer skills" :
         //"Do you possess a valid drivers license" :
         //"Other_10" :
         //"Bike" :
         //"Car" :
         //"bus" :
         //"crime" :
         //"substance_abuse" :
         //"drug_test" :
         //"special_ed" :
         //"IEP" :
         //"504" :
         //"transition" :
         //"Phone number_4" :
         //"Phone number_5" :
         //"Address_5" :
         //"Phone number_6" :
         //"recent visit3" :
         //"Employer 1" :
         //"Job title" :
         //"Employer 2" :
         //"undefined_18" :
         //"injured_service" :
         //"condition 1" :
         //"condition 2" :
         //"condition 3" :
         //"condition 4" :
         //"condition 5" :
         //"How it affects me5" :
         //"How it affects me3" :
         //"How it affects me4" :
         //"strengths" :
         //"INSURANCE_2" :
         //"Address1" :
         //"Button1" :
         //"Button3" :
         //"Phone number_7" :
         //"recent visit2" :
         //"recent visit1" :
         //"treatment5" :
         //"Medical Health Provider public or private" :
         //"Mental Health Provider public or private" :



        //};

        ////console.log(data)
        //console.log()


        var destinationPDF =  "uploads/test_complete.pdf";
        pdfParser = hummus.createReader(sourcePDF),
				digitalForm = new PDFDigitalForm(pdfParser);
        if(digitalForm.hasForm()) {
          digitalForm.fields.forEach(function(field) {
              //console.log("\"" + field.name + "\" : ")
          });
        }

        //console.log("HERE3")


        var writer = hummus.createWriterToModify(sourcePDF, {
       			modifiedFilePath: destinationPDF
       		});


        fillForm(writer,data2);
        writer.end();
        //console.log("HERE2")
        fs.createReadStream(destinationPDF).pipe(res)

      })
      .catch(error => res.status(400).send(error));

  }

};
