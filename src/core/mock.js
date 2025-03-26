const mock = (fn = () => {}, name = "mockFn") => {
    const mockFn = function(...args) {
        mockFn.mock.calls.push(args);
        mockFn.mock.contexts.push(this);

        const result = { type: 'return', value: null };

        try {
            if (mockFn.mock.returnValues.length > 0) {
                result.value = mockFn.mock.returnValues.shift();
            } else if (mockFn.mock.implementations.once.length > 0) {
                result.value = mockFn.mock.implementations.once.shift().apply(this, args);
            } else if (mockFn.mock.implementation) {
                result.value = mockFn.mock.implementation.apply(this, args);
            } else {
                result.value = fn.apply(this, args);
            }
        } catch (error) {
            result.type = 'throw';
            result.value = error.message;
            mockFn.mock.results.push(result);
            throw error;
        }

        mockFn.mock.results.push(result);
        return result.value;
    }

    Object.defineProperty(mockFn, 'name', { value: name });
    
    mockFn.mock = {
        calls: [],
        contexts: [],
        returnValues: [],
        implementations: {
            once: []
        },
        implementation: null,
        results: [],
    }

    mockFn.mockReturnValue = (value) => {
        mockFn.mock.returnValues.push(value);
        return mockFn;
    }

    mockFn.mockImplementation = (impl) => {
        mockFn.mock.implementation = impl;
        return mockFn;
    }

    mockFn.mockImplementationOnce = (impl) => {
        mockFn.mock.implementations.once.push(impl);
        return mockFn;
    }

    mockFn.mockReset = () => {
        mockFn.mock.calls = [];
        mockFn.mock.contexts = [];
        mockFn.mock.returnValues = [];
        mockFn.mock.implementations.once = [];
        mockFn.mock.implementation = null;
        mockFn.mock.results = [];
        return mockFn;
    }

    // Mocking async functions
    mockFn.mockResolvedValue = (value) => {
        return mockFn.mockImplementation(() => Promise.resolve(value));
    }

    mockFn.mockRejectedValue = (error) => {
        return mockFn.mockImplementation(() => Promise.reject(error));
    }

    // Mocking functions that throw errors
    mockFn.mockThrow = (error) => {
        return mockFn.mockImplementation(() => {
            throw error;
        });
    }

    return mockFn
}

export default mock