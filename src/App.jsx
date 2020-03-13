import React, { useEffect, useRef, useState } from 'react';
import { Input } from './components';
import formatCharsPerLine from './formatCharsPerLine';
import './app.css';

import { longestLine } from './util';

const DEFAULT_CHARACTERS_PER_LINE = 70;

export default function App() {
  const [maxCharactersPerLine, setMaxCharactersPerLine] = useState(
    DEFAULT_CHARACTERS_PER_LINE
  );
  const [text, setText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [hasEditedSinceLastFormat, setHasEditedSinceLastFormat] = useState(
    false
  );
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('./example_text.txt')
      .then(r => r.text())
      .then(text => {
        setText(text);
        setOriginalText(text);
      });
  }, []);

  const handleChangeMaxChars = event => {
    setMaxCharactersPerLine(event.target.value);
  };

  const handleChangeText = event => {
    setHasEditedSinceLastFormat(true);
    setText(event.target.value);
    setOriginalText(event.target.value);
  };

  const handleSubmitFormat = event => {
    event.preventDefault();
    const textToFormat = hasEditedSinceLastFormat ? text : originalText;
    const formattedText = formatCharsPerLine(
      textToFormat,
      maxCharactersPerLine
    );
    setText(formattedText);
    setHasEditedSinceLastFormat(false);

    if (inputRef.current) {
      inputRef.current.select();
    }

    const longest = longestLine(formattedText);
    console.log(
      'Longest line: \n',
      `"${longest.line}"`,
      '\nLength: \n',
      longest.line.length,
      '\nIndex: \n',
      longest.index
    );
  };

  return (
    <div className="app">
      <form className="text-form" onSubmit={handleSubmitFormat}>
        <label className="length__label" htmlFor="length-input">
          Max characters per line:
        </label>
        <Input
          className="length__input"
          id="length-input"
          onChange={handleChangeMaxChars}
          ref={inputRef}
          value={maxCharactersPerLine}
        />
        <button className="format-button" type="submit">
          Format
        </button>
        <textarea className="text" onChange={handleChangeText} value={text} />
      </form>
    </div>
  );
}
