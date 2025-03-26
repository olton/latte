import puppeteer, {KnownDevices} from 'puppeteer';
import {displayReport} from "../core/coverage.js";
import {merge} from "../helpers/merge.js";
import createReport from "../reporters/lcov/index.js";
import matchInArray from "../helpers/match-in-array.js";

const coverageDefaults = {
    includeRawScriptCoverage: true,
    reportAnonymousScripts: true,
    resetOnNavigation: true,
    useBlockCoverage: true,
}

const browserDefaults = {
    headless: "shell",
    args: [
        '--no-sandbox',
    ],
    detached: true,
    dumpio: false,
    env: {},
    executablePath: undefined,
    handleSIGHUP: true,
    handleSIGINT: true,
    handleSIGTERM: true,
    onExit: undefined,
    pipe: false,
    log: false,
    coverage: {
        filter: '',
        reportFileName: 'lcov-browser.info',
        ...coverageDefaults,
    }
}

const typeDefaults = {
    delay: 0
}

const waitForSelectorDefaults = {
    hidden: false,
    signal: null,
    timeout: 30_000,
    visible: false,
}

export class Device {}

export class Browser {
    static browser = null
    static currentPage = null
    static error = null
    static options = null
    static coverage = null

    /**
     * Create a browser
     * @param options
     * @returns {Promise<void>}
     */
    static async create(options){
        this.options = merge({}, browserDefaults, options)
        this.browser = await puppeteer.launch(this.options);
        this.currentPage = await this.browser.newPage();
        this.addEvents()
        if (global.config.coverage) {
            await this.startCoverage(this.options.coverage)
        }
    }

    /**
     * Close the browser
     * @returns {Promise<void>}
     */
    static async bye(){
        if (global.config.coverage) {
            await Browser.stopCoverage()
        }
        await Browser.browser.close();
    }

    /**
     * Add events to the page
     */
    static addEvents = () => {
        this.currentPage.on('error', msg => {
            this.error = msg
            if (this.options.log) console.log(`[ERROR] - ${msg}`)
        })
        this.currentPage.on('pageerror', msg => {
            this.error = msg
            if (this.options.log) console.log(`[PAGE-ERROR] - ${msg}`)
        })
        this.currentPage.on('console', msg => {
            for (let i = 0; i < msg.args.length; ++i) {
                if (this.options.log) console.log(`${i}: ${msg.args[i]}`)
            }
        })
        this.currentPage.on('requestfailed', request => {
            this.error = request.failure().errorText
            if (this.options.log) console.log('Request failed: ', request.failure().errorText);
        })
        this.currentPage.on('response', response => {
            if (this.options.log) console.log('Response status: ', response.status());
        });
    }

    /**
     * Visit the page
     * @param url
     * @param options
     * @returns {Promise<void>}
     */
    static async visit(url, options){
        this.error = null
        await this.currentPage.goto(url, options);
    }

    /**
     * Get all elements by selector, If no element matches the selector, the return value resolves to [].     * @param selector
     * @returns {Promise<*>}
     */
    static async $(selector){
        return await this.currentPage.$$(selector);
    }

    /**
     * Get elements by selector
     * @param selector
     * @returns {Promise<*>}
     */
    static async find(selector){
        return await this.currentPage.$$(selector);
    }

    /**
     * Get the first element by selector
     * @param selector
     * @returns {Promise<*>}
     */
    static async findFirst(selector){
        return await this.currentPage.$(selector);
    }
    
    /**
     * Get document properties
     * @type {{html: function(): Promise<*>, title: function(): Promise<*>, url: function(): Promise<*>, cookies: function(...[*]): Promise<*>}}
     */
    static document = {
        title: async () => await this.currentPage.title(),
        url: async () => await this.currentPage.url(),
        html: async () => await this.currentPage.content(),
        cookies: async (...urls) => await this.currentPage.cookies(...urls),
        body: async () => await this.currentPage.evaluate(() => document.body),
    }

