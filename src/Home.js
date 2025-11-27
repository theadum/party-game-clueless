import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [hoveredGame, setHoveredGame] = useState(null);

  const games = [
    {
      id: 'clueless',
      title: 'CLUELESS',
      tagline: 'One player is in the dark',
      description: 'Everyone knows the secret word except one person. Can you blend in without knowing what everyone is talking about?',
      players: '4-12',
      time: '5-10 min',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accentColor: '#667eea',
      icon: '🎭',
    },
    {
      id: 'infiltrator',
      title: 'INFILTRATOR',
      tagline: 'A game of deception',
      description: 'The Infiltrator knows the word but must hide it. Ask yes/no questions and find out who is pretending to be clueless.',
      players: '4-12',
      time: '5-10 min',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      accentColor: '#ff3b3b',
      icon: '🕵️',
    },
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0f0f0f',
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundOrbs: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: 0,
    },
    orb1: {
      position: 'absolute',
      width: '600px',
      height: '600px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)',
      top: '-200px',
      left: '-200px',
      animation: 'float1 20s ease-in-out infinite',
    },
    orb2: {
      position: 'absolute',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,59,59,0.1) 0%, transparent 70%)',
      bottom: '-150px',
      right: '-150px',
      animation: 'float2 25s ease-in-out infinite',
    },
    orb3: {
      position: 'absolute',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(118,75,162,0.12) 0%, transparent 70%)',
      top: '50%',
      left: '60%',
      animation: 'float3 18s ease-in-out infinite',
    },
    content: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '60px 30px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '70px',
    },
    logoContainer: {
      marginBottom: '20px',
    },
    logo: {
      fontSize: '3rem',
      marginBottom: '10px',
    },
    title: {
      fontFamily: "'Georgia', serif",
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      fontWeight: '400',
      color: '#ffffff',
      margin: '0 0 15px 0',
      letterSpacing: '-0.02em',
      lineHeight: '1.1',
    },
    titleAccent: {
      background: 'linear-gradient(135deg, #667eea 0%, #ff3b3b 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    subtitle: {
      fontFamily: "'Helvetica Neue', sans-serif",
      fontSize: '1.1rem',
      color: 'rgba(255,255,255,0.5)',
      fontWeight: '300',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
    },
    gamesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '30px',
    },
    gameCard: {
      position: 'relative',
      borderRadius: '24px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
      aspectRatio: '1 / 1.1',
    },
    gameCardHover: {
      transform: 'translateY(-10px) scale(1.02)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
    },
    gameCardInner: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: '35px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    gameIcon: {
      fontSize: '4rem',
      marginBottom: '10px',
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
    },
    gameTitle: {
      fontFamily: "'Georgia', serif",
      fontSize: '2.2rem',
      fontWeight: '400',
      color: '#ffffff',
      margin: '0 0 8px 0',
      letterSpacing: '0.05em',
    },
    gameTagline: {
      fontSize: '0.95rem',
      color: 'rgba(255,255,255,0.7)',
      margin: '0 0 20px 0',
      fontStyle: 'italic',
    },
    gameDescription: {
      fontSize: '0.9rem',
      color: 'rgba(255,255,255,0.6)',
      lineHeight: '1.6',
      margin: '0',
      flex: 1,
    },
    gameFooter: {
      display: 'flex',
      gap: '20px',
      marginTop: '25px',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
    },
    gameStat: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    gameStatIcon: {
      fontSize: '1rem',
      opacity: 0.7,
    },
    gameStatText: {
      fontSize: '0.85rem',
      color: 'rgba(255,255,255,0.7)',
      fontWeight: '500',
    },
    playButton: {
      position: 'absolute',
      bottom: '35px',
      right: '35px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
    playButtonHover: {
      background: 'rgba(255,255,255,0.25)',
      transform: 'scale(1.1)',
    },
    playIcon: {
      width: 0,
      height: 0,
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderLeft: '16px solid white',
      marginLeft: '4px',
    },
    footer: {
      textAlign: 'center',
      marginTop: '80px',
      paddingTop: '40px',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    },
    footerText: {
      color: 'rgba(255,255,255,0.3)',
      fontSize: '0.85rem',
      fontFamily: "'Helvetica Neue', sans-serif",
    },
    footerHeart: {
      color: '#ff3b3b',
      display: 'inline-block',
      animation: 'pulse 2s ease-in-out infinite',
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes float1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -30px) rotate(5deg); }
            66% { transform: translate(-20px, 20px) rotate(-5deg); }
          }
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(-40px, 20px) rotate(-5deg); }
            66% { transform: translate(30px, -30px) rotate(5deg); }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-30px, 30px); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>

      <div style={styles.backgroundOrbs}>
        <div style={styles.orb1} />
        <div style={styles.orb2} />
        <div style={styles.orb3} />
      </div>

      <div style={styles.content}>
        <header style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logo}>🎲</div>
          </div>
          <h1 style={styles.title}>
            <span style={styles.titleAccent}>Party Games</span>
          </h1>
          <p style={styles.subtitle}>Choose your game</p>
        </header>

        <div style={styles.gamesGrid}>
          {games.map((game) => (
            <div
              key={game.id}
              style={{
                ...styles.gameCard,
                background: game.gradient,
                boxShadow: `0 20px 40px ${game.accentColor}22`,
                ...(hoveredGame === game.id ? styles.gameCardHover : {}),
              }}
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
              onClick={() => navigate(`/${game.id}`)}
            >
              <div style={styles.gameCardInner}>
                <div>
                  <div style={styles.gameIcon}>{game.icon}</div>
                  <h2 style={styles.gameTitle}>{game.title}</h2>
                  <p style={styles.gameTagline}>{game.tagline}</p>
                  <p style={styles.gameDescription}>{game.description}</p>
                </div>

                <div style={styles.gameFooter}>
                  <div style={styles.gameStat}>
                    <span style={styles.gameStatIcon}>👥</span>
                    <span style={styles.gameStatText}>{game.players} players</span>
                  </div>
                  <div style={styles.gameStat}>
                    <span style={styles.gameStatIcon}>⏱️</span>
                    <span style={styles.gameStatText}>{game.time}</span>
                  </div>
                </div>

                <div
                  style={{
                    ...styles.playButton,
                    ...(hoveredGame === game.id ? styles.playButtonHover : {}),
                  }}
                >
                  <div style={styles.playIcon} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer style={styles.footer}>
          <p style={styles.footerText}>
            Made with <span style={styles.footerHeart}>♥</span> for parties
          </p>
        </footer>
      </div>
    </div>
  );
}