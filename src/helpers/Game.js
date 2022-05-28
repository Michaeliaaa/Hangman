import { getRandomWord } from "./helpers"

export const GameStatus = {
    LOADING: 0,
    LOADED: 1,
    WIN: 2,
    GAME_OVER: 3,
    INVALID: 4
}
export const GameResponse = {
    INVALID_CHARACTER: 0,
    WIN: 2,
    GAME_OVER: 3,
    INVALID: 4
}
export default class Game {
    constructor(chances = 9) {
        this.chances = chances;
        this.answer = "";
        this.answerCharacters = new Set()
        this.wrongLetters = "";
        this.correctLetters = "";
        this.status = GameStatus.LOADED;
        this.winCount = 0;
        this.loseCount = 0;
        this.userResponse = "";
    }
    handleKeydown(char) {
        if (!this.playable()) {
            return GameResponse.INVALID
        }
        char = char.toLowerCase()
        if (this.correctLetters.includes(char) || this.wrongLetters.includes(char) || !/^[A-Za-z]*$/.test(char) || char.length !== 1) {
            return GameResponse.INVALID_CHARACTER;
        }
        this.userResponse = this.userResponse + char;
        const charInAnswer = this.answer.includes(char);
        if (charInAnswer) {
            this.correctLetters += char;
            if (this.checkWin()) {
                this.status = GameStatus.WIN;
                this.winCount += 1;
                return GameResponse.WIN;
            }
        } else {
            this.wrongLetters += char;
            if (this.checkLose()) {
                this.status = GameStatus.GAME_OVER;
                this.loseCount += 1;
                return GameResponse.GAME_OVER
            }
        }
    }
    checkWin() {
        return this.correctLetters.length === this.answerCharacters.size;
    }
    checkLose() {
        return this.wrongLetters.length === this.chances
    }
    async resetGame() {
        this.wrongAttempts = 0;
        this.wrongLetters = "";
        this.correctLetters = "";
        this.status = GameStatus.LOADING
        await this.getNewWord();
        this.status = GameStatus.LOADED;
    }
    async getNewWord() {
        await getRandomWord().then(word => {
            this.answer = word;
            this.answerCharacters = new Set(word)
        });
    }
    playable() {
        return this.status === GameStatus.LOADED;
    }
}