    /**
     * Get window object property
     * @param v
     * @returns {Promise<*>}
     */
    static window = async (v) => {
        return await this.currentPage.evaluate((v) => v ? window[v] : window, v)
    }

    /**
     * This method fetches an element with selector, scrolls it into view if needed, and then uses Page.mouse to click in the center of the element. If there's no element matching selector, the method throws an error.
     * @param selector
     * @param options {offset}
     * @returns {Promise<*>}
     */
    static click = async (selector, options) => {
        return await this.currentPage.click(selector, options)
    }

    /**
     * This method fetches an element with selector, scrolls it into view if needed, and then uses Page.touchscreen to tap in the center of the element. If there's no element matching selector, the method throws an error.
     * @param selector
     * @returns {Promise<*>}
     */
    static tap = async (selector) => {
        return await this.currentPage.tap(selector)
    }

    /**
     * Sends a keydown, keypress/input, and keyup event for each character in the text to element, specified by selector.
     * @param selector
     * @param text
     * @param options {delay}
     * @returns {Promise<*>}
     */
    static type = async (selector, text, options) => {
        return await this.currentPage.type(selector, text, {...typeDefaults, ...options})
    }

    /**
     * Generate screenshot
     * @param path
     * @param options = {captureBeyondViewport, clip, encoding, fromSurface, fullPage, omitBackground, optimizeForSpeed, path, quality, type}
     * @returns {Promise<*>}
     */
    static screenshot = async (path, options) => {
        return await this.currentPage.screenshot({...options, path})
    }

    /**
     * Generate pdf
     * @param path
     * @param options = {displayHeaderFooter, footerTemplate, format, headerTemplate, height, landscape, margin, omitBackground, outline, pageRanges, path, preferCSSPageSize, printBackground, scale, width, timeout, waitForFonts, tagged}
     * @returns {Promise<*>}
     */
    static pdf = async (path, options) => {
        return await this.currentPage.pdf({...options, path})
    }

    /**
     * Emulate device
     * @param device
     * @returns {Promise<*>}
     */
    static emulate = async (device) => {
        return await this.currentPage.emulate(device)
    }

