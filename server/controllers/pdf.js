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

          console.log(skills.length);
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
          console.log(exp.length)
          for(var i = 0; i < exp.length; i++){
            if(i != 0){
              doc.moveDown(1.5)
            }
            doc.fillColor('#7c4399')
            var job = exp[i]
            console.log(job)
            doc.moveDown(0.1)
            doc.fontSize(11)
            doc.font('Times-Bold')
            doc.fillColor('#7c4399')
            doc.text (job.organization ,{
              width: doc.page.width - 150,
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
            doc.text (job.job_title ,{
              width: 412,
              indent: 5,
              align: 'left',
              continued: true
            })
            .fillColor('black')
            .font('Times-Italic')
            .text(job.start+ " - "+ job.end,{
              align: 'right'
            })
            doc.moveDown(1)
            doc.fontSize(9)
            doc.fillColor('black')
            doc.text (job.description ,{
              width: 412,
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
          doc.text ("Education", 35, (doc.y + 1) ,{
            width: (doc.page.width/2),
            align: 'left',
            ellipsis: true
          })
          doc.fillColor('black')
          doc.moveDown(0.5)
          if (edu){
            console.log(edu.length)
            for(var i = 0; i < edu.length; i++){
              doc.moveDown(0.5)
              var school = edu[i]
              if(school.high_school){
                if(school.hs_diploma){
                  doc.moveDown(0.1)
                  doc.fontSize(9)
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
                  doc.text ("Diploma",{
                    width: 412,
                    indent: 10,
                    align: 'left',
                    ellipsis: true
                  })
                }
                if(school.ged){
                  doc.moveDown(0.1)
                  doc.fontSize(9)
                  doc.fillColor('#7c4399')
                  doc.text (school.name ,{
                    width: 412,
                    indent: 5,
                    align: 'left',
                    ellipsis: true
                  })

                  doc.fillColor('black')
                  doc.moveDown(0.1)
                  doc.fontSize(9)
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
                doc.fontSize(9)
                doc.fillColor('#7c4399')
                doc.text (school.name ,{
                  width: 412,
                  indent: 5,
                  align: 'left',
                  ellipsis: true
                })

                doc.fillColor('black')
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
              console.log(school)
            }
          }
        }

        doc.pipe(res)
        doc.end()
        //return res.status(200).send(client);
      })
      .catch(error => res.status(400).send(error));

  }

};
