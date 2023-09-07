const Frame = require('./frame');

describe('Frame', () => {

    describe('setScore', () => {

        it('sets a basic score to the object', () => {
            const frame = new Frame();
            frame.setScore(1, 2);
            expect(frame.score).toBe(3);
        });

        it('increases the bonus counter to 2 when a strike is rolled', () => {
            const frame  = new Frame();
            frame.setScore(10);
            expect(frame.bonusCount).toBe(2);
        });

        it('increases the bonus counter to 1 when a spare is rolled', () => {
            const frame = new Frame();
            frame.setScore(0, 10);
            expect(frame.bonusCount).toBe(1);
        });
    });

    describe('setExtraRoll', () => {

        it('increases score by the bonus roll', () => {
            const frame = new Frame();
            frame.setExtraRoll(3, 2);
            expect(frame.score).toBe(3);
        });

        it('increases the bonus count when a strike is rolled and there are more bonus rolls', () => {
            const frame = new Frame();
            frame.setExtraRoll(10, 1);
            expect(frame.bonusCount).toBe(1);
        });
    });

    describe('processBonus', () => {

        it('processes spare bonuses appropriately', () => {
            const frame = new Frame();
            frame.setScore(1, 9);
            frame.processBonus(1);
            expect(frame.score).toBe(11);
        });
    });
});