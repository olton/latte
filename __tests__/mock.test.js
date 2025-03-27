describe(`Mock tests`, () => {
    it('toHaveBeenCalled', () => {
        const mockFn = mock()
        mockFn()
        expect(mockFn).toHaveBeenCalled()
    })
    it('toHaveBeenCalledTimes = 2', () => {
        const mockFn = mock()
        mockFn()
        mockFn()
        expect(mockFn).toHaveBeenCalledTimes(2)
    })
    it('toHaveBeenCalledWith = 2', () => {
        const mockFn = mock()
        mockFn(2)
        expect(mockFn).toHaveBeenCalledWith([2])
    })
    it('toHaveBeenLastCalledWith = 3', () => {
        const mockFn = mock()
        mockFn(2)
        mockFn(3)
        expect(mockFn).toHaveBeenLastCalledWith([3])
    })
})

describe('Mock function with extensions', () => {
    it('should return specified value', () => {
        const mockFn = mock().mockReturnValue(42);
        expect(mockFn()).toBe(42);
    });

    it('should return specified value once', () => {
        const mockFn = mock().mockImplementationOnce(() => 42);
        expect(mockFn()).toBe(42);
        expect(mockFn()).toBeUndefined();
    });

    it('Implementation, should return specified value', () => {
        const mockFn = mock().mockImplementation(() => 42);
        expect(mockFn()).toBe(42);
        expect(mockFn()).toBe(42);
    })

    it('should return specified value', () => {
        const mockFn = mock((a, b) => a + b);
        expect(mockFn(1, 2)).toBe(3);
        expect(mockFn("Hello", " World!")).toBe("Hello World!");
    })

    it('should resolve with specified value', async () => {
        const mockFn = mock().mockResolvedValue('resolved');
        await expect(mockFn()).toBeResolvedWith('resolved');
    });

    it('should reject with specified error', async () => {
        const mockFn = mock().mockRejectedValue('rejected');
        await expect(mockFn()).toBeRejectedWith('rejected');
    });

    it('should throw specified error', () => {
        const mockFn = mock().mockThrow(new Error('thrown'));
        expect(() => mockFn()).toThrow('thrown');
    });

    it('should track call contexts', () => {
        const context1 = { a: 1 };
        const context2 = { b: 2 };
        const mockFn = mock();
        mockFn.call(context1);
        mockFn.call(context2);
        expect(mockFn.mock.contexts).toBeArrayEqual([context1, context2]);
    });

    it('should reset mock function', () => {
        const mockFn = mock().mockReturnValue(42);
        mockFn();
        mockFn.mockReset();
        expect(mockFn.mock.calls.length).toBe(0);
        expect(mockFn.mock.contexts.length).toBe(0);
        expect(mockFn()).toBeUndefined();
    });
});

describe('Tracking results', () => {
    it('should track results', () => {
        const mockFn = mock()
            .mockReturnValue(42)
            .mockImplementationOnce(() => { throw new Error('test error'); });

        expect(mockFn()).toBe(42);

        try {
            mockFn();
        } catch (e) {
            // Ошибка поймана
        }

        expect(mockFn.mock.results[0]).toBeObject({ type: 'return', value: 42 });
        expect(mockFn.mock.results[1]).toBeObject({ type: 'throw', value: 'test error' });
    });
})