import { getItems } from './../lib/suggest';

export function autocomplete() {
  const $title = document.getElementById('title');
  const $results = document.getElementById('results');
  const eventName: any = 'keyup';
  let lastQuery: string | null = null;
  const lastTimeOut: number | null = null;
  let nextQueryId: number = 0;
  if ($title != null && $results != null) {
    $title.addEventListener(eventName, (event: KeyboardEvent) => {
      const titleValue = (event.target as HTMLInputElement).value;
      if (titleValue === lastQuery) {
        return;
      }
      lastQuery = titleValue;
      if (lastTimeOut) {
        window.clearTimeout(lastTimeOut);
      }
      const currentQueryId = ++nextQueryId;
      window.setTimeout(() => {
        showSuggest(titleValue, 'li').then(($items: HTMLLIElement[]) => {
          if (currentQueryId === nextQueryId) {
            $results.innerHTML = '';
            $items.map(item => $results.appendChild(item));
          }
        });
      }, 500);
    });
  }
}

function showSuggest(text: string, element: string): Promise<any> {
  return getItems(text).then((items: string[]) => {
    return items.map((item: string) => {
      const liElement = document.createElement(element);
      liElement.textContent = item;
      return liElement;
    });
  });
}
