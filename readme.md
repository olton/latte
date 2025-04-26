<div align="center">

# 🥛 Latte

[![NPM Version](https://img.shields.io/npm/v/@olton/latte?color=green)](https://www.npmjs.com/package/@olton/latte)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?color=7852a9)](https://opensource.org/licenses/MIT)
![NPM Downloads](https://img.shields.io/npm/dw/%40olton%2Flatte?color=blue)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


Latte (an abbreviation from `laconic testing`) is a testing framework designed for testing applications written in JavaScript and TypeScript.

</div>

---

<h2>
It is designed to be straightforward to use, with a focus on speed, performance, and user information.
</h2>


Latte is an alternative to other testing frameworks like Jest, Mocha, and Jasmine with the following **core features:**

- Config free.
- Functions for creating test cases `it`, `test`, `describe`, `suite` or `expect`.
- Setup and Teardown functions `beforeEach`, `afterEach`, `beforeAll`, `afterAll`.
- React Components testing (`jsx` syntax supported).
- HTML Components testing (DOM built-in).
- Headless browser in scope `B` for test web pages and remote saites.
- Asynchronous code testing with `async/await`.
- Mock functions.
- Big set (100+) of built-in matchers.
- TypeScript testing out of the box. You can use both `js` and `ts` test files in the same project.
- Simple extend `Expect` class for adding your matchers.
- A lot of expects in one test case.
- Built-in coverage tool.
- `Verbose`, `Watching` and `Debug` mode.
- Different Reporters: `lcov`, `console`, `html`, and `junit`.
- Open source and MIT license.

---
<div align="center">
Documentation: https://latte.org.ua/
</div>

---

<div align="center">

![Demo](demo.gif)

</div>

---

Support for PayPal to **serhii@pimenov.com.ua**

---

## Installation

```bash
npm install @olton/latte -D
```

## Usage

To use `Latte` you don't need to import `it`, `test`, `describe` or `expect` in your test file. 
All these functions are available globally.

Create a test file with `*.test.js` or `*.test.ts` extension (for example).
You can use both of them in the same project.

```js
function hello() {
    return "Hello"
}

describe(`Common tests suite`, () => {
    it(`says hello`, () => {
        return expect(hello()).toBe("Hello")
    })
})

test(`Bad test 2 !== 1`, () => {
    return expect(2).toBe(1)
})

```

### Async tests

You can test async code with `async/await` syntax.

```js
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 1000);
    });
}

describe('Async function tests', async () => {
    it('should return data after 1 second', async () => {
        const data = await fetchData();
        return expect(data).toBe("Bad Data");
    });
});
```

Update `package.json` to run tests with `latte` command.
```json
{
    "scripts": {
        "test": "latte"
    }
}
```

### Functions
- `describe` – create a test suite
- `it` - create a test case in suite
- `test` - create standalone test
- `expect` - create assertion
- `beforeEach` - run before each test case
- `afterEach` - run after each test case
- `beforeAll` - run before all test cases
- `afterAll` - run after all test cases
- `mock` - create mock function

### Matchers
Latte contains a big set of built-in matchers:

- A simple comparison
- A strong comparison
- Type checking
- Number checking
- String checking
- Array checking
- Object checking
- Color checking
- IP, Email, Url checking
- JSON, XML checking
- Date, RegExp, Symbol checking
- Function checking
- HTML element checking
- and more...


### TypeScript
To use `Latte` with TypeScript you need to install `tsx` package.
```bash
npm install -D tsx cross-env
```
and then 
```json
{
    "scripts": {
        "test": "cross-env NODE_OPTIONS=\"--import tsx\" latte"
    }
}
```

## License
Latte licensed under MIT license.

## Contributing

### Bug Reports & Feature Requests
Use issue tracker to report bugs or request new features.

---
### Copyright
© 2025 [Serhii Pimenov](https://pimenov.com.ua). All rights reserved.

---
### Code Standards
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
