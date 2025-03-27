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
                React.act(() => {
                    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                });
            },
            change: (element, value) => {
                React.act(() => {
                    element.value = value;
                    const event = new Event('change', { bubbles: true });
                    element.dispatchEvent(event);
                });
            },
            focus: (element) => {
                React.act(() => {
                    element.focus();
                });
            },
            blur: (element) => {
                React.act(() => {
                    element.blur();
                });
            },
            keyDown: (element, key) => {
                React.act(() => {
                    const event = new KeyboardEvent('keydown', { key });
                    element.dispatchEvent(event);
                });
            },
            keyUp: (element, key) => {
                React.act(() => {
                    const event = new KeyboardEvent('keyup', { key });
                    element.dispatchEvent(event);
                });
            },
            keyPress: (element, key) => {
                React.act(() => {
                    const event = new KeyboardEvent('keypress', { key });
                    element.dispatchEvent(event);
                });
            },
            submit: (element) => {
                React.act(() => {
                    const event = new Event('submit', { bubbles: true });
                    element.dispatchEvent(event);
                });
            },
            invalid: (element) => {
                React.act(() => {
                    const event = new Event('invalid', { bubbles: true });
                    element.dispatchEvent(event);
                });
            },
            reset: (element) => {
                React.act(() => {
                    const event = new Event('reset', { bubbles: true });
                    element.dispatchEvent(event);
                });
            },
            select: (element) => {
                React.act(() => {
                    const event = new Event('select', { bubbles: true });
                    element.dispatchEvent(event);
                });
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