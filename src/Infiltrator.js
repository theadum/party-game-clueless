import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const WORD_LIST = [
  'Lighthouse', 'Volcano', 'Penguin', 'Telescope', 'Cactus', 'Submarine',
  'Windmill', 'Kangaroo', 'Chandelier', 'Pyramid', 'Octopus', 'Saxophone',
  'Avalanche', 'Chameleon', 'Gondola', 'Fireworks', 'Glacier', 'Hamster',
  'Igloo', 'Jellyfish', 'Kaleidoscope', 'Ladybug', 'Mosquito', 'Narwhal',
  'Origami', 'Platypus', 'Quicksand', 'Rollercoaster', 'Scarecrow', 'Trampoline',
  'Umbrella', 'Vampire', 'Waterfall', 'Xylophone', 'Yogurt', 'Zeppelin',
  'Astronaut', 'Butterfly', 'Crocodile', 'Dinosaur', 'Elephant', 'Flamingo',
  'Giraffe', 'Helicopter', 'Iceberg', 'Jungle', 'Keyboard', 'Lemonade',
  'Mermaid', 'Nightmare', 'Orchestra', 'Parachute', 'Quicksilver', 'Rainbow'
];

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
    fontFamily: "'Courier New', monospace",
    color: '#e0e0e0',
    position: 'relative',
    overflow: 'hidden',
  },
  scanlines: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
    pointerEvents: 'none',
    zIndex: 100,
  },
  content: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '40px 20px',
    position: 'relative',
    zIndex: 10,
  },
  title: {
    fontFamily: "'Times New Roman', serif",
    fontSize: '3rem',
    fontWeight: 400,
    letterSpacing: '0.3em',
    textAlign: 'center',
    color: '#ff3b3b',
    textShadow: '0 0 20px rgba(255,59,59,0.5), 0 0 40px rgba(255,59,59,0.3)',
    marginBottom: '10px',
    textTransform: 'uppercase',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '0.75rem',
    letterSpacing: '0.5em',
    color: '#666',
    marginBottom: '50px',
    textTransform: 'uppercase',
  },
  card: {
    background: 'rgba(20, 20, 30, 0.9)',
    border: '1px solid #333',
    borderRadius: '2px',
    padding: '30px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
  },
  input: {
    width: '100%',
    padding: '15px',
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid #444',
    borderRadius: '0',
    color: '#e0e0e0',
    fontSize: '1rem',
    fontFamily: "'Courier New', monospace",
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '15px 30px',
    background: 'linear-gradient(180deg, #ff3b3b 0%, #cc0000 100%)',
    border: 'none',
    borderRadius: '0',
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: "'Courier New', monospace",
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 15px rgba(255,59,59,0.3)',
  },
  buttonSecondary: {
    width: '100%',
    padding: '15px 30px',
    background: 'transparent',
    border: '1px solid #ff3b3b',
    borderRadius: '0',
    color: '#ff3b3b',
    fontSize: '0.9rem',
    fontFamily: "'Courier New', monospace",
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  roleCard: {
    textAlign: 'center',
    padding: '40px',
  },
  roleTitle: {
    fontSize: '0.8rem',
    letterSpacing: '0.5em',
    color: '#666',
    marginBottom: '20px',
    textTransform: 'uppercase',
  },
  roleName: {
    fontSize: '2.5rem',
    fontFamily: "'Times New Roman', serif",
    letterSpacing: '0.2em',
    marginBottom: '20px',
  },
  masterRole: {
    color: '#ffd700',
    textShadow: '0 0 20px rgba(255,215,0,0.5)',
  },
  infiltratorRole: {
    color: '#ff3b3b',
    textShadow: '0 0 20px rgba(255,59,59,0.5)',
  },
  followerRole: {
    color: '#4a9eff',
    textShadow: '0 0 20px rgba(74,158,255,0.5)',
  },
  playerList: {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0',
  },
  playerItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 15px',
    background: 'rgba(0,0,0,0.3)',
    marginBottom: '8px',
    borderLeft: '3px solid #ff3b3b',
  },
  playerNumber: {
    color: '#666',
    fontSize: '0.8rem',
  },
  secretWord: {
    fontSize: '4rem',
    fontFamily: "'Times New Roman', serif",
    color: '#ff3b3b',
    textAlign: 'center',
    textShadow: '0 0 30px rgba(255,59,59,0.8), 0 0 60px rgba(255,59,59,0.4)',
    letterSpacing: '0.1em',
    animation: 'pulse 2s ease-in-out infinite',
    width: '100%',
    wordBreak: 'break-word',
  },
  timer: {
    fontSize: '6rem',
    fontFamily: "'Courier New', monospace",
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff3b3b',
    textShadow: '0 0 30px rgba(255,59,59,0.8)',
  },
  timerWarning: {
    color: '#ff0000',
    animation: 'blink 0.5s ease-in-out infinite',
  },
  instruction: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#999',
    textAlign: 'center',
    marginBottom: '30px',
  },
  voteButton: {
    padding: '15px',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid #444',
    color: '#e0e0e0',
    fontSize: '1rem',
    fontFamily: "'Courier New', monospace",
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginBottom: '8px',
    width: '100%',
    textAlign: 'left',
  },
  voteButtonSelected: {
    background: 'rgba(255,59,59,0.2)',
    borderColor: '#ff3b3b',
    color: '#ff3b3b',
  },
  resultBox: {
    textAlign: 'center',
    padding: '30px',
    background: 'rgba(0,0,0,0.3)',
    marginBottom: '20px',
  },
  winText: {
    fontSize: '2rem',
    fontFamily: "'Times New Roman', serif",
    marginBottom: '10px',
  },
  winTeam: {
    color: '#4aff4a',
    textShadow: '0 0 20px rgba(74,255,74,0.5)',
  },
  loseTeam: {
    color: '#ff3b3b',
    textShadow: '0 0 20px rgba(255,59,59,0.5)',
  },
};

