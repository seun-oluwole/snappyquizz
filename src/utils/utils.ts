export function decodeHtmlEntities(text: string) {
  const parser: DOMParser = new DOMParser();
  const decodedString = parser.parseFromString(text, 'text/html').documentElement.textContent;
  return decodedString;
}

export default decodeHtmlEntities;