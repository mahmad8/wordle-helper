import { words } from "./Words";

class Solver {
    constructor() {
        this.contains = [];
        this.doesNotContain = [];
        this.equals = [];
    }

    checkEquals(word) {
        var rule;
        for (rule of this.equals) {
            var pos = rule[0];
            var letter = rule[1];
            if (word[pos] !== letter.toLowerCase()) {
                return false;
            }
        }
        return true;
    }

    checkContains(word) {
        return this.contains.length === 0 || this.contains.every(letter => word.includes(letter.toLowerCase()));
    }


    checkDoesNotContain(word) {
        return this.doesNotContain.length === 0 || !(this.doesNotContain.every(letter => word.includes(letter.toLowerCase())));
    }

    solve(board, letters) {
        this.contains = [];
        this.doesNotContain = [];
        this.equals = [];

        var i;
        for (i = 0; i < 25; i++) {
            var x = board[i];
            var letter = letters[i];
            var tuple = [i%5, letter];
            // console.log('pos: ' + i + ' letter: ' + letter + ' board: ' + x);
            if (letter !== undefined && letter !== '' && x !== 0) {
                if (x === 1) { //green
                    // console.log('add rule equals ' + tuple);
                    this.equals.push(tuple);
                } else if (x === 2) { // yellow
                    this.contains.push(letter);
                } else { // grey
                    this.doesNotContain.push(letter);
                }
            }
        }
        var result = [];
        if (this.contains.length === 0 && this.doesNotContain.length === 0 && this.equals.length === 0) {
            return result;
        }
        for (const word of words) {
            // console.log('checking word ' + word);
            if (this.checkEquals(word) && this.checkContains(word) && this.checkDoesNotContain(word)) {
                result.push(word);
            }
        }
        if (result.length > 500) { 
            return ['too many results']; 
        } else {
            return result;
        }
    }
}

export default Solver;