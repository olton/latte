/**
 * Return a promise that resolves after the specified time.
 * @param ms
 */
export declare function delay(ms: number): Promise<void>;

/**
 * Return a file url (file://...) from the provided path.
 * @param path
 */
export declare function getFileUrl(path: string): string;

/**
 * Interface for interacting with the browser.
 */
export declare class B {
    /**
     * Browser instance
     */
    static browser: any;

    /**
     * Current page instance
     */
    static currentPage: any;

    /**
     * The last error
     */
    static error: string | null;

    /**
     * Browser instance properties
     */
    static options: any;

    /**
     * Create a browser
     * @param options
     * @returns {Promise<void>}
     */
    static create: (options?: any) => Promise<void>;

    /**
     * Close the browser
     * @returns {Promise<void>}
     */
    static bye: () => Promise<void>;

    /**
     * Visit the page
     * @param url
     * @param options
     * @returns {Promise<void>}
     */
    static visit: (url: string) => Promise<void>;

    /**
     * Get all elements by selector, If no element matches the selector, the return value resolves to [].     * @param selector
     * @returns {Promise<*>}
     */
    static $: (selector: string) => Promise<any>;

    /**
     * This method fetches an element with selector, scrolls it into view if needed, and then uses Page.mouse to click in the center of the element. If there's no element matching selector, the method throws an error.
     * @param selector
     * @param options
     * @returns {Promise<*>}
     */
    static click: (selector: string) => Promise<void>;

    /**
     * This method fetches an element with selector, scrolls it into view if needed, and then uses Page.touchscreen to tap in the center of the element. If there's no element matching selector, the method throws an error.
     * @param selector
     * @returns {Promise<*>}
     */
    static tap: (selector: string) => Promise<void>;

    /**
     * Sends a keydown, keypress/input, and keyup event for each character in the text to element, specified by selector.
     * @param selector
     * @param text
     * @param options
     * @returns {Promise<*>}
     */
    static type: (selector: string, text: string, options: any) => Promise<void>;

    /**
     * Get window object property
     * @param v
     * @returns {Promise<*>}
     */
    static window: (propName: string) => Promise<any>;

    /**
     * Generate screenshot
     * @param path
     * @param options = {captureBeyondViewport, clip, encoding, fromSurface, fullPage, omitBackground, optimizeForSpeed, path, quality, type}
     * @returns {Promise<*>}
     */
    static screenshot: (path: string, options?: any) => Promise<void>;

    /**
     * Get document properties
     * @type {{html: function(): Promise<*>, title: function(): Promise<*>, url: function(): Promise<*>, cookies: function(...[*]): Promise<*>}}
     */
    static document: {
        title: () => Promise<string>;
        url: () => Promise<string>;
        html: () => Promise<string>;
        cookies: (urls: []) => Promise<any>;
    };

