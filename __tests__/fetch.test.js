import { afterEach, describe, expect, it, mock } from '../src/index.js'

describe('Fetch Mocking', () => {
    let mockHelper;
    
    afterEach(() => {
        if (mockHelper && mockHelper.reset) {
            mockHelper.reset();
        }
    });
    
    it('Fetch must process successful requests', async () => {
        // Настраиваем мок для fetch
        mockHelper = mock({
            status: 200,
            responseData: { data: 'test' }
        }, 'fetch');
        
        const response = await Window.fetch('/api/data');
        const data = await response.json();
        
        expect(response.status).toBe(200);
        expect(data).toBeObject({ data: 'test' });
        
        // Проверка вызовов
        const calls = mockHelper.calls();
        expect(calls.length).toBe(1);
        expect(calls[0].url).toBe('/api/data');
    });
    
    it('Fetch supports different URLs and delays', async () => {
        mockHelper = mock([
            { url: '/api/users', status: 200, responseData: [{ id: 1 }] },
            { url: '/api/error', status: 500, responseText: 'Error' },
            { url: /\/api\/products\/\d+/, responseData: { id: 42 } }
        ], 'fetch');
        
        const usersResponse = await Window.fetch('/api/users');
        const users = await usersResponse.json();
        expect(users).toBeArray();
        
        const productResponse = await Window.fetch('/api/products/42');
        const product = await productResponse.json();
        expect(product).toBeObject({ id: 42 });
    });
});