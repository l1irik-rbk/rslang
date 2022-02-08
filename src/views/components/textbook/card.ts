import { ICard } from './../../../helpers/interfaces';

export const renderCards = ({ title, text }: ICard) => `
  <div class="col">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${text}</p>
        <a href="#/wordlist" class="btn btn-primary">К списку слов!</a>
      </div>
    </div>
  </div>
`;
