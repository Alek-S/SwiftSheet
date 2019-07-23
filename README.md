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
- 📁 **frontend**
  - 📁 **components** -- _Individual UI components used by pages_
  - 📁 **pages** -- _full pages react-router can route to, composed of components_
  - 📁 **utils**
- 📁 **backend**
  - 📁 **controller** -- _express routes for REST APIs_
  - 📁 **graphql**
    - 📁 **resolver** -- _functions for how to get or mutate data_
    - 📁 **schema** -- _GraphQL API Schema (Queries, Mutations)_
  - 📁 **model** -- _data model for use by Mongooose with MongoDB_
- 📁 **shared** -- _shared between front and back code_
- 📁 **test** -- _jest configs_


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

### Deployment + Tools
- Ubuntu Linux VPS
- PM2
- NGINX
- CloudFlare CDN
- Sentry.io (Client-Side Error Reporting)
- Code Climate (Code Quality & Maintainability analysis)
- Snyk (package vulnerability detection)
- Travis CI (used to run unit tests before merging PR - not used to deploy)
