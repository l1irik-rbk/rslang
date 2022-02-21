import { createDomNode } from '../../../helpers/utils';
import { AudioCallApp } from './AudioCallApp';
import { VolumeIcon } from './VolumeIcon';
import { API_URL } from '../../../api/config';
import { authState } from '../../pages/LogIn';
import { addCorretAnswer } from '../textbook/learnedWords';

export class WordCardsAudioCall {
  onComplete: () => void | undefined;
  parent: AudioCallApp;
  currWordIndex: number;
  wordListLength: number;

  wordsNumber: HTMLElement;
  gameScore: HTMLElement;

  playButton: HTMLElement;
  buttonNext: HTMLElement;
  buttonDontknow: HTMLElement;
  buttonsAnswer: HTMLElement[];
  rowAnswer: HTMLElement;
  soundWord: HTMLAudioElement;
  soundExample: HTMLAudioElement;
  soundMeaning: HTMLAudioElement;
  cardImg: HTMLElement;
  cardText: HTMLElement;
  blockAnswer: boolean;
  rightAnswerQueue: number;

  constructor(parent: AudioCallApp) {
    this.parent = parent;
    this.blockAnswer = false;
    this.rightAnswerQueue = 0;
    this.currWordIndex = 0;
    this.buttonsAnswer = [];
    this.wordListLength = parent.wordList.length;
    const card = createDomNode(parent.container, 'div', '', 'audiocall');
    this.onComplete = () => undefined;

    this.soundWord = new Audio(`${API_URL}/${this.parent.wordList[this.currWordIndex].audio}`);
    this.soundExample = new Audio(`${API_URL}/${this.parent.wordList[this.currWordIndex].audioExample}`);
    this.soundMeaning = new Audio(`${API_URL}/${this.parent.wordList[this.currWordIndex].audioMeaning}`);

    const cardheader = createDomNode(card, 'div', '', 'row');
    this.wordsNumber = createDomNode(cardheader, 'div', '', 'col-md-6');
    this.gameScore = createDomNode(cardheader, 'div', '', 'col-md-6');

    const cardmain = createDomNode(card, 'div', '', 'row');
    this.cardImg = createDomNode(cardmain, 'div', '', 'col-md-4');
    this.cardText = createDomNode(cardmain, 'div', '', 'col-md-8');

    const row = createDomNode(card, 'div', '', 'row');
    this.playButton = createDomNode(row, 'span', '', 'btn', 'audiocall__play', 'audiocall__play_big');
    this.playButton.innerHTML = VolumeIcon;
    this.playButton.onclick = () => {
      this.soundWord.play();
    };

    this.rowAnswer = createDomNode(card, 'div', '', 'audiocall_buttons', 'text-center');

    const rowButtons = createDomNode(card, 'div', '', 'audiocall_buttons', 'text-center');
    this.buttonDontknow = createDomNode(rowButtons, 'Button', 'Не знаю', 'btn', 'btn-secondary');
    this.buttonDontknow.onclick = () => {
      this.checkAnswer(0);
    };

    this.buttonNext = createDomNode(rowButtons, 'Button', 'Следующее слово', 'btn', 'btn-primary', 'd-none');
    this.buttonNext.onclick = () => {
      this.nexWord();
    };

    document.onkeydown = (event) => {
      this.keyHandler(event);
    };
  }

