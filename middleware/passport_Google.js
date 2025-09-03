import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserGoogle } from "../models/userModel_google.js";
import dotenv from "dotenv";
dotenv.config();

export const initializePassportGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await UserGoogle.findOne({ googleId: profile.id });

          if (!user) {
            user = new UserGoogle({
              googleId: profile.id,
              username: profile.displayName,
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserGoogle.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
