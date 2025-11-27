import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WORD_CATEGORIES = {
  celebrities: [
    'Taylor Swift', 'Beyoncé', 'Michael Jackson', 'Elvis Presley', 'Madonna',
    'Oprah Winfrey', 'Tom Hanks', 'Leonardo DiCaprio', 'Brad Pitt', 'Angelina Jolie',
    'George Clooney', 'Julia Roberts', 'Tom Cruise', 'Will Smith', 'Denzel Washington',
    'Meryl Streep', 'Clint Eastwood', 'Morgan Freeman', 'Harrison Ford', 'Arnold Schwarzenegger',
    'Sylvester Stallone', 'Bruce Willis', 'Robin Williams', 'Jim Carrey', 'Eddie Murphy',
    'Robert De Niro', 'Al Pacino', 'Jack Nicholson', 'Dustin Hoffman', 'Anthony Hopkins',
    'Sean Connery', 'Michael Caine', 'Judi Dench', 'Helen Mirren', 'Kate Winslet',
    'David Beckham', 'Tiger Woods', 'Muhammad Ali', 'Michael Jordan', 'Serena Williams',
    'David Attenborough', 'Gordon Ramsay', 'Simon Cowell', 'Ellen DeGeneres', 'Elton John',
    'Paul McCartney', 'Mick Jagger', 'Sting', 'Bono', 'Stevie Wonder',
    'Whitney Houston', 'Celine Dion', 'Dolly Parton', 'Cher', 'Barbra Streisand',
    'Princess Diana', 'Queen Elizabeth', 'Prince William', 'Prince Harry', 'David Bowie'
  ],
  movies: [
    'Titanic', 'The Sound of Music', 'Mary Poppins', 'Grease', 'Dirty Dancing',
    'Pretty Woman', 'Ghost', 'Forrest Gump', 'The Shawshank Redemption', 'Schindlers List',
    'Jurassic Park', 'E.T.', 'Jaws', 'Star Wars', 'Indiana Jones',
    'Back to the Future', 'Ghostbusters', 'Top Gun', 'Rocky', 'Rambo',
    'The Godfather', 'Goodfellas', 'Scarface', 'The Wizard of Oz', 'Gone with the Wind',
    'Casablanca', 'Singin in the Rain', 'The Lion King', 'Toy Story', 'Finding Nemo',
    'Shrek', 'Frozen', 'Home Alone', 'Mrs Doubtfire', 'Sister Act',
    'Notting Hill', 'Bridget Jones', 'Love Actually', 'Mamma Mia', 'The Full Monty',
    'James Bond', 'Mission Impossible', 'Die Hard', 'Terminator', 'Alien',
    'Harry Potter', 'Lord of the Rings', 'The Matrix', 'Gladiator', 'Braveheart'
  ],
  tvShows: [
    'Friends', 'The Simpsons', 'Only Fools and Horses', 'Fawlty Towers', 'Blackadder',
    'Mr Bean', 'The Office', 'Downton Abbey', 'The Crown', 'Coronation Street',
    'EastEnders', 'Emmerdale', 'Doctor Who', 'Top Gear', 'The Great British Bake Off',
    'Strictly Come Dancing', 'X Factor', 'Britain Got Talent', 'Who Wants to be a Millionaire', 'The Weakest Link',
    'Deal or No Deal', 'Countdown', 'QI', 'Would I Lie to You', 'Have I Got News for You',
    'I\'m a Celebrity', 'Big Brother', 'Love Island', 'Gogglebox', 'Antiques Roadshow',
    'Grand Designs', 'Location Location Location', 'DIY SOS', 'Gardeners World', 'Blue Peter',
    'The Chase', 'Pointless', 'Family Fortunes', 'Catchphrase', 'Wheel of Fortune',
    'Dallas', 'Dynasty', 'Baywatch', 'The A-Team', 'Knight Rider',
    'M*A*S*H', 'Cheers', 'Seinfeld', 'The Golden Girls', 'Murder She Wrote'
  ],
  music: [
    'Bohemian Rhapsody', 'Thriller', 'Billie Jean', 'Like a Virgin', 'I Will Always Love You',
    'My Heart Will Go On', 'Yesterday', 'Hey Jude', 'Imagine', 'Let It Be',
    'Dancing Queen', 'Mamma Mia', 'Waterloo', 'I Will Survive', 'Stayin Alive',
    'We Are the Champions', 'We Will Rock You', 'Another One Bites the Dust', 'Radio Gaga', 'Somebody to Love',
    'Sweet Home Alabama', 'Hotel California', 'Stairway to Heaven', 'Wish You Were Here', 'Comfortably Numb',
    'Born to Run', 'Purple Rain', 'Respect', 'What a Wonderful World', 'Stand By Me',
    'Unchained Melody', 'My Way', 'New York New York', 'Moon River', 'Over the Rainbow',
    'Bridge Over Troubled Water', 'Sound of Silence', 'Hallelujah', 'Angels', 'Wonderwall',
    'Livin on a Prayer', 'Sweet Child O Mine', 'Every Breath You Take', 'Careless Whisper', 'Wake Me Up Before You Go Go',
    'Never Gonna Give You Up', 'Take On Me', 'Total Eclipse of the Heart', 'I Want to Dance with Somebody', 'Girls Just Want to Have Fun'
  ],
  food: [
    'Pizza', 'Burger', 'Fish and Chips', 'Roast Dinner', 'Spaghetti',
    'Lasagne', 'Curry', 'Chinese Takeaway', 'Fried Chicken', 'Hot Dog',
    'Sandwich', 'Soup', 'Salad', 'Steak', 'Bacon',
    'Eggs', 'Toast', 'Cereal', 'Porridge', 'Pancakes',
    'Chips', 'Crisps', 'Chocolate', 'Ice Cream', 'Cake',
    'Biscuits', 'Apple Pie', 'Cheesecake', 'Trifle', 'Jelly',
    'Tea', 'Coffee', 'Orange Juice', 'Lemonade', 'Milkshake',
    'Cheese', 'Bread', 'Butter', 'Jam', 'Honey',
    'Chicken', 'Sausages', 'Mashed Potato', 'Gravy', 'Yorkshire Pudding',
    'Beans on Toast', 'Shepherds Pie', 'Cottage Pie', 'Bangers and Mash', 'Sunday Roast'
  ],
  animals: [
    'Dog', 'Cat', 'Horse', 'Cow', 'Sheep',
    'Pig', 'Chicken', 'Duck', 'Rabbit', 'Mouse',
    'Elephant', 'Lion', 'Tiger', 'Giraffe', 'Monkey',
    'Gorilla', 'Bear', 'Wolf', 'Fox', 'Deer',
    'Eagle', 'Owl', 'Robin', 'Swan', 'Penguin',
    'Dolphin', 'Whale', 'Shark', 'Fish', 'Octopus',
    'Crocodile', 'Snake', 'Frog', 'Tortoise', 'Butterfly',
    'Bee', 'Spider', 'Snail', 'Hedgehog', 'Squirrel',
    'Kangaroo', 'Koala', 'Panda', 'Polar Bear', 'Camel',
    'Zebra', 'Hippo', 'Rhino', 'Parrot', 'Flamingo'
  ],
  places: [
    'London', 'Paris', 'New York', 'Rome', 'Sydney',
    'Los Angeles', 'Las Vegas', 'Hollywood', 'Hawaii', 'Florida',
    'Spain', 'France', 'Italy', 'Greece', 'Egypt',
    'Australia', 'America', 'China', 'India', 'Japan',
    'Eiffel Tower', 'Big Ben', 'Statue of Liberty', 'Great Wall of China', 'Pyramids',
    'Buckingham Palace', 'Tower of London', 'Stonehenge', 'Edinburgh Castle', 'Windsor Castle',
    'Blackpool', 'Brighton', 'Cornwall', 'Lake District', 'Scotland',
    'Wales', 'Ireland', 'Caribbean', 'Mediterranean', 'Alps',
    'Amazon', 'Sahara Desert', 'Mount Everest', 'Niagara Falls', 'Grand Canyon',
    'Disneyland', 'Benidorm', 'Majorca', 'Tenerife', 'Ibiza'
  ],
  brands: [
    'Coca Cola', 'McDonalds', 'Apple', 'Google', 'Amazon',
    'Nike', 'Adidas', 'Levi\'s', 'Rolex', 'Mercedes',
    'BMW', 'Ferrari', 'Rolls Royce', 'Ford', 'Volkswagen',
    'Tesco', 'Sainsburys', 'Marks and Spencer', 'John Lewis', 'Harrods',
    'BBC', 'ITV', 'Netflix', 'Disney', 'YouTube',
    'Facebook', 'Twitter', 'Instagram', 'WhatsApp', 'eBay',
    'IKEA', 'Argos', 'B&Q', 'Boots', 'Superdrug',
    'Cadbury', 'Heinz', 'Kelloggs', 'Nestle', 'Mars',
    'Sony', 'Samsung', 'Microsoft', 'Nintendo', 'LEGO',
    'Virgin', 'British Airways', 'Ryanair', 'Hilton', 'Premier Inn'
  ],
  sports: [
    'Football', 'Tennis', 'Golf', 'Cricket', 'Rugby',
    'Swimming', 'Running', 'Cycling', 'Boxing', 'Horse Racing',
    'Formula One', 'Wimbledon', 'Olympics', 'World Cup', 'Premier League',
    'Manchester United', 'Liverpool', 'Arsenal', 'Chelsea', 'Real Madrid',
    'Barcelona', 'Wembley', 'Anfield', 'Old Trafford', 'Lords',
    'Penalty', 'Goal', 'Referee', 'Trophy', 'Medal',
    'Marathon', 'Sprint', 'Javelin', 'High Jump', 'Long Jump',
    'Gymnastics', 'Ice Skating', 'Skiing', 'Snowboarding', 'Surfing',
    'Darts', 'Snooker', 'Bowling', 'Badminton', 'Table Tennis',
    'Grand National', 'The Ashes', 'Six Nations', 'Tour de France', 'Ryder Cup'
  ],
  everyday: [
    'Birthday', 'Christmas', 'Wedding', 'Holiday', 'Weekend',
    'Monday', 'Friday', 'Summer', 'Winter', 'Spring',
    'Breakfast', 'Lunch', 'Dinner', 'Tea Time', 'Supper',
    'Morning', 'Evening', 'Night', 'Afternoon', 'Midnight',
    'Shopping', 'Cooking', 'Cleaning', 'Gardening', 'Driving',
    'Reading', 'Writing', 'Sleeping', 'Walking', 'Talking',
    'Telephone', 'Television', 'Radio', 'Newspaper', 'Magazine',
    'Hospital', 'Doctor', 'Dentist', 'School', 'Church',
    'Bank', 'Post Office', 'Supermarket', 'Pub', 'Restaurant',
    'Train', 'Bus', 'Car', 'Plane', 'Taxi'
  ],
  randomFun: [
    'Lottery', 'Bingo', 'Quiz', 'Crossword', 'Puzzle',
    'Magic Trick', 'Card Game', 'Board Game', 'Treasure Hunt', 'Hide and Seek',
    'Fancy Dress', 'Costume Party', 'Barbecue', 'Picnic', 'Garden Party',
    'Fireworks', 'Bonfire', 'Parade', 'Carnival', 'Festival',
    'Ghost', 'Witch', 'Wizard', 'Fairy', 'Dragon',
    'Castle', 'Palace', 'Mansion', 'Cottage', 'Lighthouse',
    'Rainbow', 'Sunset', 'Sunrise', 'Thunderstorm', 'Snowman',
    'Sandcastle', 'Seaside', 'Beach', 'Swimming Pool', 'Camping',
    'Safari', 'Cruise', 'Road Trip', 'Adventure', 'Surprise',
    'Secret', 'Mystery', 'Treasure', 'Fortune', 'Jackpot'
  ]
};

