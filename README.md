## Description
This solution is based off the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

I decided to use NestJS because it was new to me and it was a good opportunity to try it. It also seemed to support Typescript well out of the box.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Missing bits

Being an exercise there are some things I left out for expediency.

1. No authentication or authorization. Both of these things would typically be part of any REST API.
2. The password is stored in plain text, and returned in the body of the GET user request. Passwords would typically be hashed before storage and never exposed through an API.
3. I use a Javascript array in place of persistent storage. That's not normal.
4. Right now I use a single model class to represent the incoming request as well as the final persisted data. This is awkward and it would be better to have separate classes to represent the request and the final data.
5. There is no meaningful logging which is required for any system that's live in the wild.
6. When records are created the id is simply returned as text. This would probably be better as JSON or in a header.

## API Documentation

Find API docs here:
https://documenter.getpostman.com/view/578584/RztmqTmr
