import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WORD_CATEGORIES = {
  celebrities: [
    'Taylor Swift', 'Beyoncé', 'Drake', 'Rihanna', 'Kanye West',
    'Billie Eilish', 'Ed Sheeran', 'Adele', 'Harry Styles', 'Dua Lipa',
    'The Weeknd', 'Bruno Mars', 'Lady Gaga', 'Justin Bieber', 'Ariana Grande',
    'Post Malone', 'Kendrick Lamar', 'Doja Cat', 'Bad Bunny', 'Shakira',
    'Tom Hanks', 'Leonardo DiCaprio', 'Brad Pitt', 'Angelina Jolie', 'Jennifer Lawrence',
    'Margot Robbie', 'Ryan Gosling', 'Scarlett Johansson', 'Chris Hemsworth', 'Zendaya',
    'Timothée Chalamet', 'Florence Pugh', 'Tom Holland', 'Robert Downey Jr', 'Keanu Reeves',
    'Dwayne Johnson', 'Will Smith', 'Johnny Depp', 'Meryl Streep', 'Denzel Washington',
    'Morgan Freeman', 'Samuel L Jackson', 'Emma Stone', 'Anne Hathaway', 'Natalie Portman',
    'Oprah Winfrey', 'Ellen DeGeneres', 'Jimmy Fallon', 'James Corden', 'Trevor Noah',
    'Gordon Ramsay', 'Simon Cowell', 'David Beckham', 'Cristiano Ronaldo', 'Lionel Messi',
    'LeBron James', 'Serena Williams', 'Tiger Woods', 'Michael Jordan', 'Usain Bolt',
    'Elon Musk', 'Jeff Bezos', 'Mark Zuckerberg', 'Bill Gates', 'Steve Jobs',
    'Kim Kardashian', 'Kylie Jenner', 'Selena Gomez', 'Miley Cyrus', 'Katy Perry',
    'Mr Beast', 'PewDiePie', 'Logan Paul', 'KSI', 'Addison Rae'
  ],
  movies: [
    'Titanic', 'Avatar', 'The Avengers', 'Jurassic Park', 'Star Wars',
    'The Lion King', 'Frozen', 'Finding Nemo', 'Toy Story', 'Shrek',
    'Harry Potter', 'Lord of the Rings', 'The Matrix', 'Inception', 'Interstellar',
    'The Dark Knight', 'Spider-Man', 'Iron Man', 'Black Panther', 'Guardians of the Galaxy',
    'Fast and Furious', 'Mission Impossible', 'James Bond', 'John Wick', 'Die Hard',
    'The Godfather', 'Pulp Fiction', 'Fight Club', 'Forrest Gump', 'The Shawshank Redemption',
    'Gladiator', 'Braveheart', 'Saving Private Ryan', 'Schindlers List', 'The Departed',
    'Goodfellas', 'Scarface', 'The Wolf of Wall Street', 'Casino', 'Heat',
    'The Notebook', 'Titanic', 'Pretty Woman', 'Dirty Dancing', 'Grease',
    'Mean Girls', 'Legally Blonde', 'Clueless', 'The Devil Wears Prada', 'Bridesmaids',
    'The Hangover', 'Superbad', 'Anchorman', 'Step Brothers', 'Dumb and Dumber',
    'Home Alone', 'Elf', 'The Grinch', 'Love Actually', 'Die Hard',
    'Get Out', 'A Quiet Place', 'The Conjuring', 'It', 'Scream',
    'Jaws', 'Alien', 'The Exorcist', 'The Shining', 'Psycho',
    'Barbie', 'Oppenheimer', 'Top Gun', 'Everything Everywhere All at Once', 'Parasite'
  ],
  tvShows: [
    'Friends', 'The Office', 'Breaking Bad', 'Game of Thrones', 'Stranger Things',
    'The Simpsons', 'Family Guy', 'South Park', 'Rick and Morty', 'SpongeBob',
    'The Crown', 'Downton Abbey', 'Bridgerton', 'Peaky Blinders', 'Sherlock',
    'Doctor Who', 'Black Mirror', 'The Mandalorian', 'House of the Dragon', 'The Witcher',
    'Squid Game', 'Money Heist', 'Narcos', 'Elite', 'Dark',
    'The Walking Dead', 'The Last of Us', 'Yellowstone', 'Succession', 'Ted Lasso',
    'Euphoria', 'Wednesday', 'Cobra Kai', 'Outer Banks', 'Ginny and Georgia',
    'Love Island', 'The Bachelor', 'Keeping Up with the Kardashians', 'RuPauls Drag Race', 'The Voice',
    'MasterChef', 'Hells Kitchen', 'The Great British Bake Off', 'Queer Eye', 'Selling Sunset',
    'Tiger King', 'Making a Murderer', 'The Tinder Swindler', 'Dont F with Cats', 'Inventing Anna'
  ],
  music: [
    'Bohemian Rhapsody', 'Thriller', 'Billie Jean', 'Like a Prayer', 'Smells Like Teen Spirit',
    'Wonderwall', 'Hey Jude', 'Imagine', 'Hotel California', 'Stairway to Heaven',
    'Sweet Home Alabama', 'Purple Rain', 'Respect', 'I Will Always Love You', 'My Heart Will Go On',
    'Shape of You', 'Blinding Lights', 'Uptown Funk', 'Happy', 'Get Lucky',
    'Old Town Road', 'Bad Guy', 'Drivers License', 'Stay', 'Levitating',
    'Anti-Hero', 'As It Was', 'About Damn Time', 'Running Up That Hill', 'Heat Waves',
    'Despacito', 'Gangnam Style', 'Waka Waka', 'Macarena', 'Baby Shark',
    'Rolling in the Deep', 'Someone Like You', 'Hello', 'Easy On Me', 'Set Fire to the Rain',
    'Umbrella', 'Single Ladies', 'Crazy in Love', 'Halo', 'Formation',
    'Shake It Off', 'Blank Space', 'Bad Blood', 'Love Story', 'All Too Well'
  ],
  food: [
    'Pizza', 'Burger', 'Sushi', 'Tacos', 'Pasta',
    'Fried Chicken', 'Hot Dog', 'Steak', 'Lobster', 'Shrimp',
    'Ice Cream', 'Chocolate', 'Cheesecake', 'Donuts', 'Cookies',
    'Avocado', 'Bacon', 'Eggs', 'Pancakes', 'Waffles',
    'French Fries', 'Nachos', 'Popcorn', 'Pretzels', 'Chips',
    'Coffee', 'Boba Tea', 'Smoothie', 'Milkshake', 'Lemonade',
    'Ramen', 'Pho', 'Curry', 'Dim Sum', 'Spring Rolls',
    'Croissant', 'Bagel', 'Sourdough', 'Garlic Bread', 'Breadsticks',
    'Mac and Cheese', 'Grilled Cheese', 'PB and J', 'BLT', 'Club Sandwich',
    'Mashed Potatoes', 'Gravy', 'Stuffing', 'Cranberry Sauce', 'Turkey'
  ],
  animals: [
    'Dog', 'Cat', 'Elephant', 'Lion', 'Tiger',
    'Penguin', 'Dolphin', 'Whale', 'Shark', 'Octopus',
    'Eagle', 'Owl', 'Parrot', 'Flamingo', 'Peacock',
    'Snake', 'Crocodile', 'Turtle', 'Frog', 'Chameleon',
    'Monkey', 'Gorilla', 'Chimpanzee', 'Orangutan', 'Koala',
    'Kangaroo', 'Panda', 'Polar Bear', 'Grizzly Bear', 'Wolf',
    'Fox', 'Deer', 'Moose', 'Horse', 'Zebra',
    'Giraffe', 'Hippo', 'Rhino', 'Buffalo', 'Camel',
    'Rabbit', 'Hamster', 'Guinea Pig', 'Hedgehog', 'Ferret',
    'Butterfly', 'Bee', 'Spider', 'Scorpion', 'Jellyfish'
  ],
  places: [
    'Paris', 'London', 'New York', 'Tokyo', 'Sydney',
    'Los Angeles', 'Las Vegas', 'Miami', 'Hawaii', 'Dubai',
    'Rome', 'Barcelona', 'Amsterdam', 'Berlin', 'Prague',
    'Bali', 'Thailand', 'Maldives', 'Santorini', 'Mykonos',
    'Eiffel Tower', 'Big Ben', 'Statue of Liberty', 'Great Wall of China', 'Taj Mahal',
    'Pyramids of Giza', 'Colosseum', 'Machu Picchu', 'Grand Canyon', 'Niagara Falls',
    'Disneyland', 'Disney World', 'Universal Studios', 'Six Flags', 'SeaWorld',
    'Times Square', 'Hollywood', 'Broadway', 'Central Park', 'Golden Gate Bridge',
    'Amazon Rainforest', 'Sahara Desert', 'Mount Everest', 'Great Barrier Reef', 'Antarctica',
    'IKEA', 'McDonalds', 'Starbucks', 'Walmart', 'Target'
  ],
  brands: [
    'Apple', 'Google', 'Amazon', 'Netflix', 'Spotify',
    'Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok',
    'Louis Vuitton', 'Gucci', 'Chanel', 'Prada', 'Versace',
    'McDonalds', 'Burger King', 'KFC', 'Subway', 'Taco Bell',
    'Coca Cola', 'Pepsi', 'Red Bull', 'Monster', 'Gatorade',
    'PlayStation', 'Xbox', 'Nintendo', 'Steam', 'Epic Games',
    'Instagram', 'TikTok', 'Snapchat', 'Twitter', 'Facebook',
    'YouTube', 'Twitch', 'Discord', 'Reddit', 'WhatsApp',
    'Tesla', 'Ferrari', 'Lamborghini', 'BMW', 'Mercedes',
    'LEGO', 'Barbie', 'Hot Wheels', 'Nerf', 'Play-Doh'
  ],
  sports: [
    'Football', 'Basketball', 'Soccer', 'Baseball', 'Tennis',
    'Golf', 'Swimming', 'Running', 'Cycling', 'Boxing',
    'MMA', 'Wrestling', 'Gymnastics', 'Skiing', 'Snowboarding',
    'Surfing', 'Skateboarding', 'Rock Climbing', 'Yoga', 'CrossFit',
    'Super Bowl', 'World Cup', 'Olympics', 'Wimbledon', 'NBA Finals',
    'Touchdown', 'Home Run', 'Slam Dunk', 'Hole in One', 'Hat Trick',
    'FIFA', 'Madden', 'NBA 2K', '2K', 'UFC',
    'Premier League', 'Champions League', 'La Liga', 'Serie A', 'Bundesliga',
    'Manchester United', 'Real Madrid', 'Barcelona', 'Liverpool', 'Bayern Munich',
    'Lakers', 'Warriors', 'Bulls', 'Celtics', 'Heat'
  ],
  gaming: [
    'Minecraft', 'Fortnite', 'Roblox', 'Among Us', 'Fall Guys',
    'Call of Duty', 'Grand Theft Auto', 'Red Dead Redemption', 'Elden Ring', 'Dark Souls',
    'The Legend of Zelda', 'Super Mario', 'Pokemon', 'Animal Crossing', 'Kirby',
    'FIFA', 'Madden', 'NBA 2K', 'Rocket League', 'WWE 2K',
    'League of Legends', 'Valorant', 'Counter-Strike', 'Dota', 'Overwatch',
    'Apex Legends', 'PUBG', 'Warzone', 'Halo', 'Destiny',
    'The Sims', 'Stardew Valley', 'Terraria', 'Subnautica', 'No Mans Sky',
    'God of War', 'Horizon', 'Spider-Man', 'Ghost of Tsushima', 'The Last of Us',
    'Assassins Creed', 'Far Cry', 'Watch Dogs', 'Just Dance', 'Guitar Hero',
    'Candy Crush', 'Clash of Clans', 'Clash Royale', 'Subway Surfers', 'Temple Run'
  ],
  internet: [
    'Meme', 'Viral', 'Trending', 'Hashtag', 'Selfie',
    'Influencer', 'Content Creator', 'Vlogger', 'Streamer', 'Podcast',
    'FOMO', 'YOLO', 'Ghosting', 'Catfish', 'Trolling',
    'Unboxing', 'ASMR', 'Mukbang', 'Reaction Video', 'Tutorial',
    'NFT', 'Crypto', 'Bitcoin', 'Blockchain', 'Metaverse',
    'AI', 'ChatGPT', 'Robot', 'Algorithm', 'Deepfake',
    'WiFi', 'Bluetooth', 'Cloud', 'Download', 'Upload',
    'Password', 'Username', 'Email', 'Spam', 'Hacker',
    'Screenshot', 'Filter', 'Story', 'Reel', 'Live Stream',
    'Subscribe', 'Like', 'Comment', 'Share', 'Follow'
  ],
  everyday: [
    'Alarm Clock', 'Toothbrush', 'Shower', 'Breakfast', 'Traffic',
    'Meeting', 'Deadline', 'Lunch Break', 'Happy Hour', 'Bedtime',
    'Netflix and Chill', 'Road Trip', 'Vacation', 'Staycation', 'Weekend',
    'Birthday Party', 'Wedding', 'Graduation', 'Baby Shower', 'Funeral',
    'Grocery Shopping', 'Online Shopping', 'Black Friday', 'Cyber Monday', 'Prime Day',
    'Laundry', 'Dishes', 'Vacuum', 'Cooking', 'Cleaning',
    'Gym', 'Diet', 'Hangover', 'Nap', 'Insomnia',
    'First Date', 'Breakup', 'Friend Zone', 'Crush', 'Ex',
    'Paycheck', 'Bills', 'Rent', 'Taxes', 'Budget',
    'Monday', 'Friday', 'Summer', 'Christmas', 'New Years'
  ],
  randomFun: [
    'Unicorn', 'Dinosaur', 'Alien', 'Zombie', 'Vampire',
    'Wizard', 'Ninja', 'Pirate', 'Superhero', 'Princess',
    'Time Travel', 'Teleportation', 'Invisibility', 'Mind Reading', 'Flying',
    'Lottery', 'Jackpot', 'Million Dollars', 'Gold', 'Diamond',
    'Haunted House', 'Ghost', 'UFO', 'Bigfoot', 'Loch Ness Monster',
    'Karaoke', 'Dance Battle', 'Food Fight', 'Pillow Fight', 'Prank',
    'Awkward Silence', 'Dad Joke', 'Plot Twist', 'Cliffhanger', 'Spoiler Alert',
    'Cheat Code', 'Easter Egg', 'Secret Level', 'Boss Battle', 'Game Over',
    'Thunderstorm', 'Earthquake', 'Tornado', 'Volcano', 'Avalanche',
    'Magic Trick', 'Card Trick', 'Escape Room', 'Treasure Hunt', 'Scavenger Hunt'
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