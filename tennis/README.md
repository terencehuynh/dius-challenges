# Tennis Coding Challenge

The coding challenge is based on the specifications as outlined [here][0].

### Getting Started

Assuming you have Node.js installed on your machine, run the following to
install project dependencies using npm or Yarn:

```
npm install
yarn install
```

Once all dependencies are installed, you can run the project tests by using
the following command:

```
npm test
yarn test
```

### Developer Notes and Assumptions

- The following was written using **TypeScript**. Tests are using [ts-jest][1],
  a TypeScript variant of the Jest testing library that also incorporates type
  checking.

- As per the requirements, this does not feature a user interface (either GUI or
  a console application). As such, most of the scenarios to demonstrate the
  functionality is through tests.

  The code has been written in a way to be easy to integrate a user interface
  on top (by utilising a class).

- As per the requirements, client validation is not included.

- The `Match` constructor has three parameters versus two - the third one being
  optional. This was to allow me to inject a "player state" for testing purposes
  so that I can prepare a match to be in different scenarios and ensure that
  when adding a point to a player, it follows the correct rules.

- The example scenario in the specification can be found at
  `src/__tests__/example.test.js`.

- The following is based on the scoring system _for men singles_ (as per the
  specification).

  Abstracting it to a Match and a Player class allows us some flexibility for
  extending it and handle mixed and women single matches, and also doubles
  matches too.

[0]: https://github.com/DiUS/coding-tests/blob/master/dius_tennis.md
[1]: https://github.com/kulshekhar/ts-jest
