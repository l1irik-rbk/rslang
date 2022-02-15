export function createDomNode(parent: HTMLElement | null, element: string, content?: string, ...classes: string[]) {
  const elem = document.createElement(element);
  elem.classList.add(...classes);
  if (content) elem.innerText = content;
  if (parent) parent.appendChild(elem);
  return elem;
}
