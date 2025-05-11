const sum = (a,  b) => a + b;

suite('Spy Function', () => {
    it('Test spying', () => {
        const spySum = spy(sum);
        const result = spySum(2, 3);
        expect(result).toBe(5);
        expect(spySum.callCount).toBe(1);
        expect(spySum.calls[0].args).toBeArrayEqual([2, 3]);
    })
})