import { API_URL } from '../../../api/config';
import { getAggregatedWords } from '../../../api/userAggregatedWords';
import { getWords } from '../../../api/words.api';
import { MAX_GROUP } from '../../../helpers/constants';
import { authState } from '../../pages/LogIn';
import { IWord, IAggregatedWord } from './../../../helpers/interfaces';
import WordlistStore from './WordlistStore';

export const getSoundsBnts = () => {
  const soundsBtns = document.querySelectorAll('.audio');
  soundsBtns.forEach((soundBtn, index) =>
    soundBtn.addEventListener('click', () => {
      playSound(index);
    })
  );
};

export const playSound = async (index: number) => {
  stopSound();
  const words: IWord[] | IAggregatedWord[] =
    WordlistStore.textbookGroup !== MAX_GROUP
      ? await getWords(WordlistStore.textbookGroup, WordlistStore.textbookPage)
      : (await getAggregatedWords(authState.userId, WordlistStore.textbookPage))[0].paginatedResults;
  const audioWordLink: string = words[index].audio;
  const audioMeaningLink: string = words[index].audioMeaning;
  const audioExampleLink: string = words[index].audioExample;
  const tracks = [audioWordLink, audioMeaningLink, audioExampleLink];

  const audio = new Audio();
  WordlistStore.isPlaying = audio;
  let current = 0;
  audio.volume = 0.1;
  audio.src = `${API_URL}/${tracks[current]}`;

  audio.addEventListener('ended', () => {
    current++;
    if (current === tracks.length) return;
    audio.src = `${API_URL}/${tracks[current]}`;
    audio.play();
  });
  audio.play();
};

export const stopSound = () => (WordlistStore.isPlaying ? WordlistStore.isPlaying.pause() : '');
