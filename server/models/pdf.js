const pdf = require('pdfkit');
'use strict';
module.exports = (sequelize, DataTypes) => {
  // create a document and pipe to a blob
  doc = new pdf();

  // draw some text
  doc.fontSize(25)
     .text('Here is some vector graphics...', 100, 80);

  // some vector graphics
  doc.save()
     .moveTo(100, 150)
     .lineTo(100, 250)
     .lineTo(200, 250)
     .fill("#FF3300");

  doc.circle(280, 200, 50)
     .fill("#6600FF");

  // an SVG path
  doc.scale(0.6)
     .translate(470, 130)
     .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
     .fill('red', 'even-odd')
     .restore();

  // and some justified text wrapped into column

  // end and display the document in the iframe to the right
  doc.end();
  return doc;
};
