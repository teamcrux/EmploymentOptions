export default function createResume (data) {

  var win;
  data = JSON.parse(data);
  //console.log(data);

  let getSkills = () => {
    var list = "<ul>"
    let skills = JSON.parse(data.key_skills);
    for (var i = 0; i < skills.length; i++) {
      var obj = skills[i];
      if (i === 0) {
        list += "<table style=\"width:100%; font-size:14px;\"><ul>";
      }
      for (var key in obj) {
        if ((i % 2) === 0){
          list += "<tr><td><li>" + obj[key] + "</li></td>";
        }
        else {
          list += "<td><li>" + obj[key] + "</li></td></tr>";
        }
      }
      if (i === skills.length - 1) {
        list += "</ul></table>";
      }
    }
    list += "</ul>"
    return(list);
  }

  let getExperience = () => {
    var list = "";
    let exp = data.EmploymentDetails;
    for (var i = 0; i < exp.length; i++) {
      var job = exp[i];
      list += "<h4><u>" + job.organization + ' - ' + job.location + ' - ' + job.job_title + "</u></h4>";
      list += job.description + "<br><br> TECHNICAL SKILLS:<br>"
      var duties = JSON.parse(job.job_duties);
      //console.log("duties: ", duties);
      for (var j = 0; j < duties.length; j++) {
        var obj = duties[j];
        if (j === 0) {
          list += "<table style=\"width:100%; font-size:14px;\"><ul>";
        }
        for (var key in obj) {
          if ((j % 2) === 0) {
            list += "<tr><td><li>" + obj[key] + "</li></td>";
          }
          else {
            list += "<td><li>" + obj[key] + "</li></td></tr>";
          }
        }
        if (j === duties.length - 1) {
          list += "</ul></table>";
        }
      }
    }
    return(list);
  }

  let getEducation = () => {
    var list = "";
    let edu = data.EducationDetails;
    for (var i = 0; i < edu.length; i++) {
      var school = edu[i];
      //console.log(school);
      if (school.high_school) {
        if(school.hs_diploma) {
          list += "High School Diploma - " + school.name;
        }
        else if (school.ged) {
          list += school.name + " - GED";
        }
      }
      else if (school.college) {
        list += school.certificate + ' - ' + school.name;
      }
      else if (school.vocational) {
        list += school.certificate;
      }
    }
    return(list);
  }

  let getRefs = () => {
    var list = ""
    let refs = data.References;
    for (var i = 0; i < refs.length; i++) {
      var obj = refs[i];
      list += obj.first_name + ' ' + obj.last_name + ' - ' + obj.phone + '<br><br>';
    }
    return(list);
  }

  if(data.no_work_exp) {
    win = window.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=680px, height=842px, top="+(screen.height-400)+", left="+(screen.width-840));
    win.document.body.innerHTML = '<body><div style="font-family:arial; border:2px solid black; margin:15px; height:100%; width:100%;"><div style="margin:58px;">' +
                                  '<div style="text-align:center;" id="name"></div>' +
                                  '<div style="text-align:center;" id="address"><div id="street"></div><div id="location"></div></div>' +
                                  '<div style="text-align:center;" id="phone"></div>' +
                                  '<div style="text-align:center;" id="separator"></div>' +
                                  '<div id="prof"></div>' +
                                  '<div id="interests"></div>' +
                                  '<div id="education"></div>' +
                                  '<div id="references"></div>' +
                                  '</div></div></body>';
    win.document.getElementById('name').innerHTML = '<h1>' + data.first_name + ' ' + data.last_name + '</h1>';
    if (data.Address.street_address_one && data.Address.street_address_two){
      win.document.getElementById('street').innerHTML = data.Address.street_address_one + '<br>' + data.Address.street_address_two + "<br><br>";
    } else if (data.Address.street_address_one) {
      win.document.getElementById('street').innerHTML = data.Address.street_address_one + "<br><br>";
    }
    if (data.Address.city && data.Address.state && data.Address.zip) {
      win.document.getElementById('location').innerHTML = data.Address.city + ', ' + data.Address.state + ' ' + data.Address.zip + "<br><br>";
    }
    if (data.phone) {
      win.document.getElementById('phone').innerHTML = 'Tel: ' + data.phone + "<br><br>";
    }
    win.document.getElementById('separator').innerHTML = '<br><hr width="75%"><br>';
    if (data.profile) {
      win.document.getElementById('prof').innerHTML = '<h4><u>PERSONAL</u></h4>' + data.profile + "<br><br>";
    }
    if (data.interests) {
      win.document.getElementById('interests').innerHTML = '<h4><u>INTERESTS</u></h4>' + data.interests + "<br><br>";
    }
    if (data.EducationDetails) {
      win.document.getElementById('education').innerHTML = '<h4><u>EDUCATION</u></h4>' + getEducation();
    }
    if (data.References) {
      win.document.getElementById('references').innerHTML = '<h4><u>REFERENCES</u></h4>' + getRefs();
    }
  }

  else {
      win = window.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=680px, height=842px, top="+(screen.height-400)+", left="+(screen.width-840));
      win.document.body.innerHTML = '<body><div style="font-family:arial; font-size:14px; margin:5px; height:100%; width:100%;"><div style="margin:18px;">' +
                                  '<div id="name"></div>' +
                                  '<div id="address"><div id="street"></div><div id="location"></div></div>' +
                                  '<div id="separator"></div>' +
                                  '<div id="prof_prof"></div>' +
                                  '<div id="skills"></div>' +
                                  '<div id="prof_exp"><div id="emp_date"></div><div id="job_title"></div><div id="responsibilities"></div></div>' +
                                  '<div id="education"></div>'+
                                  '</div></div></body>';
    win.document.getElementById('name').innerHTML = '<h1>' + data.first_name + ' ' + data.last_name + '</h1>';
    if (data.Address.street_address_one && data.Address.street_address_two){
      win.document.getElementById('street').innerHTML = data.Address.street_address_one + '<br>' + data.Address.street_address_two;
    } else if (data.Address.street_address_one) {
      win.document.getElementById('street').innerHTML = data.Address.street_address_one;
    }
    if (data.Address.city && data.Address.state && data.Address.zip) {
      win.document.getElementById('location').innerHTML = data.Address.city + ', ' + data.Address.state + ' ' + data.Address.zip;
    }
    win.document.getElementById('separator').innerHTML = '<hr>';
    if (data.profile) {
      win.document.getElementById('prof_prof').innerHTML = '<h4><u>PROFESSIONAL PROFILE</u></h4>' + data.profile;
    }
    if (data.key_skills) {
      win.document.getElementById('skills').innerHTML = '<h4><u>KEY SKILLS</u></h4>' + getSkills() ;
    }
    if (data.EmploymentDetails) {
      win.document.getElementById('prof_exp').innerHTML = '<h4><u>TECHNICAL EXPERIENCE</u></h4>' + getExperience() ;
    }
    if (data.EducationDetails) {
      win.document.getElementById('education').innerHTML = '<h4><u>EDUCATION</u></h4>' + getEducation();
    }
  }

};