    /**
     * Get supported devices list
     * @type {Readonly<Record<
     *      "Blackberry PlayBook"
     *      | "Blackberry PlayBook landscape"
     *      | "BlackBerry Z30"
     *      | "BlackBerry Z30 landscape"
     *      | "Galaxy Note 3"
     *      | "Galaxy Note 3 landscape"
     *      | "Galaxy Note II"
     *      | "Galaxy Note II landscape"
     *      | "Galaxy S III"
     *      | "Galaxy S III landscape"
     *      | "Galaxy S5"
     *      | "Galaxy S5 landscape"
     *      | "Galaxy S8"
     *      | "Galaxy S8 landscape"
     *      | "Galaxy S9+"
     *      | "Galaxy S9+ landscape"
     *      | "Galaxy Tab S4"
     *      | "Galaxy Tab S4 landscape"
     *      | "iPad"
     *      | "iPad landscape"
     *      | "iPad (gen 6)"
     *      | "iPad (gen 6) landscape"
     *      | "iPad (gen 7)"
     *      | "iPad (gen 7) landscape"
     *      | "iPad Mini"
     *      | "iPad Mini landscape"
     *      | "iPad Pro"
     *      | "iPad Pro landscape"
     *      | "iPad Pro 11"
     *      | "iPad Pro 11 landscape"
     *      | "iPhone 4"
     *      | "iPhone 4 landscape"
     *      | "iPhone 5"
     *      | "iPhone 5 landscape"
     *      | "iPhone 6"
     *      | "iPhone 6 landscape"
     *      | "iPhone 6 Plus"
     *      | "iPhone 6 Plus landscape"
     *      | "iPhone 7"
     *      | "iPhone 7 landscape"
     *      | "iPhone 7 Plus"
     *      | "iPhone 7 Plus landscape"
     *      | "iPhone 8"
     *      | "iPhone 8 landscape"
     *      | "iPhone 8 Plus"
     *      | "iPhone 8 Plus landscape"
     *      | "iPhone SE"
     *      | "iPhone SE landscape"
     *      | "iPhone X"
     *      | "iPhone X landscape"
     *      | "iPhone XR"
     *      | "iPhone XR landscape"
     *      | "iPhone 11"
     *      | "iPhone 11 landscape"
     *      | "iPhone 11 Pro"
     *      | "iPhone 11 Pro landscape"
     *      | "iPhone 11 Pro Max"
     *      | "iPhone 11 Pro Max landscape"
     *      | "iPhone 12" | "iPhone 12 landscape"
     *      | "iPhone 12 Pro"
     *      | "iPhone 12 Pro landscape"
     *      | "iPhone 12 Pro Max"
     *      | "iPhone 12 Pro Max landscape"
     *      | "iPhone 12 Mini"
     *      | "iPhone 12 Mini landscape"
     *      | "iPhone 13"
     *      | "iPhone 13 landscape"
     *      | "iPhone 13 Pro"
     *      | "iPhone 13 Pro landscape"
     *      | "iPhone 13 Pro Max"
     *      | "iPhone 13 Pro Max landscape"
     *      | "iPhone 13 Mini"
     *      | "iPhone 13 Mini landscape"
     *      | "iPhone 14"
     *      | "iPhone 14 landscape"
     *      | "iPhone 14 Plus"
     *      | "iPhone 14 Plus landscape"
     *      | "iPhone 14 Pro"
     *      | "iPhone 14 Pro landscape"
     *      | "iPhone 14 Pro Max"
     *      | "iPhone 14 Pro Max landscape"
     *      | "iPhone 15"
     *      | "iPhone 15 landscape"
     *      | "iPhone 15 Plus"
     *      | "iPhone 15 Plus landscape"
     *      | "iPhone 15 Pro"
     *      | "iPhone 15 Pro landscape"
     *      | "iPhone 15 Pro Max"
     *      | "iPhone 15 Pro Max landscape"
     *      | "JioPhone 2"
     *      | "JioPhone 2 landscape"
     *      | "Kindle Fire HDX"
     *      | "Kindle Fire HDX landscape"
     *      | "LG Optimus L70"
     *      | "LG Optimus L70 landscape"
     *      | "Microsoft Lumia 550"
     *      | "Microsoft Lumia 950"
     *      | "Microsoft Lumia 950 landscape"
     *      | "Nexus 10"
     *      | "Nexus 10 landscape"
     *      | "Nexus 4"
     *      | "Nexus 4 landscape"
     *      | "Nexus 5"
     *      | "Nexus 5 landscape"
     *      | "Nexus 5X"
     *      | "Nexus 5X landscape"
     *      | "Nexus 6"
     *      | "Nexus 6 landscape"
     *      | "Nexus 6P"
     *      | "Nexus 6P landscape"
     *      | "Nexus 7"
     *      | "Nexus 7 landscape"
     *      | "Nokia Lumia 520"
     *      | "Nokia Lumia 520 landscape"
     *      | "Nokia N9"
     *      | "Nokia N9 landscape"
     *      | "Pixel 2"
     *      | "Pixel 2 landscape"
     *      | "Pixel 2 XL"
     *      | "Pixel 2 XL landscape"
     *      | "Pixel 3"
     *      | "Pixel 3 landscape"
     *      | "Pixel 4"
     *      | "Pixel 4 landscape"
     *      | "Pixel 4a (5G)"
     *      | "Pixel 4a (5G) landscape"
     *      | "Pixel 5"
     *      | "Pixel 5 landscape"
     *      | "Moto G4"
     *      | "Moto G4 landscape", Device
     *      >>}
     */
    static devices: any[];

    /**
     * Emulate device
     * @param device
     * @returns {Promise<*>}
     */
    static emulate: (device: string) => Promise<void>;

    /**
     * Add CSS to the page
     * @param options = {content, path, url}
     * @returns {Promise<*>}
     */
    static addCss: (options: object) => Promise<void>;

    /**
     * Add JS script to the page
     * @param options = {content, id, path, type, url}
     * @returns {Promise<*>}
     */
    static addJs: (options: object) => Promise<void>;

