import { Window } from 'happy-dom'

global.XMLHttpRequest = Window.XMLHttpRequest

/**
 * Mock fetch
 * @param config
 * @returns {{reset: *, calls: (function(): *[]), clear: *}}
 */
function mockFetch(config) {
    // Сохраняем оригинальный fetch
    const originalFetch = Window.fetch;
    const calls = [];
    
    // Преобразуем config в массив для поддержки разных URL
    const responses = Array.isArray(config) ? config : [{ url: '*', ...config }];
    
    // Создаем мок функции fetch
    Window.fetch = (url, options = {}) => {
        // Записываем информацию о вызове
        calls.push({ url, options });
        
        // Находим подходящую конфигурацию для данного URL
        const matchingResponse = responses.find(res => 
            res.url === url || res.url === '*' || (res.url instanceof RegExp && res.url.test(url))
        ) || responses.find(res => res.url === '*') || { status: 404 };
        
        const delay = matchingResponse.delay || 0;
        
        const createResponse = () => {
            // Формируем ответ на основе конфигурации
            const status = matchingResponse.status || 200;
            const responseData = matchingResponse.responseData || {};
            const responseText = matchingResponse.responseText || JSON.stringify(responseData);
            const headers = matchingResponse.headers || { 'Content-Type': 'application/json' };
            
            // Имитация ошибки сети
            if (matchingResponse.networkError) {
                return Promise.reject(new Error('Network error'));
            }
            
            // Создаем объект Response
            const response = new Response(responseText, {
                status,
                statusText: matchingResponse.statusText || '',
                headers: new Headers(headers)
            });
            
            return Promise.resolve(response);
        };
        
        // Поддержка задержки
        if (delay > 0) {
            return new Promise(resolve => setTimeout(() => resolve(createResponse()), delay))
                .then(response => response);
        }
        
        return createResponse();
    };
    
    return {
        reset: () => {
            Window.fetch = originalFetch;
        },
        calls: () => [...calls],
        clear: () => {
            calls.length = 0;
        }
    };
}

/**
 * Mock XMLHttpRequest
 * @param config
 * @returns {{reset: *}}
 */
function mockAjax(config) {
    // Сохраняем оригинальную функцию XMLHttpRequest
    const originalXHR = Window.XMLHttpRequest;
    
    // Создаем собственную реализацию XMLHttpRequest
    function MockXHR() {
        // Основные свойства
        this.status = 0;
        this.responseText = '';
        this.readyState = 0;
        this.onload = null;
        this.onerror = null;
        this.onreadystatechange = null;
        
        // Базовые методы
        this.open = function() {};
        this.send = function() {
            setTimeout(() => {
                if (config.responseStatus && config.responseStatus >= 400) {
                    this.status = config.responseStatus;
                    if (this.onerror) this.onerror();
                } else {
                    this.status = config.responseStatus || 200;
                    this.responseText = config.responseText || JSON.stringify(config.responseData || {});
                    if (this.onload) this.onload();
                }
                if (this.onreadystatechange) {
                    this.readyState = 4;
                    this.onreadystatechange();
                }
            }, 0);
        };
        
        // Добавляем пользовательские методы из конфига
        Object.keys(config).forEach(key => {
            if (!['responseStatus', 'responseText', 'responseData'].includes(key)) {
                this[key] = config[key];
            }
        });
    }
    
    // Заменяем XMLHttpRequest нашим моком
    Window.XMLHttpRequest = MockXHR;
    
    return {
        reset: () => {
            Window.XMLHttpRequest = originalXHR;
        }
    };
}

/**
 * Mock function
 * @param fn - function to be mocked or config object for XMLHttpRequest or fetch
 * @param name - name of the function or "fetch" or "ajax"
 * @returns {(function(...[*]): null)|{reset: *}}
 */
const mock = (fn = () => {}, name = 'mockFn') => {
    if (typeof fn === "object") {
        switch (name) {
            case 'fetch':
                return mockFetch(fn);
            case 'ajax':
                return mockAjax(fn);
            default:
                return () => fn
        }
    }
    const mockFn = function (...args) {
        mockFn.mock.calls.push(args)
        mockFn.mock.contexts.push(this)

        const result = { type: 'return', value: null }

        try {
            if (mockFn.mock.returnValues.length > 0) {
                result.value = mockFn.mock.returnValues.shift()
            } else if (mockFn.mock.implementations.once.length > 0) {
                result.value = mockFn.mock.implementations.once.shift().apply(this, args)
            } else if (mockFn.mock.implementation) {
                result.value = mockFn.mock.implementation.apply(this, args)
            } else {
                result.value = fn.apply(this, args)
            }
        } catch (error) {
            result.type = 'throw'
            result.value = error.message
            mockFn.mock.results.push(result)
            throw error
        }

        mockFn.mock.results.push(result)
        mockFn.mock.time = performance.now()
        return result.value
    }

    Object.defineProperty(mockFn, 'name', { value: name })

    mockFn.mock = {
        time: 0,
        calls: [],
        contexts: [],
        returnValues: [],
        implementations: {
            once: []
        },
        implementation: null,
        results: []
    }

    mockFn.mockReturnValue = (value) => {
        mockFn.mock.returnValues.push(value)
        return mockFn
    }

    mockFn.mockImplementation = (impl) => {
        mockFn.mock.implementation = impl
        return mockFn
    }

    mockFn.mockImplementationOnce = (impl) => {
        mockFn.mock.implementations.once.push(impl)
        return mockFn
    }

    mockFn.mockReset = () => {
        mockFn.mock.time = 0
        mockFn.mock.calls = []
        mockFn.mock.contexts = []
        mockFn.mock.returnValues = []
        mockFn.mock.implementations.once = []
        mockFn.mock.implementation = null
        mockFn.mock.results = []
        return mockFn
    }

    // Mocking async functions
    mockFn.mockResolvedValue = (value) => {
        return mockFn.mockImplementation(() => Promise.resolve(value))
    }

    mockFn.mockRejectedValue = (error) => {
        return mockFn.mockImplementation(() => Promise.reject(error))
    }

    // Mocking functions that throw errors
    mockFn.mockThrow = (error) => {
        return mockFn.mockImplementation(() => {
            throw error
        })
    }

    return mockFn
}

export default mock