  start() {
    if (this.currWordIndex < this.wordListLength) {
      this.blockAnswer = false;
      this.wordsNumber.innerHTML = `Слово: ${this.currWordIndex + 1}/${this.parent.wordList.length}`;
      this.gameScore.innerHTML = `Очки: ${this.parent.totalPoints}/100`;

      this.buttonDontknow.classList.remove('d-none');
      this.playButton.classList.remove('d-none');
      this.buttonNext.classList.add('d-none');

      this.cardImg.innerHTML = ``;
      this.cardText.innerHTML = ``;

      this.soundExample = new Audio(`${API_URL}/${this.parent.wordList[this.currWordIndex].audioExample}`);
      this.soundMeaning = new Audio(`${API_URL}/${this.parent.wordList[this.currWordIndex].audioMeaning}`);

      this.soundWord = new Audio(`${API_URL}/${this.parent.wordList[this.currWordIndex].audio}`);
      this.soundWord.play();

      // buttons answer
      this.rowAnswer.innerHTML = '';
      this.buttonsAnswer = [];
      this.parent.wordList[this.currWordIndex].testAnswerList.map((e, index) => {
        this.buttonsAnswer.push(
          createDomNode(this.rowAnswer, 'button', `${index + 1} - ${e}`, 'btn', 'btn-outline-secondary')
        );
        this.buttonsAnswer.map(
          (e, index) =>
            (e.onclick = () => {
              this.checkAnswer(index + 1);
            })
        );
      });
    } else {
      document.onkeydown = null;
      this.onComplete();
    }
  }
  checkAnswer(index: number) {
    if (this.blockAnswer === false) {
      this.blockAnswer = true;
      const currentWord = this.parent.wordList[this.currWordIndex];
      const trueWordRu = currentWord.wordTranslate;
      const indexTrueWordRu = currentWord.testAnswerList.indexOf(trueWordRu);

      if (0 < index && index <= 5) {
        if (index - 1 === indexTrueWordRu) {
          this.parent.totalPoints += 5;
          this.parent.wordList[this.currWordIndex].userAnswer = true;
          this.rightAnswerQueue += 1;
          if (this.rightAnswerQueue > this.parent.rightAnswerQueueMax)
            this.parent.rightAnswerQueueMax = this.rightAnswerQueue;
        } else {
          this.buttonsAnswer[index - 1].classList.remove('btn-outline-secondary');
          this.buttonsAnswer[index - 1].classList.add('btn-danger');
          this.parent.wordList[this.currWordIndex].userAnswer = false;
          this.rightAnswerQueue = 0;
        }
      }

      if (authState.isAuthenticated) {
        addCorretAnswer.call(this, this.parent.wordList[this.currWordIndex].userAnswer);
      }

      this.buttonsAnswer[indexTrueWordRu].classList.remove('btn-outline-secondary');
      this.buttonsAnswer[indexTrueWordRu].classList.add('btn-success');
      this.buttonsAnswer.map((e) => e.classList.add('disabled'));
      this.gameScore.innerHTML = `Score: ${this.parent.totalPoints}/100`;
      this.playButton.classList.add('d-none');
      this.buttonDontknow.classList.add('d-none');
      this.buttonNext.classList.remove('d-none');
      this.cardImg.innerHTML = `<img src='${API_URL}/${currentWord.image}'>`;

      const wordEnblock = createDomNode(this.cardText, 'p', '', 'audiocall__word');
      const playButtonWord = createDomNode(wordEnblock, 'span', '', 'btn', 'audiocall__play');
      playButtonWord.innerHTML = VolumeIcon;
      playButtonWord.onclick = () => {
        this.soundExample.pause();
        this.soundMeaning.pause();
        this.soundWord.play();
      };
      const wordEn = createDomNode(wordEnblock, 'span', '');
      wordEn.innerHTML = `<b>${currentWord.word}</b> ${currentWord.transcription}`;

      const textExampleBlock = createDomNode(this.cardText, 'p', '', 'audiocall__text');
      const playButtonExample = createDomNode(textExampleBlock, 'span', '', 'btn', 'audiocall__play');
      playButtonExample.innerHTML = VolumeIcon;
      playButtonExample.onclick = () => {
        this.soundMeaning.pause();
        this.soundExample.currentTime = 0;
        this.soundExample.play();
      };
      const wordEnExample = createDomNode(textExampleBlock, 'span', '');
      wordEnExample.innerHTML = currentWord.textExample;

      const textExampleTranslate = createDomNode(this.cardText, 'p', '', 'audiocall__text', 'audiocall__text_ru');
      textExampleTranslate.innerHTML = currentWord.textExampleTranslate;

      const textMeaningBlock = createDomNode(this.cardText, 'p', '', 'audiocall__text');
      const playButtonMeaning = createDomNode(textMeaningBlock, 'span', '', 'btn', 'audiocall__play');
      playButtonMeaning.innerHTML = VolumeIcon;
      playButtonMeaning.onclick = () => {
        this.soundExample.pause();
        this.soundMeaning.currentTime = 0;
        this.soundMeaning.play();
      };
      const textEnMeaning = createDomNode(textMeaningBlock, 'span', '');
      textEnMeaning.innerHTML = currentWord.textMeaning;

      const textMeaningTranslate = createDomNode(this.cardText, 'p', '', 'audiocall__text', 'audiocall__text_ru');
      textMeaningTranslate.innerHTML = currentWord.textMeaningTranslate;
    } else if (index === 0 && this.blockAnswer === true) {
      this.nexWord();
    }
  }
  nexWord() {
    this.currWordIndex += 1;
    this.blockAnswer = false;
    this.start();
  }
  keyHandler(event: KeyboardEvent) {
    switch (event.code) {
      case 'Digit1':
        this.checkAnswer(1);
        break;
      case 'Digit2':
        this.checkAnswer(2);
        break;
      case 'Digit3':
        this.checkAnswer(3);
        break;
      case 'Digit4':
        this.checkAnswer(4);
        break;
      case 'Digit5':
        this.checkAnswer(5);
        break;
      case 'Space':
        this.soundWord.play();
        break;
      case 'Enter':
        this.checkAnswer(0);
        break;
    }
  }
}
