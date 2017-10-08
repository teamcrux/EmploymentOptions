'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.STRING },
    race: { type: DataTypes.STRING },
    ssn: { type: DataTypes.INTEGER },
    email: { type: DataTypes.STRING },
    odl: { type: DataTypes.STRING },
    foodhc: { type:DataTypes.BOOLEAN },
    registration_date: { type: DataTypes.DATEONLY },
    military: { type: DataTypes.BOOLEAN },
    misdemeanor: { type: DataTypes.BOOLEAN },
    misdemeanor_exp: { type: DataTypes.TEXT },
    felony: { type: DataTypes.BOOLEAN },
    felony_exp: { type: DataTypes.TEXT },
    avail_date: { type: DataTypes.DATEONLY },
    full_time: { type: DataTypes.BOOLEAN },
    part_time: { type: DataTypes.BOOLEAN },
    hours: { type: DataTypes.INTEGER },
    daysofweek: { type: DataTypes.JSON },
    expectedwage: { type: DataTypes.FLOAT },
    willworkdays: { type: DataTypes.BOOLEAN },
    willworkswing: { type: DataTypes.BOOLEAN },
    willworknoc: { type: DataTypes.BOOLEAN },
    inside: { type: DataTypes.BOOLEAN },
    outside: { type: DataTypes.BOOLEAN },
    geo_area: { type: DataTypes.STRING },
    no_work_exp: { type: DataTypes.BOOLEAN, },
    benefits_prof: { type: DataTypes.BOOLEAN },
    benefits_exp: { type: DataTypes.TEXT },
    other_agency: { type: DataTypes.BOOLEAN },
    drivers_license: { type: DataTypes.BOOLEAN },
    car_access: { type: DataTypes.BOOLEAN },
    other_transport: { type: DataTypes.TEXT },
    pass_drug_screen: { type: DataTypes.BOOLEAN },
    medications: { type: DataTypes.TEXT },
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
