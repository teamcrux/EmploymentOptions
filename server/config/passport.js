const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models').User;

module.exports = (passport)=>{
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    });

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user);
        })
    });

    passport.use('local-login', new LocalStrategy((username, password, done)=>{
        User.findOne({
            where: {
                'email': username
            }
        }).then((user)=>{
            if(user !== null && user !== undefined){
                user.authenticate(password).then((res)=>{
                    if(res){
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Invalid credentials.'});
                    }
                }).catch((err)=>{
                    console.error(err);
                })
            } else {
                return done(null, false, {message: 'Invalid credentials.'});
            }

        }).catch((err)=>{
            console.error(err);
        })
    }));

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: 'allYOURbaseAREbelongTOus'
    }, (jwt_payload, done)=>{
        User.findOne({
            'id': jwt_payload.sub
        }).then((user)=>{
            if(user !== null && user !== undefined){
                return done(null, user)
            } else {
                return done(null, false, {message: 'Invalid credentials.'});
            }
        }).catch((err)=>{
            console.error(err);
        });
    }));

}