# SwiftSheet 
[![Build Status](https://travis-ci.org/Alek-S/SwiftSheet.svg?branch=master)](https://travis-ci.org/Alek-S/SwiftSheet)
[![codecov](https://codecov.io/gh/Alek-S/SwiftSheet/branch/master/graph/badge.svg)](https://codecov.io/gh/Alek-S/SwiftSheet)
[![Maintainability](https://api.codeclimate.com/v1/badges/b59006c218534a51e024/maintainability)](https://codeclimate.com/github/Alek-S/SwiftSheet/maintainability)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


<img src="./dist/assets/images/logo.svg" width="100%" height="150" alt="logo">

## About
Have a CSV you want to quickly share without an account, or quickly mock an API (REST / GraphQL)? We got you. 

Drag and drop to upload a CSV, and set how long until it expires, (ex: expire in 1hour or expire in 5 days), and optional password protection.

After upload, you get a sharable minified link to the sheet that others can view online an interactive and filterable spreadsheet, likewise with no account needed. Once sheet expires, the sheet is automatically deleted and the link is no longer valid.

Additionally API endpoints are also temporarily created as both REST and GraphQL for quickly mocking an API off of a CSV file.

## File Structure


## Technology Used

### Front
- React 16.8 (the one with hooks)
- React Router
- Apollo (GraphQL)
- AG-Grid
- Styled Components
- Jest (Unit Testing - Precommit Hooks)
- Prettier (Via Precommit Hooks)
- Pako (zlib deflate)
- Date-FNS
- Babel
- Webpack

### Back
- Node
- Express-GraphQL
- Mongoose
- MongoDB
- Pako (zlib inflate)
- Prettier

### Deployment
- Ubuntu Linux VPS
- PM2
- NGINX
- CloudFlare CDN
- Sentry.io (Client-Side Error Reporting)
- Code Climate (Code Quality)
