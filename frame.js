class Frame {
    constructor() {
        this.score = 0;
        this.bonusCount = 0;
        this.bonusRolls = [];
    }

    setScore(roll1, roll2 = 0) {
        if (roll1 === 10) {
            this.bonusCount += 2;
        } else if (roll1 + roll2 === 10) {
            this.bonusCount += 1;
        } else {
            this.score += roll1;
            this.score += roll2;
        }
    }

    setExtraRoll(roll, extraRollCount) {
        if (roll === 10 && extraRollCount > 0) {
            this.bonusCount += 1;
        } else if (roll === 10 && extraRollCount === 0) {
            this.score += roll;
        } else {
            this.score += roll;
        }
    }

    processBonus(roll) {
        this.bonusRolls.push(roll);
        this.bonusCount -= 1;
        if (this.bonusCount === 0) {
            this.bonusRolls.forEach((roll) => {
                this.score += roll;
            });
            this.score += 10;
        }
    }
}

module.exports = Frame;