    /**
     * The method adds a function called name on the page's window object.
     * @param name
     * @param fn
     * @returns {Promise<*>}
     */
    static addFunction: (name: string, fn: any) => Promise<void>;

    /**
     * Gets a list of all open pages inside this Browser.
     * @returns {Promise<*>}
     */
    static pages: () => Promise<[]>;

    /**
     * Get the number of open pages inside the Browser.
     * @returns {Promise<*>}
     */
    static pageCount: () => number;

    /**
     * Get the page by index
     * @param index
     * @returns {Promise<*>}
     */
    static page: (index: number) => Promise<any>;

    /**
     * Creates a new page in the default browser context.
     * @returns {Promise<*>}
     */
    static newPage: () => Promise<any>;

    /**
     * Set active page
     * @param page - Page object, one of the pages returned by pages()
     * @returns {Promise<void>}
     */
    static setPage: (page: any) => Promise<any>;

    /**
     * Set active page by index
     * @param index
     * @returns {Promise<void>}
     */
    static setPageByIndex: (index: number) => Promise<void>;

    /**
     * Close the current page
     * @param runBeforeOnLoad, default false
     * @returns {Promise<void>}
     */
    static close: (runBeforeUnload?: boolean) => Promise<void>;

    /**
     * Close the page
     * @param p - Page index or Puppeteer page object, or null to close the current page
     * @param runBeforeOnLoad, default false
     * @returns {Promise<void>}
     */
    static closePage: (page: any, runBeforeOnLoad: boolean) => Promise<any>;

    /**
     * Close all pages
     * @param runBeforeOnLoad
     * @returns {Promise<void>}
     */
    static closeAllPages: (runBeforeUnload?: boolean) => Promise<any>;

    /**
     * Execute JavaScript code on current page
     * @param js
     * @param args
     * @returns {Promise<*>}
     */
    static exec: (js: any, args: []) => Promise<any>;

    static startCoverage: (options: any) => Promise<void>;
    static stopCoverage: () => Promise<any>;
}

/**
 * Interface for interacting with the Document Object Model (DOM).
 */
export declare class DOM {
    /**
     * Setup DOM environment with the provided HTML content and options.
     * @param html
     * @param options
     */
    static setup(html?: string, options?: Object): void

    /**
     * Remove DOM environment.
     */
    static clean: () => void

    /**
     * Flash the document HTML inner.
     */
    static flash: (html?: string) => void

    /**
     * Evaluate script in the DOM environment.
     */
    static eval: (js) => void

    /**
     * Load CSS into document.
     */
    static css: {
        fromString: (css: string) => void,
        fromFile: (path: string) => void,
        fromUrl: (url: string) => void,
    }

    /**
     * Load JS into document.
     */
    static js: {
        fromString: (js: string) => void,
        fromFile: (path: string) => void,
        fromUrl: (url: string) => void,
    }

    /**
     * Set document HTML.
     */
    static html: {
        fromString: (html: string) => void,
        fromFile: (path: string) => void,
        fromUrl: (url: string) => void,
    }
}

/**
 * Declares a test suite with a given name and test function.
 *
 * @param name - The name of the test suite.
 * @param fn - The function containing the test cases to execute within the suite.
 * @return void
 */
export declare function describe(name: string, fn: () => void): void;

/**
 * Declares a test suite with a given name and test function.
 *
 * @param name - The name of the test suite.
 * @param fn - The function containing the test cases to execute within the suite.
 * @return void
 */
export declare function suite(name: string, fn: () => void): void;

/**
 * Defines a test case with a given name and function.
 * For usage in describe blocks.
 *
 * @param {string} name - The name of the test case.
 * @param {Function} fn - The function containing the test logic.
 * @return {Promise<void>} A promise that resolves when the test case has been executed.
 */
export declare function it(name: string, fn: () => void): Promise<void>;

/**
 * Executes a single test function with a given name.
 *
 * @param {string} name - The name of the test.
 * @param {Function} fn - The test function to be executed.
 * @return {void} This function does not return a value.
 */
export declare function test(name: string, fn: () => void): Promise<void>;

/**
 * Creates an expectation for a given value.
 * This is typically used in testing frameworks to assert that the provided value
 * meets certain conditions.
 *
 * @param {any} received - The actual value to be tested.
 * @return {Expect} An object containing various methods to assert different conditions on the actual value.
 */
