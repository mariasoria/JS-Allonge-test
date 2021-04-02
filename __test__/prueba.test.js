describe('Have && and || the same level of priority?', () => {
    it('', () => {
        expect((true || false) && (false || false)).toBeFalsy();
        expect(true || false && false || false).toBeTruthy();

        expect((((true || false) && false ) || false)).toBeFalsy();
        expect(true || false).toBeTruthy();
        expect(true && false).toBeFalsy();
        expect(false || false).toBeFalsy();


        expect(((true || false && false ) || false)).toBeTruthy();
        expect(false && false).toBeFalsy();
        expect(((true || false ) || false)).toBeTruthy();


        expect(true || false).toBeTruthy();
        expect(true && false || false).toBeFalsy();


        expect(true || false && (false || false)).toBeTruthy();
        expect(true || (false && false) || false).toBeTruthy();

        expect(true || false && false || true).toBeTruthy();
        expect(true || false && (false || true)).toBeTruthy();
        expect(true || (false && false) || true).toBeTruthy();

        expect(true || false && true || false).toBeTruthy();
        expect(true || false && (true || false)).toBeTruthy();
        expect(true || (false && true) || false).toBeTruthy();

        expect(false || true && false || false).toBeFalsy();
        expect(false || true && (false || false)).toBeFalsy();
        expect(false || (true && false) || false).toBeFalsy();

        expect((((true || false) && false ) || false)).toBeFalsy();
        expect(((true && false ) || false)).toBeFalsy();
    });
});