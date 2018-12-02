export function autocomplete() {
  const $title = document.getElementById('title');
  const $results = document.getElementById('results');
  const eventName: any = 'keyup';
  if ($title != null && $results != null) {
    $title.addEventListener(eventName, (event: KeyboardEvent) => {
      const titleValue = (event.target as HTMLInputElement).value;
      showSuggest(titleValue, 'li').then(($items: HTMLLIElement[]) => {
        $results.innerHTML = '';
        $items.map(item => $results.appendChild(item));
      });
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

/**
 * Library
 */

function getItems(item: string): Promise<string[]> {
  return new Promise((resolve: any, reject: any) => {
    window.setTimeout(
      () => resolve([item, 'Other Item', `Another Item Math.random()`]),
      500 + Math.random() * 1000,
    );
  });
}
