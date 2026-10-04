import { assistantDestination } from './assistant-navigation.registry';

describe('assistantDestination', () => {
    it('uses the municipal shell route outside the private area', () => {
        expect(assistantDestination('publications', 'admin', '/municipal/services')?.path).toBe('/municipal/publications');
    });

    it('uses the private municipal route inside the private area', () => {
        expect(assistantDestination('publications', 'admin', '/home/account')?.path).toBe('/home/municipal/publications');
    });

    it('rejects a destination not present in the citizen menu', () => {
        expect(assistantDestination('requests', 'citizen', '/home/account')).toBeNull();
    });

    it('authorizes each role only for its matching action', () => {
        expect(assistantDestination('my_requests', 'citizen', '/home/account')?.path).toBe('/home/my-requests');
        expect(assistantDestination('requests', 'manager', '/home/account')?.path).toBe('/home/requests');
        expect(assistantDestination('journal', 'agent', '/home/account')?.path).toBe('/home/journal');
    });
});
