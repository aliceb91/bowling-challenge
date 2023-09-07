const Frame = require('./frame');

class Scorecard {
    constructor() {
        this.frame = 0;
        this.frames = [];
        this.extraRoll = false;
        this.extraRollCount = 0;
    }

    addFrame(roll1, roll2 = null) {
        this.frame += 1;
        const newFrame = new Frame();
        newFrame.setScore(roll1, roll2);
        this.frames.forEach((frame) => {
            frame.processBonus(roll1);
        })
        if (roll2 !== null) {
            this.frames.forEach((frame) => {
                frame.processBonus(roll2);
            });
        }
        this.frames.push(newFrame);
        this.#extraRollChecker(roll1, roll2);
        return;
    }

    makeExtraRoll(roll) {
        if (this.extraRoll === false) {
            return "You're not allowed an extra roll!"
        } else {
            this.extraRollCount -= 1;
            const newFrame = new Frame();
            newFrame.setExtraRoll(roll);
            this.frames.forEach((frame) => {
                frame.processBonus(roll);
            });
        }
    }

    calculateScore() {
        let counter = 0;
        this.frames.forEach((frame) => {
            counter += frame.score;
        });
        return counter;
    }

    #extraRollChecker(roll1, roll2) {
        if (this.frame === 10) {
            this.extraRoll = true;
            if (roll1 === 10) {
                this.extraRollCount = 2;
            } else if (roll1 + roll2 === 10) {
                this.extraRollCount = 1;
            }
        return;
        }
    }
}

module.exports = Scorecard;