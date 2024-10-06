## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov



Please make sure you have the mongodb working in your locan environment

Application Flow

1.Create user
2.Login and get the access token
3.Pass access token to subsequest api requests


Use data samples from folder db_samples to have local data(DBname - pmsdb, collections - projects,tasks,users)


Application Architecture

1.App is divided into seperate modules, controllers, services and dbservices
2.We can able to scale the app as it grows when we using this module mased architecture.
    2.1.Controllers we can use to control the application flow
    2.2 Services for business logics
    2.3 DB services for Query based logics(It is extended with mongoose class to have the db query in common place)

```
