/**
 * Library
 */

export function getItems(item: string): Promise<string[]> {
  return new Promise((resolve: any, reject: any) => {
    window.setTimeout(
      () => resolve([item, 'Other Item', `Another Item ${Math.random()}`]),
      500 + Math.random() * 1000,
    );
  });
}
