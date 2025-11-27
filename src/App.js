import React, { useState } from 'react';

export default function PartyGame() {
  const [gameState, setGameState] = useState('setup');
  const [playerCount, setPlayerCount] = useState(3);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [wordList] = useState([
    'Pizza', 'Dinosaur', 'Ocean', 'Guitar', 'Moonlight',
    'Volcano', 'Penguin', 'Skateboard', 'Telescope', 'Butterfly',
    'Thunder', 'Garden', 'Pirate', 'Rainbow', 'Spaceship',
    'Elephant', 'Fireworks', 'Jungle', 'Bicycle', 'Cheese'
  ]);
  const [currentWord, setCurrentWord] = useState('');
  const [cluelessPlayer, setCluelessPlayer] = useState(null);
  const [roundActive, setRoundActive] = useState(false);

  const startGame = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    const randomClueless = Math.floor(Math.random() * playerCount);
    
    setCurrentWord(randomWord);
    setCluelessPlayer(randomClueless);
    setCurrentPlayerIndex(0);
    setRoundActive(false);
    setGameState('reveal');
  };

  const handleReveal = () => {
    setRoundActive(true);
  };

  const handleNextPlayer = () => {
    if (currentPlayerIndex < playerCount - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setRoundActive(false);
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setPlayerCount(3);
    setCurrentPlayerIndex(0);
    setRoundActive(false);
    setShowInstructions(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      padding: '40px',
      maxWidth: '500px',
      width: '100%'
    },
    title: {
      fontSize: '3rem',
      color: '#667eea',
      textAlign: 'center',
      marginBottom: '10px',
      fontWeight: '800'
    },
    subtitle: {
      textAlign: 'center',
      color: '#666',
      marginBottom: '40px',
      fontSize: '0.95rem'
    },
    playerSelector: {
      background: '#f3f4ff',
      borderRadius: '12px',
      padding: '30px',
      marginBottom: '40px'
    },
    label: {
      display: 'block',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '20px'
    },
    playerControls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    },
    playerCount: {
      fontSize: '3.5rem',
      fontWeight: '700',
      color: '#667eea',
      width: '80px',
      textAlign: 'center'
    },
    button: {
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    buttonSmall: {
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 24px',
      fontSize: '1.5rem',
      fontWeight: '700',
      cursor: 'pointer'
    },
    buttonLarge: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '18px',
      fontSize: '1.2rem',
      width: '100%',
      fontWeight: '600',
      cursor: 'pointer'
    },
    buttonReveal: {
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '24px',
      fontSize: '1.3rem',
      width: '100%',
      fontWeight: '600',
      cursor: 'pointer'
    },
    buttonNext: {
      background: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '18px',
      fontSize: '1.2rem',
      width: '100%',
      fontWeight: '600',
      cursor: 'pointer'
    },
    smallText: {
      textAlign: 'center',
      color: '#999',
      fontSize: '0.85rem',
      marginTop: '15px'
    },
    playerInfo: {
      textAlign: 'center',
      color: '#666',
      marginBottom: '30px',
      fontSize: '0.95rem'
    },
    instruction: {
      textAlign: 'center',
      color: '#666',
      marginBottom: '30px',
      fontWeight: '600'
    },
    wordDisplay: {
      background: 'linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)',
      borderRadius: '12px',
      padding: '60px 20px',
      marginBottom: '30px',
      textAlign: 'center',
      minHeight: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    word: {
      fontSize: '3rem',
      fontWeight: '800',
      color: '#667eea'
    },
    wordClueless: {
      fontSize: '3rem',
      fontWeight: '800',
      color: '#e53e3e'
    },
    instructionsButton: {
      background: 'transparent',
      color: '#667eea',
      border: '2px solid #667eea',
      borderRadius: '12px',
      padding: '12px 24px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '20px',
      width: '100%'
    },
    instructionsOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 1000
    },
    instructionsModal: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '500px',
      width: '100%',
      maxHeight: '80vh',
      overflowY: 'auto'
    },
    instructionsTitle: {
      fontSize: '2rem',
      color: '#667eea',
      marginBottom: '20px',
      fontWeight: '700'
    },
    instructionsText: {
      color: '#333',
      lineHeight: '1.6',
      marginBottom: '15px',
      fontSize: '0.95rem'
    },
    instructionsStep: {
      background: '#f3f4ff',
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '10px'
    },
    closeButton: {
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
      marginTop: '20px'
    }
  };

  if (gameState === 'setup') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>CLUELESS</h1>
          <p style={styles.subtitle}>The party game where one player is in the dark</p>
          
          <div style={styles.playerSelector}>
            <label style={styles.label}>How many players?</label>
            <div style={styles.playerControls}>
              <button
                style={styles.buttonSmall}
                onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
              >
                -
              </button>
              <div style={styles.playerCount}>{playerCount}</div>
              <button
                style={styles.buttonSmall}
                onClick={() => setPlayerCount(Math.min(12, playerCount + 1))}
              >
                +
              </button>
            </div>
            <p style={styles.smallText}>3-12 players recommended</p>
          </div>

          <button style={styles.buttonLarge} onClick={startGame}>
            Start Game
          </button>
          
          <button style={styles.instructionsButton} onClick={() => setShowInstructions(true)}>
            How to Play
          </button>
        </div>
        
        {showInstructions && (
          <div style={styles.instructionsOverlay} onClick={() => setShowInstructions(false)}>
            <div style={styles.instructionsModal} onClick={(e) => e.stopPropagation()}>
              <h2 style={styles.instructionsTitle}>How to Play Clueless</h2>
              
              <div style={styles.instructionsStep}>
                <p style={styles.instructionsText}>
                  <strong>1. Setup:</strong> Select the number of players and start the game.
                </p>
              </div>
              
              <div style={styles.instructionsStep}>
                <p style={styles.instructionsText}>
                  <strong>2. Secret Word:</strong> Each player will be shown a word one at a time. Remember: ONE random player will see "CLUELESS" instead!
                </p>
              </div>
              
              <div style={styles.instructionsStep}>
                <p style={styles.instructionsText}>
                  <strong>3. The Challenge:</strong> Go around the group and each person says ONE word related to the secret word. The clueless player must try to blend in without knowing what the word is!
                </p>
              </div>
              
              <div style={styles.instructionsStep}>
                <p style={styles.instructionsText}>
                  <strong>4. Win Condition:</strong> After a few rounds, discuss and vote on who you think was clueless. If the group guesses correctly, they win! If the clueless player goes undetected, they win!
                </p>
              </div>
              
              <p style={{...styles.instructionsText, marginTop: '20px', fontStyle: 'italic'}}>
                Tip: The clueless player should listen carefully to others' words and try to give something vague that could fit many topics!
              </p>
              
              <button style={styles.closeButton} onClick={() => setShowInstructions(false)}>
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'reveal') {
    const isCurrentPlayerClueless = currentPlayerIndex === cluelessPlayer;
    const displayWord = isCurrentPlayerClueless ? 'CLUELESS' : currentWord;
    
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={styles.playerInfo}>
            Player {currentPlayerIndex + 1} of {playerCount}
          </p>

          {!roundActive ? (
            <>
              <p style={styles.instruction}>
                Hand the phone to Player {currentPlayerIndex + 1}
              </p>
              <button style={styles.buttonReveal} onClick={handleReveal}>
                REVEAL WORD
              </button>
            </>
          ) : (
            <>
              <div style={styles.wordDisplay}>
                <p style={isCurrentPlayerClueless ? styles.wordClueless : styles.word}>
                  {displayWord}
                </p>
              </div>
              <p style={styles.instruction}>
                {isCurrentPlayerClueless ? "Don't let them know you're clueless!" : 'Remember this word!'}
              </p>
              <button style={styles.buttonNext} onClick={handleNextPlayer}>
                {currentPlayerIndex === playerCount - 1 ? 'Start Game' : 'Next Player'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}