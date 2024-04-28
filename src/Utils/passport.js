// auth.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { addUser } from '../models/users.js';

export const configurePassport = () => {
  passport.use(new GoogleStrategy({
    clientID: '311062502290-8ej21nfsepqi0i4pslvdaud85la3uqhb.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: `${host}/auth/google/callback`,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      await addUser(profile.emails[0].value);
      return done(null, profile); // Use 'profile' instead of 'profile.id'
    } catch (error) {
      return done(error, null);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id); // Assuming 'id' is unique in the profile
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      done(null, id);
    } catch (error) {
      done(error, null);
    }
  });
};

export const authenticateWithGoogle = (req, res, next) => {
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  })(req, res, next);
};

export const handleGoogleCallback = (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login'); // Handle authentication failure
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.redirect('/'); // Successful authentication
    });
  })(req, res, next);
};


export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