// Flatten all categories into one array
const ALL_WORDS = Object.values(WORD_CATEGORIES).flat();

export default function Clueless() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('setup');
  const [playerCount, setPlayerCount] = useState(3);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [cluelessPlayer, setCluelessPlayer] = useState(null);
  const [roundActive, setRoundActive] = useState(false);

  const startGame = () => {
    // Pick a random category and word
    const categories = Object.keys(WORD_CATEGORIES);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryWords = WORD_CATEGORIES[randomCategory];
    const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    const randomClueless = Math.floor(Math.random() * playerCount);
    
    setCurrentWord(randomWord);
    setCurrentCategory(randomCategory);
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
    setPlayerCount(4);
    setCurrentPlayerIndex(0);
    setRoundActive(false);
    setShowInstructions(false);
  };

  const formatCategory = (category) => {
    return category
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const styles = {
    container: {
      minHeight: '100vh',
      height: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
      display: 'flex',
      alignItems: 'flex-start',
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
      marginBottom: '20px',
      textAlign: 'center'
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
    wordCount: {
      textAlign: 'center',
      color: '#667eea',
      fontSize: '0.8rem',
      marginTop: '10px',
      fontWeight: '600'
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
      padding: '40px 20px',
      marginBottom: '30px',
      textAlign: 'center',
      minHeight: '160px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    categoryLabel: {
      fontSize: '0.8rem',
      fontWeight: '600',
      color: '#764ba2',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '10px'
    },
    word: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#667eea',
      lineHeight: '1.2'
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
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '8px',
            color: '#667eea',
            padding: '10px 16px',
            fontSize: '0.85rem',
            fontWeight: '600',
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
        <div style={{ ...styles.card, marginTop: '60px' }}>
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
            <p style={styles.smallText}>3-12 players</p>
            <p style={styles.wordCount}>{ALL_WORDS.length} words across {Object.keys(WORD_CATEGORIES).length} categories!</p>
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
                  <strong>2. Secret Word:</strong> Each player will be shown a word (and its category) one at a time. Remember: ONE random player will see "CLUELESS" instead!
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
                {isCurrentPlayerClueless ? (
                  <p style={styles.wordClueless}>CLUELESS</p>
                ) : (
                  <>
                    <p style={styles.categoryLabel}>{formatCategory(currentCategory)}</p>
                    <p style={styles.word}>{currentWord}</p>
                  </>
                )}
              </div>
              <p style={styles.instruction}>
                {isCurrentPlayerClueless ? "Don't let them know you're clueless!" : 'Remember this word!'}
              </p>
              <button style={styles.buttonNext} onClick={handleNextPlayer}>
                {currentPlayerIndex === playerCount - 1 ? 'Start Round' : 'Next Player'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}