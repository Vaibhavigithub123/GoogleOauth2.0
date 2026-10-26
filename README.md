# Google OAuth 2.0 — Full Stack Implementation

A full stack mini project built to understand Google OAuth 2.0
Authorization Code Flow end to end.

## Stack

- React 19 + Vite + Tailwind (client)
- Node.js + Express + Passport.js (server)
- MongoDB + Mongoose
- JWT via httpOnly cookie

## What I practiced

- Google OAuth 2.0 Authorization Code Flow
- Passport.js Google + JWT strategies
- Find-or-upsert user pattern by Google ID
- Protected routes with JWT cookie validation
- Separating client/server with proper CORS setup

## Auth flow

Login → Google consent → callback → JWT cookie set →
client fetches profile → stored in localStorage → dashboard

## Note

This is a learning project built to understand OAuth 2.0 mechanics
before applying the pattern in a production project.
