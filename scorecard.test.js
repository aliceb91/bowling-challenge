const Scorecard = require('./scorecard');

describe('Scorecard', () => {

    it('creates an instance of Scorecard with a starting frame count of 0', () => {
        const scorecard = new Scorecard();
        expect(scorecard.frame).toBe(0);
    });

    describe('addFrame', () => {

        it('adds the score of a single frame to the total score', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(1, 1);
            expect(scorecard.calculateScore()).toBe(2);
        });

        it('increments the frame counter after a new frame is added', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(1, 2);
            expect(scorecard.frame).toBe(1);
        });
    });

    describe('calculateScore', () => {

        it('returns the current value of this.score when called', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(3, 4);
            scorecard.addFrame(2, 4);
            expect(scorecard.calculateScore()).toBe(13);
        });

        it('adjusts roll scores based on a spare', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(4, 6);
            scorecard.addFrame(2, 3);
            expect(scorecard.calculateScore()).toBe(17)
        })

        it('adjusts roll scores based on a strike', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(10);
            scorecard.addFrame(3, 3);
            expect(scorecard.calculateScore()).toBe(22);
        });

        it('adjusts appropriately for multiple strikes and spares', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(10);
            scorecard.addFrame(10);
            scorecard.addFrame(3, 7);
            scorecard.addFrame(10);
            scorecard.addFrame(6, 4);
            scorecard.addFrame(2, 3);
            scorecard.addFrame(1, 1);
            expect(scorecard.calculateScore()).toBe(102);
        });
    });

    describe('#extraRollChecker', () => {

        it('does not change any values when not on the 10th frame', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(10);
            expect(scorecard.extraRoll).toBe(false);
        })

        it('changes the extra roll boolean to true when a strike is scored on the 10th frame', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(1, 1);
            scorecard.addFrame(1, 2);
            scorecard.addFrame(1, 3);
            scorecard.addFrame(1, 4);
            scorecard.addFrame(1, 5);
            scorecard.addFrame(1, 6);
            scorecard.addFrame(1, 7);
            scorecard.addFrame(1, 8);
            scorecard.addFrame(1, 9);
            scorecard.addFrame(10);
            expect(scorecard.extraRoll).toBe(true);
        });

        it('changes the extra roll boolean to true when a spare is scored on the 10th frame', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(1, 1);
            scorecard.addFrame(1, 2);
            scorecard.addFrame(1, 3);
            scorecard.addFrame(1, 4);
            scorecard.addFrame(1, 5);
            scorecard.addFrame(1, 6);
            scorecard.addFrame(1, 7);
            scorecard.addFrame(1, 8);
            scorecard.addFrame(1, 9);
            scorecard.addFrame(0, 10);
            expect(scorecard.extraRoll).toBe(true);
        });

        it('sets the extra roll count to 2 when a strike is scored on the 10th frame', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(1, 1);
            scorecard.addFrame(1, 2);
            scorecard.addFrame(1, 3);
            scorecard.addFrame(1, 4);
            scorecard.addFrame(1, 5);
            scorecard.addFrame(1, 6);
            scorecard.addFrame(1, 7);
            scorecard.addFrame(1, 8);
            scorecard.addFrame(1, 9);
            scorecard.addFrame(10);
            expect(scorecard.extraRollCount).toBe(2);
        });

        it('sets the extra roll count to 1 when a spare is scored on the 10th frame', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(1, 1);
            scorecard.addFrame(1, 2);
            scorecard.addFrame(1, 3);
            scorecard.addFrame(1, 4);
            scorecard.addFrame(1, 5);
            scorecard.addFrame(1, 6);
            scorecard.addFrame(1, 7);
            scorecard.addFrame(1, 8);
            scorecard.addFrame(1, 9);
            scorecard.addFrame(0, 10);
            expect(scorecard.extraRollCount).toBe(1);
        })
    });

    describe('extraRoll', () => {
        
        it('only allows makeExtraRoll to be called when the extraRoll boolean is true', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(1, 2);
            scorecard.makeExtraRoll(4);
            expect(scorecard.calculateScore()).toBe(3);
        });

        it('only allows a single extra roll when a spare is rolled on the 10th frame', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(1, 1);
            scorecard.addFrame(1, 2);
            scorecard.addFrame(1, 3);
            scorecard.addFrame(1, 4);
            scorecard.addFrame(1, 5);
            scorecard.addFrame(1, 6);
            scorecard.addFrame(1, 7);
            scorecard.addFrame(1, 8);
            scorecard.addFrame(1, 9);
            scorecard.addFrame(0, 10);
            scorecard.makeExtraRoll(3);
            scorecard.makeExtraRoll(2);
            expect(scorecard.calculateScore()).toBe(67);
        });

        it('only allows two extra rolls when a strike is rolled on the 10th frame,', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(1, 1);
            scorecard.addFrame(1, 2);
            scorecard.addFrame(1, 3);
            scorecard.addFrame(1, 4);
            scorecard.addFrame(1, 5);
            scorecard.addFrame(1, 6);
            scorecard.addFrame(1, 7);
            scorecard.addFrame(1, 8);
            scorecard.addFrame(1, 9);
            scorecard.addFrame(10);
            scorecard.makeExtraRoll(3);
            scorecard.makeExtraRoll(2);
            scorecard.makeExtraRoll(1);
            expect(scorecard.calculateScore()).toBe(79);
        });

        it('returns 300 on a perfect game', () => {
            const scorecard = new Scorecard();
            scorecard.addFrame(10);
            scorecard.addFrame(10);
            scorecard.addFrame(10);
            scorecard.addFrame(10);
            scorecard.addFrame(10);
            scorecard.addFrame(10);
            scorecard.addFrame(10);
            scorecard.addFrame(10);
            scorecard.addFrame(10);
            scorecard.addFrame(10);
            scorecard.makeExtraRoll(10);
            scorecard.makeExtraRoll(10);
            expect(scorecard.calculateScore()).toBe(300);
        });
    });
});
