import { useState, useEffect } from 'react';

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
};

const adjustColorBrightness = (color, factor) => {
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  r = Math.min(255, Math.max(0, r + factor));
  g = Math.min(255, Math.max(0, g + factor));
  b = Math.min(255, Math.max(0, b + factor));

  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState(getRandomHexColor());
  const [options, setOptions] = useState([]);
  const [status, setStatus] = useState('Guess the correct color!');
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [animateStatus, setAnimateStatus] = useState('');
  const [animateModal, setAnimateModal] = useState(false);

  useEffect(() => {
    generateOptions();
  }, [targetColor]);

  const generateOptions = () => {
    let colors = [targetColor];

    const numShades = 5;
    for (let i = 1; i <= numShades; i++) {
      const lighter = adjustColorBrightness(targetColor, i * 30);
      const darker = adjustColorBrightness(targetColor, -i * 30);
      if (!colors.includes(lighter)) colors.push(lighter);
      if (!colors.includes(darker)) colors.push(darker);
    }

    setOptions(shuffleArray(colors.slice(0, 6)));
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleGuess = (color) => {
    if (rounds > 1) {
      if (color === targetColor) {
        setStatus('Correct! ✅🎉');
        setScore((prev) => prev + 1);
        setAnimateStatus('correct');
        setTimeout(() => setAnimateStatus(''), 2000);
        setTargetColor(getRandomHexColor());
      } else {
        setStatus('Wrong! ❌😢');
        setAnimateStatus('wrong');
        setTimeout(() => setAnimateStatus(''), 2000);
      }
      setRounds((prev) => prev - 1);
    } else {
      if (color === targetColor) {
        setScore((prev) => prev + 1);
      }
      setAnimateModal(true);
      setTimeout(() => setShowModal(true), 300);
    }
  };

  const resetGame = () => {
    setTargetColor(getRandomHexColor());
    setScore(0);
    setRounds(10);
    setStatus('Guess the correct color!');
    setShowModal(false);
    setAnimateModal(false);
  };

  return (
    <section className='container'>
      <div className='game-container'>
        <aside className='game-instructions'>
          <h2 data-testid='gameInstructions'>
            Guess the <span>correct</span> color!
          </h2>
        </aside>
        <section className='score-rounds'>
          <p className='score' data-testid='score'>
            Score: {score}
          </p>
          <p className='rounds'>
            Rounds: {10 - (rounds - 1)}/{10}
          </p>
        </section>
        <div className='colors'>
          <div
            className='color-box'
            style={{ backgroundColor: targetColor }}
            data-testid='colorBox'
          ></div>
          <div className='options'>
            {options.map((color, index) => (
              <button
                key={index}
                className='color-button'
                style={{
                  backgroundColor: color,
                  transition: 'background-color 0.5s ease',
                }}
                onClick={() => handleGuess(color)}
                data-testid='colorOption'
              ></button>
            ))}
          </div>
        </div>
        <p className={`status ${animateStatus}`} data-testid='gameStatus'>
          {status}
        </p>

        <button
          className='new-game'
          onClick={resetGame}
          data-testid='newGameButton'
        >
          Reset
        </button>
        {showModal && (
          <div className={`modal ${animateModal ? 'show' : ''}`}>
            <div className='modal-content'>
              <h2>Game Over!</h2>
              <p>Your final score: {score}</p>
              <button onClick={resetGame} className='new-game'>
                New Game
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ColorGame;
