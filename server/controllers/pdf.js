//const fs = require('fs');
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
    console.log(req.body);
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

        const doc = new PDFDocument()
        filename = 'Test.pdf'

        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
        res.setHeader('Content-type', 'application/pdf')
        //Creates Header with Name, Phone Number, and Email
        doc.moveTo(300,10)
        doc.fontSize(25)
        doc.text (client.first_name + " " + client.last_name, {
          width: 412,
          align: 'center',
          indent: 30,
          ellipsis: true
        })

        doc.moveDown(0.1)
        doc.fontSize(9)
        doc.text (client.phone ,{
          width: 412,
          align: 'center',
          indent: 30,
          ellipsis: true
        })

        doc.moveDown(0.1)
        doc.fontSize(9)
        doc.text (client.email ,{
          width: 412,
          align: 'center',
          indent: 30,
          ellipsis: true
        })

        doc.lineCap('round')
          .moveTo(50, 125)
          .lineTo(570, 125)
          .stroke()




        try{
          let skills = JSON.parse(client.key_skills)
          if(skills != null){
            doc.moveDown(0.3)
            doc.fontSize(12)
            doc.text ("Key Skills", {
              width: 412,
              align: 'left',
              ellipsis: true
            })
            doc.moveDown(0.1)
            doc.lineCap('round')
            .moveTo(70, doc.y)
            .lineTo(120, doc.y)
            .stroke()
            doc.moveDown(0.1)
            console.log(skills.length);
            for (var i = 0; i < skills.length; i++) {
              //console.log(skills[i]['key_skill'])
              doc.moveDown(0.1)
              doc.fontSize(9)
              doc.text (skills[i]['key_skill'] ,{
                width: 412,
                align: 'left',
                ellipsis: true
              })
            }
          }
        }catch(ex){
          console.log(ex)
        }

        try{
          let exp = client.EmploymentDetails
          if(exp != null){
            doc.moveDown(0.3)
            doc.fontSize(12)
            doc.text ("Employment Details", {
              width: 412,
              align: 'left',
              ellipsis: true
            })
            doc.moveDown(0.1)
            doc.lineCap('round')
            .moveTo(70, doc.y)
            .lineTo(180, doc.y)
            .stroke()
            doc.moveDown(0.1)
            console.log(exp.length)
            for(var i = 0; i < exp.length; i++){
              var job = exp[i]
              console.log(job)
              doc.moveDown(0.1)
              doc.fontSize(9)
              doc.text (job.organization + " - " + job.location + " - " + job.job_title ,{
                width: 412,
                align: 'left',
                ellipsis: true
              })
              doc.moveDown(0.1)
              doc.fontSize(9)
              doc.text (job.description ,{
                width: 412,
                align: 'left',
                ellipsis: true
              })
            }
          }
        }catch(ex){
          console.log(ex)
        }


        try{
          let edu = client.EducationDetails
          if(edu != null){
            doc.moveDown(0.3)
            doc.fontSize(12)
            doc.text ("Education", {
              width: 412,
              align: 'left',
              ellipsis: true
            })
            doc.moveDown(0.1)
            doc.lineCap('round')
            .moveTo(70, doc.y)
            .lineTo(130, doc.y)
            .stroke()
            doc.moveDown(0.1)
            if (edu){
              console.log(edu.length)
              for(var i = 0; i < edu.length; i++){
                var school = edu[i]
                if(school.high_school){
                  if(school.hs_diploma){
                    doc.moveDown(0.1)
                    doc.fontSize(9)
                    doc.text ("High School Diploma - " + school.name ,{
                      width: 412,
                      align: 'left',
                      ellipsis: true
                    })
                  }
                  else if(school.ged){
                    doc.moveDown(0.1)
                    doc.fontSize(9)
                    doc.text (school.name + " - GED" ,{
                      width: 412,
                      align: 'left',
                      ellipsis: true
                    })
                  }
                  else if(school.college){
                    doc.moveDown(0.1)
                    doc.fontSize(9)
                    doc.text (school.certificate + " - " + school.name ,{
                      width: 412,
                      align: 'left',
                      ellipsis: true
                    })
                  }
                  else if(school.vocational){
                    doc.moveDown(0.1)
                    doc.fontSize(9)
                    doc.text (school.certificate ,{
                      width: 412,
                      align: 'left',
                      ellipsis: true
                    })
                  }
                }
                console.log(school)
              }
            }
          }
        }catch(ex){
          console.log(ex)
        }

        doc.pipe(res)
        doc.end()
        //return res.status(200).send(client);
      })
      .catch(error => res.status(400).send(error));

  }

};
