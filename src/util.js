export const NEW_LINE = String.fromCharCode(13, 10);

export const first = (arr = []) => arr[0];
export const last = (arr = []) => arr[arr.length - 1];

export const cleanString = str => {
  return str.replace('\r', '');
};

export const getLines = text => (text ? text.split('\n') : []);

export const identity = v => v;

export const isUndefined = v => v === undefined;
export const isDefined = v => !isUndefined(v);

export const newArray = length => {
  const result = new Array(length);

  while (length--) {
    result[length] = undefined;
  }

  return result;
};

export const range = (_start, _end, _step) => {
  const start = isDefined(_end) ? _start : 0;
  const end = isDefined(_end) ? _end : _start;
  const step = isDefined(_step) ? _step : start < end ? 1 : -1;
  const length = Math.max(Math.ceil((end - start) / (step || 1)), 0);

  return newArray(length).map((_, i) => start + step * i);
};

const chunkBase = (iterable, size = 1, customizer = identity) => {
  if (!iterable.length || Math.floor(size) < 1) return [];

  return range(0, iterable.length, size).map(
    (startIndex, i, startingIndices) => {
      const nextStartIndex = startingIndices[i + 1];
      const endIndex = nextStartIndex || iterable.length;
      return customizer(
        iterable.slice(startIndex, endIndex),
        startIndex,
        endIndex
      );
    }
  );
};

export const chunkString = (str, size = 1) => {
  if (!str.length || Math.floor(size) < 1) return [''];
  return chunkBase(str, size);
};

export const longestLine = text => {
  const lines = getLines(text);

  return lines.reduce(
    (result, line, index) => {
      const cleanedLine = cleanString(line);
      return cleanedLine.length > result.line.length
        ? { line: cleanedLine, index }
        : result;
    },
    { line: '', index: undefined }
  );
};
