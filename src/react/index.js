let React, ReactDOM, ReactTestUtils;

// Функція ініціалізації модуля
export const initReact = () => {
    try {
        // method "require" added globally in registry.js
        React = require('react');
        ReactDOM = require('react-dom/client');

        global.React = React;
        global.ReactDOM = ReactDOM;
        
        return true;
    } catch (error) {
        console.error(`Failed to initialize React: ${error.message}`);
        return false;
    }
};

/**
 * Render a React component into a container.
 * @param Component
 * @param props
 * @param container
 * @returns {Promise<{
 *      container: *, 
 *      unmount: *, 
 *      rerender: *, 
 *      getByText: (function(*): HTMLElement | null), 
 *      getAllByText: (function(*): HTMLElement[] | null), 
 *      getById: (function(*): HTMLElement | null), 
 *      getByClass: (function(*): HTMLElement[] | null), 
 *      $: (function(*): HTMLElement | null), 
 *      $$: (function(*): HTMLElement[] | null), 
 *      fireEvent: {click: *, change: *}, 
 *      debug: *
 * }>}
 */
export const render = async (Component, props = {}, container = null) => {
    let root
    
    if (!React || !ReactDOM) {
        throw new Error('React not initialized. Make sure to call initReact() first.');
    }

    // Якщо контейнер не передано, створюємо новий
    if (!container) {
        container = document.getElementById('root');
        if (!container) {
            container = document.createElement('div');
            document.body.appendChild(container);
            container.setAttribute('id', 'root');
        }
    }

    // Перевірка, чи є createRoot в ReactDOM (React 18+)
    if (ReactDOM.createRoot) {
        root = ReactDOM.createRoot(container);
        await new Promise(resolve => {
            root.render(Component);
            setTimeout(resolve, 10); // Даємо час для завершення рендерингу
        });
    } else {
        ReactDOM.render(Component, container);
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    return {
        root,
        container,
        unmount: () => {
            try {
                if (ReactDOM.createRoot) {
                    // Для React 18+
                    root.unmount();
                } else {
                    // Для React < 18
                    ReactDOM.unmountComponentAtNode(container);
                }
                container.remove();
            } catch (e) {
                console.error('Error when removing the component:', e);
            }
        },
        // Допоміжні методи для пошуку елементів
        getByText: (text) => {
            const elements = Array.from(container.querySelectorAll('*'));
            return elements.find(el => el.textContent === text);
        },
        getAllByText: (text) => {
            const elements = Array.from(container.querySelectorAll('*'));
            return elements.filter(el => el.textContent === text);
        },
        getById: (id) => {
            return container.querySelector(`#${id}`);
        },
        getByClass: (className) => {
            return container.querySelector(`.${className}`);
        },
        $: (selector) => {
            return container.querySelector(selector);
        },
        $$: (selector) => {
            return container.querySelectorAll(selector);
        },
        // Допомога з подіями
        fireEvent: {
            click: (element) => {
                element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            },
            change: (element, value) => {
                element.value = value;
                element.dispatchEvent(new Event('change', { bubbles: true }));
            },
            focus: (element) => {
                element.focus();
            },
            blur: (element) => {
                element.blur();
            },
            keyDown: (element, key = "") => {
                element.dispatchEvent(new KeyboardEvent('keydown', { key }));
            },
            keyUp: (element, key = "") => {
                element.dispatchEvent(new KeyboardEvent('keyup', { key }));
            },
            keyPress: (element, key = "") => {
                element.dispatchEvent(new KeyboardEvent('keypress', { key }));
            },
            submit: (element) => {
                element.dispatchEvent(new Event('submit', { bubbles: true }));
            },
            invalid: (element) => {
                element.dispatchEvent(new Event('invalid', { bubbles: true }));
            },
            reset: (element) => {
                element.dispatchEvent(new Event('reset', { bubbles: true }));
            },
            select: (element) => {
                element.dispatchEvent(new Event('select', { bubbles: true }));
            },
            mouseEnter: (element) => {
                element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            },
            mouseLeave: (element) => {
                element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
            },
            mouseOver: (element) => {
                element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            },
        },
        debug: () => {
            console.log(container.innerHTML);
        }
    };
};

// Функція для створення snapshot тестів
export const snapshot = (rendered) => {
    return rendered.container.innerHTML;
};

// Функція для очищення після тестів
export const cleanup = () => {
    document.body.innerHTML = '';
};