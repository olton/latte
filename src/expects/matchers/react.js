export default {
    async toRenderWithoutError(msg = null) {
        const Component = this.received;
        let result = false;
        let errorMessage = '';

        try {
            const { unmount } = await R.render(Component);
            unmount(); // Важливо демонтувати компонент після тесту
        } catch (error) {
            result = true;
            errorMessage = error.message;
        }

        this.assert(
            !result,
            msg,
            'toRenderWithoutErrors',
            null,
            errorMessage
        );

        return this;
    },

    async toRenderText(expected, msg = null) {
        const Component = this.received;
        const { unmount, getByText } = await R.render(Component);
        let result = false;

        try {
            result = !!getByText(expected);
        } finally {
            unmount(); // Важливо демонтувати компонент після тесту
        }

        this.assert(
            result,
            msg,
            'toRenderText',
            expected,
            null
        );

        return this;
    },

    async toContainElement(selector, msg = null) {
        const Component = this.received;
        const { unmount, $ } = await R.render(Component);
        let result = false;

        try {
            const element = $(selector);
            result = !!element;
        } finally {
            unmount();
        }

        this.assert(
            result,
            msg,
            'toContainElement',
            selector,
            null
        );

        return this;
    },

    async toHaveElementCount(selector, expectedCount, msg = null) {
        const Component = this.received;
        const { unmount, $$ } = await R.render(Component);
        let result = false;
        let actualCount = 0;
        
        try {
            const elements = $$(selector);
            actualCount = elements.length;
            result = actualCount === expectedCount;
        } finally {
            unmount();
        }

        this.assert(
            result,
            msg,
            'toHaveElementCount',
            `Expected ${expectedCount} elements`,
            `Found ${actualCount} elements`
        );

        return this;
    },

    async toTriggerEvent(selector, event, callback, data, msg = null) {
        const Component = this.received;
        const { unmount, $, fireEvent } = await R.render(Component);
        let wasCalled = false;

        try {
            const originalCallback = callback;
            callback = function(...args) {
                wasCalled = true;
                return originalCallback && originalCallback.apply(this, args);
            };

            const element = $(selector);
            if (!element) {
                this.assert(
                    false,
                    `Element by selector "$ {Selector}" not found`,
                    'toTriggerEventHandler',
                );
                return this;
            }

            element.addEventListener(event, callback);

            if (fireEvent[event]) {
                fireEvent[event](element, data);
            } else {
                const customEvent = new Event(event);
                element.dispatchEvent(customEvent);
            }
        } finally {
            unmount();
        }

        this.assert(
            wasCalled,
            msg,
            'toTriggerEventHandler',
            event,
            null
        );

        return this;
    },

}