export const renderProgress = (id: string) => `
  <ul class="list-group list-group-horizontal">
    <li id="true-${id}" class="list-group-item list-group-item-success correct-answers">0</li>
    <li id="false-${id}" class="list-group-item list-group-item-danger wrong-answers">0</li>
    <li id="row-${id}" class="list-group-item list-group-item-warning row-answers">0</li>
  </ul>
`;

export const renderMessage = () => `
  <p class="text-warning"><strong>Это слово еще не использовалось в мини-играх!</strong></p>
`;
