// auth.js
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { configurePassport, authenticateWithGoogle, handleGoogleCallback, ensureAuthenticated } from '../Utils/passport.js';

const app = express();

app.use(session({
  secret: 'xyzenkabagohnaisa',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, // 1 jam dalam milidetik
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
configurePassport();

// Routes
app.get('/login', authenticateWithGoogle);

app.get('/auth/google/callback', handleGoogleCallback, (req, res) => {
  const redirectTo = req.session.returnTo || '/auth/profile';
  delete req.session.returnTo; // Hapus setelah digunakan
  res.redirect(redirectTo);
});

app.get('/auth/profile', ensureAuthenticated, (req, res) => {
  res.render('./pages/auth/profile');
});

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/auth/profile');
  } else {
    res.render('./pages/main/landing');
  }
});

app.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
  }
  res.redirect('/dashboard');
});

export default app;