export declare function expect(received: any): Expect;

/**
 * Registers a callback function to be executed once before all tests in a suite.
 *
 * @param fn - The callback function to be executed before all tests.
 * @return void
 */
export declare function beforeAll(fn: () => void): void;

/**
 * Registers a function to be called after all tests have completed in a suite.
 *
 * @param {Function} fn - The function to be executed after all tests.
 * @return {void}
 */
export declare function afterAll(fn: () => void): void;

/**
 * Registers a function to be called before each test case.
 * The provided function will be called before each test case in a test suite.
 *
 * @param fn - The function to execute before each test case.
 * @return void
 */
export declare function beforeEach(fn: () => void): void;

/**
 * Registers a function to be executed after each test case.
 * The provided function will be called after each test case in a test suite.
 *
 * @param {Function} fn - The function to be executed after each test case.
 * @return {void} This function does not return any value.
 */
export declare function afterEach(fn: () => void): void;

/**
 * Mocks a function or object to simulate a specific behavior.
 *
 * @param {Function | Object} fn - The function to be mocked or config object for ajax or fetch.
 * @param name {string} The name of the mock function or "ajax", "fetch".
 * @return {function}
 */
export declare function mock(fn: any, name?: string): any;

/**
 * Spies on a function or object to track its calls and arguments.
 *
 * @param {Function} fn - The function to be spied on.
 * @return {function} The spy function that can be used to track calls and arguments and method to reset.
 */
export declare function spy(fn: () => {}): any;

/**
 * Waits for a specified amount of time before executing the next line of code.
 *
 * @return {function}
 * @param timeout
 */
export declare function waitFor(timeout: number): any;

export declare class ExpectError extends Error {
    constructor(message: string, matcher: string, received: any, expected: any)
}

/**
 * The instance of the Expect class
 *
 * @param {any} received - The actual value to be tested.
 */
export declare class Expect {
    /**
     * Creates a new instance of the Expect class with the provided value.
     *
     * @param {any} received - The actual value to be tested.
     */
    constructor(received: any);

    /**
     * get Expect class for negative tests
     */
    get not(): Expect

