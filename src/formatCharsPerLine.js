import { cleanString, getLines, NEW_LINE } from './util';

const chunkStringByWord = (string, size = 1) => {
  if (!string.length || Math.floor(size) < 1) return [''];
  if (string.length < size) return [string];

  const words = string.split(' ');

  let result = [];
  for (let i = 0; i < words.length; i += 1) {
    const curWord = words[i];
    const lastResultIndex = Math.max(result.length - 1, 0);
    const curChunk = result[lastResultIndex]
      ? result[lastResultIndex].trim()
      : '';

    const concatenatedChunk =
      curChunk.length > 0 ? `${curChunk} ${curWord}` : curWord;
    // const concatenatedChunk = cleanString(
    //   curChunk.length > 0 ? `${curChunk} ${curWord}` : curWord
    // );
    const isBelowMax = concatenatedChunk.length <= size;

    if (isBelowMax) {
      result[lastResultIndex] = concatenatedChunk;
    } else {
      result.push(curWord);
    }
  }

  return result;
};

const formatCharsPerLine = (text, maxCharactersPerLine) => {
  const lines = getLines(text);

  const formattedText = lines
    .map(line => chunkStringByWord(line, maxCharactersPerLine))
    .flat()
    .filter(line => ![NEW_LINE, '\r'].includes(line))
    .join(NEW_LINE);

  return formattedText;
};

export default formatCharsPerLine;