    /**
     * Get supported devices list
     * @type {Readonly<Record<"Blackberry PlayBook" | "Blackberry PlayBook landscape" | "BlackBerry Z30" | "BlackBerry Z30 landscape" | "Galaxy Note 3" | "Galaxy Note 3 landscape" | "Galaxy Note II" | "Galaxy Note II landscape" | "Galaxy S III" | "Galaxy S III landscape" | "Galaxy S5" | "Galaxy S5 landscape" | "Galaxy S8" | "Galaxy S8 landscape" | "Galaxy S9+" | "Galaxy S9+ landscape" | "Galaxy Tab S4" | "Galaxy Tab S4 landscape" | "iPad" | "iPad landscape" | "iPad (gen 6)" | "iPad (gen 6) landscape" | "iPad (gen 7)" | "iPad (gen 7) landscape" | "iPad Mini" | "iPad Mini landscape" | "iPad Pro" | "iPad Pro landscape" | "iPad Pro 11" | "iPad Pro 11 landscape" | "iPhone 4" | "iPhone 4 landscape" | "iPhone 5" | "iPhone 5 landscape" | "iPhone 6" | "iPhone 6 landscape" | "iPhone 6 Plus" | "iPhone 6 Plus landscape" | "iPhone 7" | "iPhone 7 landscape" | "iPhone 7 Plus" | "iPhone 7 Plus landscape" | "iPhone 8" | "iPhone 8 landscape" | "iPhone 8 Plus" | "iPhone 8 Plus landscape" | "iPhone SE" | "iPhone SE landscape" | "iPhone X" | "iPhone X landscape" | "iPhone XR" | "iPhone XR landscape" | "iPhone 11" | "iPhone 11 landscape" | "iPhone 11 Pro" | "iPhone 11 Pro landscape" | "iPhone 11 Pro Max" | "iPhone 11 Pro Max landscape" | "iPhone 12" | "iPhone 12 landscape" | "iPhone 12 Pro" | "iPhone 12 Pro landscape" | "iPhone 12 Pro Max" | "iPhone 12 Pro Max landscape" | "iPhone 12 Mini" | "iPhone 12 Mini landscape" | "iPhone 13" | "iPhone 13 landscape" | "iPhone 13 Pro" | "iPhone 13 Pro landscape" | "iPhone 13 Pro Max" | "iPhone 13 Pro Max landscape" | "iPhone 13 Mini" | "iPhone 13 Mini landscape" | "iPhone 14" | "iPhone 14 landscape" | "iPhone 14 Plus" | "iPhone 14 Plus landscape" | "iPhone 14 Pro" | "iPhone 14 Pro landscape" | "iPhone 14 Pro Max" | "iPhone 14 Pro Max landscape" | "iPhone 15" | "iPhone 15 landscape" | "iPhone 15 Plus" | "iPhone 15 Plus landscape" | "iPhone 15 Pro" | "iPhone 15 Pro landscape" | "iPhone 15 Pro Max" | "iPhone 15 Pro Max landscape" | "JioPhone 2" | "JioPhone 2 landscape" | "Kindle Fire HDX" | "Kindle Fire HDX landscape" | "LG Optimus L70" | "LG Optimus L70 landscape" | "Microsoft Lumia 550" | "Microsoft Lumia 950" | "Microsoft Lumia 950 landscape" | "Nexus 10" | "Nexus 10 landscape" | "Nexus 4" | "Nexus 4 landscape" | "Nexus 5" | "Nexus 5 landscape" | "Nexus 5X" | "Nexus 5X landscape" | "Nexus 6" | "Nexus 6 landscape" | "Nexus 6P" | "Nexus 6P landscape" | "Nexus 7" | "Nexus 7 landscape" | "Nokia Lumia 520" | "Nokia Lumia 520 landscape" | "Nokia N9" | "Nokia N9 landscape" | "Pixel 2" | "Pixel 2 landscape" | "Pixel 2 XL" | "Pixel 2 XL landscape" | "Pixel 3" | "Pixel 3 landscape" | "Pixel 4" | "Pixel 4 landscape" | "Pixel 4a (5G)" | "Pixel 4a (5G) landscape" | "Pixel 5" | "Pixel 5 landscape" | "Moto G4" | "Moto G4 landscape", Device>>}
     */
    static devices = KnownDevices

    /**
     * Add CSS to the page
     * @param options = {content, path, url}
     * @returns {Promise<*>}
     */
    static addCss = async (options) => {
        return await this.currentPage.addStyleTag(options)
    }

    /**
     * Add CSS from string
     * @param content
     * @returns {Promise<*>}
     */
    static addCssFromString = async (content) => {
        return await this.currentPage.addStyleTag({content})
    }

    /**
     * Create CSS tag link from URL
     * @param url
     * @returns {Promise<*>}
     */
    static addCssFromUrl = async (url) => {
        return await this.currentPage.addStyleTag({url})
    }

    /**
     * Create CSS style from a file
     * @param path
     * @returns {Promise<*>}
     */
    static addCssFromFile = async (path) => {
        return await this.currentPage.addStyleTag({path})
    }

    /**
     * Add JS script to the page
     * @param options = {content, id, path, type, url}
     * @returns {Promise<*>}
     */
    static addJs = async (options) => {
        return await this.currentPage.addScriptTag(options)
    }

    /**
     * The method adds a function called name on the page's window object.
     * @param name
     * @param fn
     * @returns {Promise<*>}
     */
    static addFunction = async (name, fn) => {
        return await this.currentPage.exposeFunction(name, fn)
    }

    /**
     * Gets a list of all open pages inside this Browser.
     * @returns {Promise<*>}
     */
    static pages = async () => {
        return await this.browser.pages()
    }

    /**
     * Get the page by index
     * @param index
     * @returns {Promise<*>}
     */
    static page = async (index) => {
        return typeof index === "undefined" || index === null ? (await this.currentPage) : (await this.pages())[index]
    }