    /**
     * Asserts that the actual value is equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     * */
    toBe(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is strict equal (using ===) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeStrictEqual(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is equal (using ==) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeEqual(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual object is equal to the expected object.
     * @param expected - The expected object.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeObject(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is true.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeTrue(msg?: string): Expect

    /**
     * Asserts that the actual value is false.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeFalse(msg?: string): Expect

    /**
     * Asserts that the actual value is a boolean.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeBoolean(msg?: string): Expect

    /**
     * Asserts that the actual value matches the expected pattern.
     * @param expected - The expected pattern.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toMatch(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is defined.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeDefined(msg?: string): Expect

    /**
     * Asserts that the actual value is undefined.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeUndefined(msg?: string): Expect

    /**
     * Asserts that the actual value is null.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeNull(msg?: string): Expect

    /**
     * Asserts that the actual value is greater than the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeGreaterThan(expected: number, msg?: string): Expect

    /**
     * Asserts that the actual value is greater than or equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeGreaterThanOrEqual(expected: number, msg?: string): Expect

    /**
     * Asserts that the actual value is less than the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeLessThan(expected: number, msg?: string): Expect

    /**
     * Asserts that the actual value is less than or equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeLessThanOrEqual(expected: number, msg?: string): Expect

    /**
     * Asserts that the actual value is between the specified minimum and maximum values.
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBetween(min: number, max: number, msg?: string): Expect

    /**
     * Asserts that the actual value is an integer.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeInteger(msg?: string): Expect

    /**
     * Asserts that the actual value is a safe integer.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeSafeInteger(msg?: string): Expect

    /**
     * Asserts that the actual value is a float.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeFloat(msg?: string): Expect

    /**
     * Asserts that the actual value is positive.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBePositive(msg?: string): Expect

    /**
     * Asserts that the actual value is negative.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeNegative(msg?: string): Expect

    /**
     * Asserts that the actual value is finite.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeFinite(msg?: string): Expect

    /**
     * Asserts that the actual value is a number and not is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeNumber(msg?: string): Expect

    /**
     * Asserts that the actual value is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeNaN(msg?: string): Expect

    /**
     * Asserts that the actual value is close to the expected value within a certain precision.
     * @param {number} expected - The expected value to compare against.
     * @param {number} [precision=2] - The number of decimal places to consider in the comparison.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeCloseTo(expected: any, precision?: number, msg?: string): Expect

    /**
     * Asserts that the actual function throws an error.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toThrow(msg?: string): Expect

    /**
     * Asserts that the actual function throws an error matching the expected value.
     * @param expected - The expected error.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toThrowError(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is a HEX color.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeHEXColor(msg?: string): Expect

    /**
     * Asserts that the actual value is an RGB color.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeRGBColor(msg?: string): Expect

    /**
     * Asserts that the actual value is an RGBA color.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeRGBAColor(msg?: string): Expect

    /**
     * Asserts that the actual value is an HSL color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeHSVColor(msg?: string): Expect

    /**
     * Asserts that the actual value is an HSL color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeHSLColor(msg?: string): Expect

    /**
     * Asserts that the actual value is an HSLA color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeHSLAColor(msg?: string): Expect

    /**
     * Asserts that the actual value is a CMYK color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeCMYKColor(msg?: string): Expect

    /**
     * Asserts that the actual value is a valid color (HEX, RGB, RGBA, HSL, HSLA, or CMYK).
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeColor(msg?: string): Expect

    /**
     * Asserts the mock function was called at least once
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toHaveBeenCalled(msg?: string): Expect

    /**
     * Asserts the mock function was called at least once
     * @param expected
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toHaveBeenCalledTimes(expected: any, msg?: string): Expect

    /**
     * Asserts that the mock function was called with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toHaveBeenCalledWith(expected: any, msg?: string): Expect

    /**
     * Asserts that the mock function was called last with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toHaveBeenLastCalledWith(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value contains the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toContain(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is deeply equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeDeepEqual(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is deeply equal to the expected value using a safe comparison.
     * With this method you can compare objects with circular references.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeDeepEqualSafe(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual structure is equal to the expected structure.
     * @param expected - The expected structure.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeObjectStructureEqual(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual array is equal to the expected array.
     * @param expected - The expected array.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeArrayEqual(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is an array.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeArray(msg?: string): Expect

    /**
     * Asserts that the actual value is sorted.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeArraySorted(msg?: string): Expect

    /**
     * Asserts that values in the array are unique.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeArrayUnique(msg?: string): Expect

    /**
     * Asserts that the actual value is a valid IP address.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeIP(msg?: string): Expect

    /**
     * Asserts that the actual value is a valid IPv4 address.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeIPv4(msg?: string): Expect

    /**
     * Asserts that the actual value is a valid IPv6 address.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeIPv6(msg?: string): Expect

    /**
     * Asserts that the actual value is a valid email address.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeEmail(msg?: string): Expect

    /**
     * Asserts that the actual value is a valid URL.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeUrl(msg?: string): Expect

    /**
     * Asserts that the actual value is empty.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeEmpty(msg?: string): Expect

    /**
     * Asserts that the array-like object has the expected length.
     * @param {number} expected - The expected length.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    hasLength(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is a Base64 encoded string.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeBase64(msg?: string): Expect

    /**
     * Asserts that the actual value is a JSON string.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeJson(msg?: string): Expect

    /**
     * Asserts that the actual value is an XML string.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeXml(msg?: string): Expect

    /**
     * Asserts that the actual value has the specified property.
     * @param {string} expected - The expected property name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    hasProperty(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is of the specified type.
     * @param type - The expected type.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeType(type: any, msg?: string): Expect

    /**
     * Asserts that the actual value is an instance of the specified type.
     * @param type - The expected type.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeInstanceOf(type: any, msg?: string): Expect


    /**
     * Asserts that the actual value is a string.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeString(msg?: string): Expect


    /**
     * Asserts that the actual value is a function.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeFunction(msg?: string): Expect

    /**
     * Asserts that the actual value is an async function.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeAsyncFunction(msg?: string): Expect

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeDate(msg?: string): Expect

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeDateObject(msg?: string): Expect

    /**
     * Asserts that the actual value is a regular expression.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeRegExp(msg?: string): Expect

    /**
     * Asserts that the actual value is a symbol.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeSymbol(msg?: string): Expect

    /**
     * Asserts that the actual value is a BigInt.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeBigInt(msg?: string): Expect

    /**
     * Asserts that the actual value is a Map.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeMap(msg?: string): Expect

    /**
     * Asserts that the actual value is a Set.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeSet(msg?: string): Expect

    /**
     * Asserts that the actual value is a WeakMap.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeWeakMap(msg?: string): Expect

    /**
     * Asserts that the actual value is a WeakSet.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeWeakSet(msg?: string): Expect

    /**
     * Asserts that the actual value is an ArrayBuffer.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeArrayBuffer(msg?: string): Expect

    /**
     * Asserts that the actual value is a Promise.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBePromise(msg?: string): Expect

    /**
     * Asserts that the actual value is an HTML element.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeHtmlElement(msg?: string): Expect

    /**
     * Asserts that the actual value is an HTML node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeNode(msg?: string): Expect

    /**
     * Asserts that the actual value is an HTML document.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeDocument(msg?: string): Expect

    /**
     * Asserts that the actual value is an HTML collection.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeHtmlCollection(msg?: string): Expect

    /**
     * Asserts that the actual value is a Window object.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeWindow(msg?: string): Expect

    /**
     * Asserts that the actual value is a Text node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeTextNode(msg?: string): Expect

    /**
     * Asserts that the HTML element has the specified class.
     * @param {string} expected - The expected class name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    hasClass(expected: string, msg?: string): Expect

    /**
     * Asserts that the HTML element has the specified attribute.
     * @param {string} expected - The expected attribute name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    hasAttribute(expected: string, msg?: string): Expect

    /**
     * Asserts that the HTML element has children.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    hasChildren(msg?: string): Expect

    /**
     * Asserts that the HTML element has a parent.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    hasParent(msg?: string): Expect

    /**
     * Asserts that the HTML element has the specified style in style property.
     * @param {string} expected - The expected style.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    hasStyleProperty(expected: string, msg?: string): Expect

    /**
     * Asserts that the HTML element has the specified style property with value.
     * @param {string} prop - The expected style property name.
     * @param {string} val - The expected style property value.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    hasStyle(prop: string, val: string, msg?: string): Expect

    /**
     * Asserts that the HTML element has the specified styles.
     * @param {Object} styles - The expected styles.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    hasStyles(styles: object, msg?: string): Expect

    /**
     * Asserts that the HTML element has siblings.
     * @param msg
     * @returns {Expect}
     */
    hasSiblings(msg?: string): Expect

    /**
     * Asserts that the HTML element has a specified sibling.
     * @param expected
     * @param msg
     * @returns {Expect}
     */
    hasSibling(expected: HTMLElement, msg?: string): Expect

    /**
     * Asserts that the HTML element has a prev siblings.
     * @param msg
     * @returns {Expect}
     */
    hasPrev(msg?: string): Expect

    /**
     * Asserts that the HTML element has a next siblings.
     * @param msg
     * @returns {Expect}
     */
    hasNext(msg?: string): Expect

    /**
     * Asserts that the HTML element has a specified text in textContent.
     * @param expected
     * @param msg
     * @returns {Expect}
     */
    hasText(expected: string, msg?: string): Expect

    /**
     * Asserts that the HTML element contains the specified element.
     * @param expected
     * @param msg
     * @returns {Expect}
     */
    containsElement(expected: HTMLElement, msg?: string): Expect

    /**
     * Asserts that the HTML element contains the specified element deeply.
     * @param expected
     * @param msg
     * @returns {Expect}
     */
    containsElementDeep(expected: HTMLElement, msg?: string): Expect

    /**
     * Asserts that the HTML element has the specified value in ID.
     * @param expected
     * @param msg
     * @returns {Expect}
     */
    hasId(expected: string, msg?: string): Expect

    /**
     * Asserts that the HTML element has the specified name.
     * @param expected
     * @param msg
     * @returns {Expect}
     */
    hasName(expected: string, msg?: string): Expect

    /**
     * Asserts that the HTML element has the specified value in src.
     * @param expected
     * @param msg
     * @returns {Expect}
     */
    hasSrc(expected: string, msg?: string): Expect

    /**
     * Asserts that the HTML element has the specified value in href.
     * @param expected
     * @param msg
     * @returns {Expect}
     */
    hasHref(expected: string, msg?: string): Expect

    /**
     * Asserts that the actual value is resolved with the expected value.
     * @param {any} expected - The expected text content.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeResolvedWith(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is rejected with the expected value.
     * @param {any} expected - The expected text content.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect}
     */
    toBeRejectedWith(expected: any, msg?: string): Expect

    /**
     * Asserts that the actual value is an instance of the expected type.
     * @param type
     * @param msg
     * @returns {Expect}
     * */
    any(type: any, msg?: string): Expect
}
