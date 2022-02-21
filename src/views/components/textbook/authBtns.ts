export const renderAuthBtns = (id: string) => `
  <div class="d-flex justify-content-between">
    <div class="btn-groupl">
      <button id="diff-${id}" type="button" class="btn difficult-btn btn-outline-danger">Сложное</button>
      <button id="std-${id}" type="button" class="btn study-btn btn-outline-success">Изученное</button>
    </div>
  </div>
`;