const GAME_PHASES = {
  SETUP: 'setup',
  PLAYER_ENTRY: 'player_entry',
  HAND_DEVICE: 'hand_device',
  ROLE_REVEAL: 'role_reveal',
  MASTER_REVEAL: 'master_reveal',
  SHOW_WORD: 'show_word',
  GAME_START: 'game_start',
  TIMER_RUNNING: 'timer_running',
  TIME_UP: 'time_up',
  DISCUSSION: 'discussion',
  VOTING: 'voting',
  VOTE_RESULT: 'vote_result',
  WORD_GUESS: 'word_guess',
  FINAL_RESULT: 'final_result',
};

export default function Infiltrator() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(GAME_PHASES.SETUP);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentName, setCurrentName] = useState('');
  const [roles, setRoles] = useState({});
  const [secretWord, setSecretWord] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [votes, setVotes] = useState({});
  const [selectedVote, setSelectedVote] = useState(null);
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votedPlayer, setVotedPlayer] = useState(null);
  const [infiltratorGuess, setInfiltratorGuess] = useState('');
  const [gameResult, setGameResult] = useState(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const playAlarm = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'square';
      gainNode.gain.value = 0.3;
      
      oscillator.start();
      
      let count = 0;
      const beepInterval = setInterval(() => {
        gainNode.gain.value = gainNode.gain.value === 0 ? 0.3 : 0;
        count++;
        if (count > 10) {
          clearInterval(beepInterval);
          oscillator.stop();
        }
      }, 200);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const startGame = (playerCount) => {
    setPlayers(Array(playerCount).fill(null));
    setPhase(GAME_PHASES.PLAYER_ENTRY);
  };

  const addPlayer = () => {
    if (!currentName.trim()) return;
    
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex] = currentName.trim();
    setPlayers(newPlayers);
    setCurrentName('');
    
    if (currentPlayerIndex === players.length - 1) {
      assignRoles(newPlayers);
    } else {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };

  const assignRoles = (playerList) => {
    const shuffled = [...Array(playerList.length).keys()].sort(() => Math.random() - 0.5);
    const masterIndex = shuffled[0];
    const infiltratorIndex = shuffled[1];
    
    const newRoles = {};
    playerList.forEach((_, index) => {
      if (index === masterIndex) {
        newRoles[index] = 'Master';
      } else if (index === infiltratorIndex) {
        newRoles[index] = 'Infiltrator';
      } else {
        newRoles[index] = 'Follower';
      }
    });
    
    setRoles(newRoles);
    setSecretWord(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
    setCurrentPlayerIndex(0);
    setPhase(GAME_PHASES.HAND_DEVICE);
  };

  const nextRoleReveal = () => {
    setIsRevealing(false);
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setPhase(GAME_PHASES.HAND_DEVICE);
    } else {
      setPhase(GAME_PHASES.MASTER_REVEAL);
    }
  };

  const getMasterName = () => {
    const masterIndex = Object.keys(roles).find(key => roles[key] === 'Master');
    return players[masterIndex];
  };

  const getInfiltratorName = () => {
    const infiltratorIndex = Object.keys(roles).find(key => roles[key] === 'Infiltrator');
    return players[infiltratorIndex];
  };

  const startTimer = () => {
    setPhase(GAME_PHASES.TIMER_RUNNING);
    setTimeLeft(120);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          playAlarm();
          setPhase(GAME_PHASES.TIME_UP);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const submitVote = () => {
    if (selectedVote === null) return;
    
    const newVotes = { ...votes };
    newVotes[currentVoterIndex] = selectedVote;
    setVotes(newVotes);
    setSelectedVote(null);
    
    if (currentVoterIndex < players.length - 1) {
      setCurrentVoterIndex(currentVoterIndex + 1);
    } else {
      tallyVotes(newVotes);
    }
  };

  const tallyVotes = (allVotes) => {
    const voteCounts = {};
    Object.values(allVotes).forEach(vote => {
      voteCounts[vote] = (voteCounts[vote] || 0) + 1;
    });
    
    let maxVotes = 0;
    let topPlayer = null;
    Object.entries(voteCounts).forEach(([player, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        topPlayer = parseInt(player);
      }
    });
    
    setVotedPlayer(topPlayer);
    setPhase(GAME_PHASES.VOTE_RESULT);
  };

  const handleVoteResult = (infiltratorCaught) => {
    if (infiltratorCaught) {
      setGameResult({
        winner: 'Followers',
        reason: 'The Infiltrator was caught!',
      });
      setPhase(GAME_PHASES.FINAL_RESULT);
    } else {
      setGameResult({
        winner: 'Infiltrator',
        reason: 'The Infiltrator was not caught!',
      });
      setPhase(GAME_PHASES.FINAL_RESULT);
    }
  };

  const checkWordGuess = () => {
    const correct = infiltratorGuess.toLowerCase().trim() === secretWord.toLowerCase();
    if (correct) {
      setGameResult({
        winner: 'Infiltrator',
        reason: 'The Infiltrator correctly guessed the word!',
      });
    } else {
      setGameResult({
        winner: 'Master & Followers',
        reason: 'The Infiltrator was caught and failed to guess the word!',
      });
    }
    setPhase(GAME_PHASES.FINAL_RESULT);
  };

  const resetGame = () => {
    setPhase(GAME_PHASES.SETUP);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setCurrentName('');
    setRoles({});
    setSecretWord('');
    setTimeLeft(120);
    setVotes({});
    setSelectedVote(null);
    setCurrentVoterIndex(0);
    setVotedPlayer(null);
    setInfiltratorGuess('');
    setGameResult(null);
    setIsRevealing(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const renderSetup = () => (
    <div style={styles.card}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#999', letterSpacing: '0.3em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
        Select Players
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {[4, 5, 6, 7, 8, 9, 10, 11].map(num => (
          <button
            key={num}
            style={{ ...styles.buttonSecondary, minWidth: 0, whiteSpace: 'nowrap' }}
            onClick={() => startGame(num)}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,59,59,0.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            {num} Players
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        <button
          style={{ ...styles.buttonSecondary, minWidth: 0, width: 'calc(50% - 7.5px)', whiteSpace: 'nowrap' }}
          onClick={() => startGame(12)}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255,59,59,0.1)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
          }}
        >
          12 Players
        </button>
      </div>
    </div>
  );

  const renderPlayerEntry = () => (
    <div style={styles.card}>
      <div style={styles.roleTitle}>Player {currentPlayerIndex + 1} of {players.length}</div>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#e0e0e0', fontSize: '1.5rem' }}>
        Enter Your Name
      </h2>
      <input
        type="text"
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
        style={styles.input}
        placeholder="Agent codename..."
        autoFocus
      />
      <div style={{ height: '20px' }} />
      <button
        style={styles.button}
        onClick={addPlayer}
        disabled={!currentName.trim()}
      >
        Confirm Identity
      </button>
    </div>
  );

  const renderHandDevice = () => (
    <div style={styles.card}>
      <div style={styles.roleCard}>
        <div style={styles.roleTitle}>Pass the Device</div>
        <p style={{ color: '#999', marginBottom: '20px' }}>
          Hand the device to
        </p>
        <div style={{ ...styles.roleName, color: '#ffd700' }}>
          {players[currentPlayerIndex]}
        </div>
        <div style={{ height: '30px' }} />
        <button 
          style={styles.button} 
          onClick={() => setPhase(GAME_PHASES.ROLE_REVEAL)}
        >
          Ready
        </button>
      </div>
    </div>
  );

  const renderRoleReveal = () => {
    const role = roles[currentPlayerIndex];
    const roleStyle = role === 'Master' ? styles.masterRole : 
                      role === 'Infiltrator' ? styles.infiltratorRole : 
                      styles.followerRole;
    
    return (
      <div style={styles.card}>
        <div style={styles.roleCard}>
          <div style={styles.roleTitle}>Agent {players[currentPlayerIndex]}</div>
          
          <div style={{ minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {isRevealing ? (
              <>
                <div style={{ ...styles.roleName, ...roleStyle }}>
                  {role}
                </div>
                <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
                  {role === 'Master' && 'You will reveal the secret word to all except the Infiltrator.'}
                  {role === 'Infiltrator' && 'Blend in. Discover the word. Avoid detection.'}
                  {role === 'Follower' && 'Find the Infiltrator among you.'}
                </p>
              </>
            ) : (
              <>
                <div style={{ ...styles.roleName, color: '#444' }}>
                  ? ? ?
                </div>
                <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
                  Hold the button below to reveal your role
                </p>
              </>
            )}
          </div>
          
          <button
            style={{
              ...styles.buttonSecondary,
              marginBottom: '15px',
              background: isRevealing ? 'rgba(255,59,59,0.2)' : 'transparent',
            }}
            onMouseDown={() => setIsRevealing(true)}
            onMouseUp={() => setIsRevealing(false)}
            onMouseLeave={() => setIsRevealing(false)}
            onTouchStart={() => setIsRevealing(true)}
            onTouchEnd={() => setIsRevealing(false)}
          >
            {isRevealing ? 'Release to Hide' : 'Hold to Reveal'}
          </button>
          
          <button style={styles.button} onClick={nextRoleReveal}>
            Next Player
          </button>
        </div>
      </div>
    );
  };

  const renderMasterReveal = () => (
    <div style={styles.card}>
      <div style={styles.roleCard}>
        <div style={styles.roleTitle}>Attention All Agents</div>
        <div style={{ ...styles.roleName, ...styles.masterRole }}>
          {getMasterName()}
        </div>
        <p style={{ color: '#ffd700', marginBottom: '30px', fontSize: '1.2rem' }}>
          is the Master
        </p>
        <p style={styles.instruction}>
          Master: Announce yourself and instruct everyone to close their eyes.
        </p>
        <button 
          style={styles.button} 
          onClick={() => setPhase(GAME_PHASES.SHOW_WORD)}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderShowWord = () => (
    <div style={styles.card}>
      <div style={styles.roleCard}>
        <div style={styles.roleTitle}>The Secret Word</div>
        <div style={styles.secretWord}>{secretWord}</div>
        <p style={{ ...styles.instruction, marginTop: '30px' }}>
          <span style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Master: Memorise this word, then CLOSE YOUR EYES too!
          </span>
          <br /><br />
          Instruct everyone to close their eyes, then place the device face-up on the table and announce:
          <br />
          <span style={{ color: '#ffd700' }}>"Infiltrator, open your eyes and view the word."</span>
          <br /><br />
          After 15-20 seconds, open your eyes, retrieve the device, and tell everyone to open their eyes.
        </p>
        <button 
          style={styles.button} 
          onClick={() => setPhase(GAME_PHASES.GAME_START)}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderGameStart = () => (
    <div style={styles.card}>
      <div style={styles.roleCard}>
        <div style={styles.roleTitle}>Prepare for Interrogation</div>
        <p style={styles.instruction}>
          Master: Tell everyone to open their eyes.
          <br /><br />
          When ready, start the 2-minute timer. Ask yes/no questions to discover the word.
          <br /><br />
          The Infiltrator must subtly guide others toward the word without being caught.
        </p>
        <button style={styles.button} onClick={startTimer}>
          Start Timer
        </button>
      </div>
    </div>
  );

  const renderTimer = () => (
    <div style={styles.card}>
      <div style={styles.roleCard}>
        <div style={styles.roleTitle}>Time Remaining</div>
        <div style={{
          ...styles.timer,
          ...(timeLeft <= 30 ? styles.timerWarning : {})
        }}>
          {formatTime(timeLeft)}
        </div>
        <p style={{ color: '#666', marginTop: '20px', marginBottom: '30px' }}>
          Ask yes/no questions about the secret word
        </p>
        <button 
          style={styles.button} 
          onClick={() => {
            if (timerRef.current) clearInterval(timerRef.current);
            setPhase(GAME_PHASES.DISCUSSION);
          }}
        >
          Guessed!
        </button>
      </div>
    </div>
  );

  const renderTimeUp = () => (
    <div style={styles.card}>
      <div style={styles.roleCard}>
        <div style={{ ...styles.roleName, color: '#ff3b3b' }}>TIME'S UP</div>
        <p style={styles.instruction}>
          The interrogation phase has ended.
        </p>
        <button 
          style={styles.button} 
          onClick={() => setPhase(GAME_PHASES.DISCUSSION)}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderDiscussion = () => (
    <div style={styles.card}>
      <div style={styles.roleCard}>
        <div style={styles.roleTitle}>Discussion Time</div>
        <div style={{ ...styles.roleName, color: '#ffd700', fontSize: '2rem' }}>
          Who is the Infiltrator?
        </div>
        <p style={styles.instruction}>
          Discuss among yourselves what happened during the round.
          <br /><br />
          Share your suspicions and defend yourself if accused.
          <br /><br />
          When everyone is ready, proceed to the vote.
        </p>
        <button 
          style={styles.button} 
          onClick={() => {
            setCurrentVoterIndex(0);
            setPhase(GAME_PHASES.VOTING);
          }}
        >
          Ready to Vote
        </button>
      </div>
    </div>
  );

  const renderVoting = () => (
    <div style={styles.card}>
      <div style={styles.roleTitle}>
        {players[currentVoterIndex]}'s Vote
      </div>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#e0e0e0' }}>
        Who is the Infiltrator?
      </h3>
      {players.map((player, index) => (
        index !== currentVoterIndex && (
          <button
            key={index}
            className="vote-button"
            style={{
              ...styles.voteButton,
              ...(selectedVote === index ? styles.voteButtonSelected : {})
            }}
            onClick={() => setSelectedVote(index)}
          >
            {player}
          </button>
        )
      ))}
      <div style={{ height: '20px' }} />
      <button
        style={styles.button}
        onClick={submitVote}
        disabled={selectedVote === null}
      >
        Submit Vote
      </button>
    </div>
  );

  const renderVoteResult = () => {
    return (
      <div style={styles.card}>
        <div style={styles.roleCard}>
          <div style={styles.roleTitle}>Vote Result</div>
          <div style={{ ...styles.roleName, color: '#ff3b3b' }}>
            {players[votedPlayer]}
          </div>
          <p style={{ color: '#999', marginBottom: '30px' }}>
            was voted as the suspected Infiltrator
          </p>
          <p style={styles.instruction}>
            {players[votedPlayer]}, reveal your role now.
          </p>
          <div style={{ display: 'grid', gap: '15px' }}>
            <button
              style={styles.button}
              onClick={() => handleVoteResult(true)}
            >
              I Am the Infiltrator
            </button>
            <button
              style={styles.buttonSecondary}
              onClick={() => handleVoteResult(false)}
            >
              I Am Not the Infiltrator
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderWordGuess = () => (
    <div style={styles.card}>
      <div style={styles.roleCard}>
        <div style={styles.roleTitle}>Final Chance</div>
        <p style={styles.instruction}>
          {getInfiltratorName()}, you've been caught!
          <br /><br />
          But you have one last chance. Guess the secret word correctly to win.
        </p>
        <input
          type="text"
          value={infiltratorGuess}
          onChange={(e) => setInfiltratorGuess(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkWordGuess()}
          style={styles.input}
          placeholder="Enter your guess..."
          autoFocus
        />
        <div style={{ height: '20px' }} />
        <button
          style={styles.button}
          onClick={checkWordGuess}
          disabled={!infiltratorGuess.trim()}
        >
          Submit Guess
        </button>
      </div>
    </div>
  );

  const renderFinalResult = () => (
    <div style={styles.card}>
      <div style={styles.resultBox}>
        <div style={styles.roleTitle}>Mission Complete</div>
        <div style={{
          ...styles.winText,
          ...(gameResult.winner === 'Infiltrator' ? styles.infiltratorRole : styles.followerRole)
        }}>
          {gameResult.winner} Win{gameResult.winner === 'Followers' ? '' : 's'}!
        </div>
        <p style={{ color: '#999' }}>{gameResult.reason}</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ color: '#666', marginBottom: '10px', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
          THE SECRET WORD WAS
        </div>
        <div style={{ ...styles.secretWord, fontSize: '2.5rem' }}>{secretWord}</div>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <div style={{ color: '#666', marginBottom: '10px', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
          THE INFILTRATOR WAS
        </div>
        <div style={{ ...styles.roleName, ...styles.infiltratorRole, fontSize: '2rem' }}>
          {getInfiltratorName()}
        </div>
      </div>
      
      <button style={styles.button} onClick={resetGame}>
        New Game
      </button>
    </div>
  );

  const renderPhase = () => {
    switch (phase) {
      case GAME_PHASES.SETUP: return renderSetup();
      case GAME_PHASES.PLAYER_ENTRY: return renderPlayerEntry();
      case GAME_PHASES.HAND_DEVICE: return renderHandDevice();
      case GAME_PHASES.ROLE_REVEAL: return renderRoleReveal();
      case GAME_PHASES.MASTER_REVEAL: return renderMasterReveal();
      case GAME_PHASES.SHOW_WORD: return renderShowWord();
      case GAME_PHASES.GAME_START: return renderGameStart();
      case GAME_PHASES.TIMER_RUNNING: return renderTimer();
      case GAME_PHASES.TIME_UP: return renderTimeUp();
      case GAME_PHASES.DISCUSSION: return renderDiscussion();
      case GAME_PHASES.VOTING: return renderVoting();
      case GAME_PHASES.VOTE_RESULT: return renderVoteResult();
      case GAME_PHASES.WORD_GUESS: return renderWordGuess();
      case GAME_PHASES.FINAL_RESULT: return renderFinalResult();
      default: return renderSetup();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.scanlines} />
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          input:focus {
            border-color: #ff3b3b !important;
            box-shadow: 0 0 10px rgba(255,59,59,0.3) !important;
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255,59,59,0.4) !important;
          }
          button:active {
            transform: translateY(0);
          }
          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
          }
          .back-button:hover {
            background: rgba(255,255,255,0.1) !important;
            box-shadow: none !important;
          }
          .vote-button:hover {
            background: rgba(255,59,59,0.1) !important;
            border-color: #ff3b3b !important;
            color: #ff3b3b !important;
            box-shadow: none !important;
          }
        `}
      </style>
      <button
        className="back-button"
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          color: 'rgba(255,255,255,0.6)',
          padding: '10px 16px',
          fontSize: '0.85rem',
          cursor: 'pointer',
          zIndex: 101,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.3s ease',
        }}
      >
        ← Home
      </button>
      <div style={styles.content}>
        <h1 style={styles.title}>Infiltrator</h1>
        <p style={styles.subtitle}>A Game of Deception</p>
        {renderPhase()}
      </div>
    </div>
  );
}