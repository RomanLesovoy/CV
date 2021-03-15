export const textToUrl = (text: string) => text
  .replaceAll(' ', '-')
  .replaceAll('/', '')
  .toLowerCase();