    /**
     * Get the number of open pages inside the Browser.
     * @returns {Promise<*>}
     */
    static pageCount = async () => {
        return (await this.pages()).length
    }

    /**
     * Creates a new page in the default browser context.
     * @returns {Promise<*>}
     */
    static newPage = async () => {
        this.currentPage = await this.browser.newPage()
        this.addEvents()
    }

    /**
     * Set active page
     * @param page - Page object, one of the pages returned by pages()
     * @returns {Promise<void>}
     */
    static setPage = async (page) => {
        this.currentPage = page
        this.addEvents()
    }

    /**
     * Set active page by index
     * @param index
     * @returns {Promise<void>}
     */
    static setPageByIndex = async (index) => {
        this.currentPage = await this.page(index)
        this.addEvents()
    }

    /**
     * Close the current page
     * @param runBeforeOnLoad
     * @returns {Promise<void>}
     */
    static close = async (runBeforeOnLoad = false) => {
        await this.currentPage.close({runBeforeOnLoad})
    }

    static closePage = async (page, runBeforeOnLoad = false) => {
        let pageToCLose

        if (typeof page === 'number') {
            pageToCLose = await this.page(page)
        } else {
            if (page === null || typeof page === "undefined") {
                pageToCLose = this.currentPage
            } else {
                pageToCLose = page
            }
        }

        await pageToCLose.close({runBeforeOnLoad})
    }

    /**
     * Close all pages
     * @param runBeforeOnLoad
     * @returns {Promise<void>}
     */
    static closeAll = async (runBeforeOnLoad = false) => {
        const pages = await this.pages()
        for (let p of pages) {
            await p.close({runBeforeOnLoad})
        }
    }

    /**
     * Execute JavaScript code on current page
     * @param js
     * @param args
     * @returns {Promise<*>}
     */
    static exec = async (js, ...args) => {
        return await this.currentPage.evaluate(js, ...args)
    }

    /**
     * Wait for selector on page
     * @param selector
     * @param options
     * @returns {Promise<*>}
     */
    static waitFor = async (selector, options) => {
        return await this.currentPage.waitForSelector(selector, {...waitForSelectorDefaults, ...options})
    }

    /**
     * Start collecting test coverage statistics
     * @returns {Promise<void>}
     */
    static startCoverage = async (options) => {
        return await this.currentPage.coverage.startJSCoverage({...coverageDefaults, ...options})
    }

    /**
     * Stop collecting test coverage statistics
     * @returns {Promise<{totalBytes: number, usedBytes: number, percentUsed: number, coverage: *}>}
     */
    static stopCoverage = async () => {
        this.coverage = await this.currentPage.coverage.stopJSCoverage()

        // const cov = { result: [] }
        // for (const entry of this.coverage) {
        //     cov.result.push(entry.rawScriptCoverage)
        // }
        //
        // const coverageFiltered = this.filterCoverage(cov)
        //
        // displayReport(coverageFiltered)
        //
        // const fileName = this.options.coverage.reportFileName || global.config.report.fileName
        //
        // createReport(fileName, coverageFiltered)
    }

    /**
     * Filter coverage
     * @param coverage
     * @returns {*}
     */
    static filterCoverage = (coverage) => {
        const filter = typeof this.options.coverage.filter === 'string'
            ? this.options.coverage.filter.split(',')
            : this.options.coverage.filter

        return coverage.result.filter((r) => {
            return matchInArray(r.url, filter)
        })
    }

    /**
     * Go back in history
     * @returns {Promise<*>}
     */
    static async back() {
        return await this.currentPage.goBack()
    }
    
    /**
     * Go forward in history
     * @returns {Promise<*>}
     */
    static async forward() {
        return await this.currentPage.goForward()
    }
    
    /**
     * Reload page
     * @returns {Promise<*>}
     */
    static async reload() {
        return await this.currentPage.reload()
    }

    /**
     * Get the page metrics
     */
    static async metrics() {
        return await this.currentPage.metrics()
    }
}