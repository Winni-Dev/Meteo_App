


import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaSun, FaMoon, FaThermometerHalf, FaTimes, FaEnvelope, FaSnowflake, FaCloud, FaCloudSun, FaCloudRain, FaTemperatureHigh } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const neonPulse = keyframes`
  0% { 
    text-shadow: 0 0 5px rgba(0, 168, 255, 0.5), 0 0 10px rgba(0, 168, 255, 0.4), 0 0 15px rgba(0, 168, 255, 0.3);
    box-shadow: 0 0 10px rgba(0, 168, 255, 0.3), 0 0 20px rgba(0, 168, 255, 0.2);
  }
  50% { 
    text-shadow: 0 0 10px rgba(0, 168, 255, 0.6), 0 0 20px rgba(0, 168, 255, 0.5), 0 0 30px rgba(0, 168, 255, 0.4);
    box-shadow: 0 0 15px rgba(0, 168, 255, 0.4), 0 0 30px rgba(0, 168, 255, 0.3);
  }
  100% { 
    text-shadow: 0 0 5px rgba(0, 168, 255, 0.5), 0 0 10px rgba(0, 168, 255, 0.4), 0 0 15px rgba(0, 168, 255, 0.3);
    box-shadow: 0 0 10px rgba(0, 168, 255, 0.3), 0 0 20px rgba(0, 168, 255, 0.2);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); } /* Défilement plus prononcé */
  100% { transform: translateY(0px); }
`;

const hologramGlow = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`;

const popIn = keyframes`
  0% { 
    opacity: 0; 
    transform: translate(-50%, -50%) scale(0.9) translateY(20px);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.02) translateY(-5px);
  }
  100% { 
    opacity: 1; 
    transform: translate(-50%, -50%) scale(1) translateY(0);
  }
`;

const fadeInOverlay = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components avec props
const AppContainer = styled.div`
  background: ${({ darkMode, blur }) => 
    darkMode 
      ? 'linear-gradient(135deg, #0a0a16 0%, #1a1a2e 50%, #16213e 100%)' 
      : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'};
  height: 100vh; /* Utilisation de toute la hauteur de l'écran */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centrage vertical */
  padding: 20px;
  transition: all 0.5s ease;
  font-family: 'Orbitron', sans-serif;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  filter: ${({ blur }) => blur ? 'blur(5px)' : 'none'};
  transition: filter 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ darkMode }) => 
      darkMode 
        ? 'radial-gradient(circle at 20% 30%, rgba(0, 168, 255, 0.1) 0%, transparent 40%)' 
        : 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 40%)'};
    pointer-events: none;
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px; /* Espacement réduit pour s'adapter à l'écran */
  z-index: 10;
  animation: ${float} 4s ease-in-out infinite; /* Animation plus rapide */

  @media (max-width: 768px) {
    margin-bottom: 40px; /* Augmentation de l'espace sur mobile */
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    margin-bottom: 0;
    margin-right: 20px;
    flex: 0 0 auto;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  position: relative;
  margin-bottom: 1.5rem;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: ${({ darkMode }) => 
      darkMode 
        ? 'linear-gradient(135deg, #00a8ff, #00ffea, #00a8ff)' 
        : 'linear-gradient(135deg, #00a8ff, #c3cfe2, #00a8ff)'};
    background-size: 200% 200%;
    animation: ${pulse} 3s ease infinite, ${neonPulse} 3s ease infinite;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: ${({ darkMode }) => 
      darkMode 
        ? 'rgba(10, 10, 22, 0.9)' 
        : 'rgba(245, 247, 250, 0.9)'};
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    width: 120px;
    height: 120px;
    margin-bottom: 0.8rem;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
`;

const ThemeToggle = styled.button`
  width: 44px;
  height: 44px;
  font-size: 1.2rem;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: ${({ darkMode }) => 
    darkMode 
      ? 'rgba(0, 168, 255, 0.4)' 
      : 'rgba(0, 0, 0, 0.2)'};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ darkMode }) => darkMode ? '#00ffea' : '#444'};
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: ${({ darkMode }) => 
    darkMode 
      ? '0 0 15px rgba(0, 168, 255, 0.7)' 
      : '0 0 10px rgba(0,0,0,0.2)'};
  z-index: 20;
  
  &:hover {
    transform: rotate(15deg) scale(1.1);
    box-shadow: ${({ darkMode }) => 
      darkMode 
        ? '0 0 20px rgba(0, 168, 255, 0.9)' 
        : '0 0 15px rgba(0,0,0,0.4)'};
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    bottom: 8px;
    right: 8px;
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
    bottom: 5px;
    right: 5px;
  }
`;

const MessageButton = styled.button`
width: 44px;
  height: 44px;
  font-size: 1.2rem;
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: ${({ darkMode }) => 
    darkMode 
      ? 'rgba(0, 168, 255, 0.4)' 
      : 'rgba(0, 0, 0, 0.2)'};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ darkMode }) => darkMode ? '#00ffea' : '#444'};
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: ${({ darkMode }) => 
    darkMode 
      ? '0 0 15px rgba(0, 168, 255, 0.7)' 
      : '0 0 10px rgba(0,0,0,0.2)'};
  z-index: 20;
  
  &:hover {
    transform: rotate(15deg) scale(1.1);
    box-shadow: ${({ darkMode }) => 
      darkMode 
        ? '0 0 20px rgba(0, 168, 255, 0.9)' 
        : '0 0 15px rgba(0,0,0,0.4)'};
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    bottom: 8px;
    left: 8px;
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
    bottom: 5px;
    left: 5px;
  }
`;

const ClientName = styled.h2`
  color: ${({ darkMode }) => (darkMode ? '#00a8ff' : '#222')};
  font-size: 2.2rem;
  font-weight: 600;
  margin: 1.2rem 0 0;
  text-align: center;
  text-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 10px rgba(0, 168, 255, 0.7)' 
      : 'none'};
  transition: all 0.3s ease;
  letter-spacing: 1px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: ${({ darkMode }) => (darkMode ? '#00ffea' : '#00a8ff')};
    animation: ${hologramGlow} 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 1.5rem 0 0; /* Augmentation de l'espace au-dessus du nom sur mobile */
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: 1.4rem;
    margin: 0.8rem 0 0;
    
    &::after {
      bottom: -6px;
      width: 40px;
      height: 1.5px;
    }
  }
`;

const ClockContainer = styled.div`
  background: ${({ darkMode }) =>
    darkMode 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(15px);
  border: 1px solid ${({ darkMode }) => 
    darkMode 
      ? 'rgba(0, 168, 255, 0.3)' 
      : 'rgba(255, 255, 255, 0.15)'};
  border-radius: 20px;
  padding: clamp(20px, 4vw, 30px);
  width: fit-content;
  width: 90vh;
  max-width: 90vw;
  box-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 40px rgba(0, 168, 255, 0.4), inset 0 0 20px rgba(0, 168, 255, 0.1)' 
      : '0 0 20px rgba(0,0,0,0.1)'};
  transition: all 0.5s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Effet glace futuriste */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: ${({ darkMode }) => 
      darkMode 
        ? 'linear-gradient(135deg, rgba(0, 168, 255, 0.1) 0%, transparent 50%, rgba(0, 255, 234, 0.1) 100%)' 
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%, rgba(200, 200, 255, 0.2) 100%)'};
    pointer-events: none;
    z-index: -1;
  }
  
  /* Effet de bordure glacée */
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 22px;
    background: ${({ darkMode }) => 
      darkMode 
        ? 'linear-gradient(45deg, transparent, rgba(0, 168, 255, 0.2), transparent, rgba(0, 255, 234, 0.2), transparent)' 
        : 'linear-gradient(45deg, transparent, rgba(0, 168, 255, 0.1), transparent, rgba(200, 200, 255, 0.1), transparent)'};
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
    z-index: -2;
    pointer-events: none;
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @media (max-width: 768px) {
    border-radius: 16px;
    padding: clamp(15px, 3vw, 20px);
    width: 85%;
    margin-top: 10px; /* Espace supplémentaire au-dessus de l'horloge sur mobile */
    
    &::after {
      border-radius: 18px;
    }
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    padding: 15px;
    width: 60%;
    margin-top: 0;
    border-radius: 16px;
    
    &::after {
      border-radius: 18px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  position: relative;

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    margin-bottom: 0.3rem;
  }
`;

const TimeNumber = styled.span`
  font-size: clamp(3rem, 10vw, 5rem);
  font-weight: 700;
  color: ${({ darkMode }) => (darkMode ? '#00a8ff' : '#222')};
  line-height: 1;
  animation: ${fadeIn} 0.3s ease-out, ${({ darkMode }) => darkMode ? css`${neonPulse} 3s infinite` : 'none'};
  text-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 5px rgba(0, 168, 255, 0.5), 0 0 10px rgba(0, 168, 255, 0.4)' 
      : 'none'};
  transition: color 0.3s ease, text-shadow 0.3s ease;
  font-variant-numeric: tabular-nums;

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 12vw, 3.5rem);
    text-shadow: none !important;
  }
    @media (max-width: 480px) {
  text-shadow: none !important;
  }
  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: clamp(2rem, 8vw, 2.5rem);
    text-shadow: none !important;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TimeSeparator = styled.span`
  font-size: clamp(3rem, 10vw, 5rem);
  font-weight: 400;
  color: ${({ darkMode }) => (darkMode ? '#00a8ff' : '#444')};
  margin: 0 0.3rem;
  line-height: 1;
  animation: ${pulse} 1s infinite, ${({ darkMode }) => darkMode ? css`${neonPulse} 3s infinite` : 'none'};
  text-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 5px rgba(0, 168, 255, 0.5)' 
      : 'none'};
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 12vw, 3.5rem);
    text-shadow: none !important;
  }
    @media (max-width: 480px) {
  text-shadow: none !important;
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: clamp(2rem, 8vw, 2.5rem);
    text-shadow: none !important;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Seconds = styled.span`
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  font-weight: 500;
  color: ${({ darkMode }) => (darkMode ? '#4fc3f7' : '#666')};
  align-self: flex-end;
  margin-bottom: 0.4rem;
  margin-left: 0.3rem;
  transition: color 0.3s ease;
  text-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 5px rgba(79, 195, 247, 0.5)' 
      : 'none'};

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 3vw, 1.2rem);
    margin-bottom: 0.3rem;
  }
    @media (max-width: 480px) {
  text-shadow: none !important;
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: clamp(0.8rem, 2vw, 1rem);
    margin-bottom: 0.2rem;
    text-shadow: none !important;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    margin-top: 0.3rem;
  }
`;

const DayInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    gap: 0.3rem;
  }
`;

const DayName = styled.span`
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  color: ${({ darkMode }) => (darkMode ? '#ccc' : '#555')};
  letter-spacing: 0.05rem;
  transition: color 0.3s ease;

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: clamp(0.8rem, 2vw, 1rem);
  }
`;

const DayNumber = styled.span`
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  color: ${({ darkMode }) => (darkMode ? '#fff' : '#333')};
  transition: color 0.3s ease;

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: clamp(0.8rem, 2vw, 1rem);
  }
`;

const TemperatureWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    gap: 0.3rem;
  }
`;

const WeatherIcon = styled.div`
  color: ${({ darkMode }) => (darkMode ? '#00ffea' : '#007acc')};
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  transition: color 0.3s ease;
  display: flex;
  align-items: center;

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: clamp(0.8rem, 2vw, 1rem);
  }
`;

const Temperature = styled.div`
  font-size: clamp(0.9rem, 3vw, 1.3rem);
  color: ${({ darkMode }) => (darkMode ? '#00ffea' : '#007acc')};
  text-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 5px rgba(0, 255, 234, 0.5)' 
      : 'none'};
  transition: color 0.3s ease, text-shadow 0.3s ease;

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: clamp(0.8rem, 2vw, 1rem);
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: ${fadeInOverlay} 0.4s ease-out;
`;

const MessageCard = styled.div`
  background: ${({ darkMode }) =>
    darkMode 
      ? 'rgba(0, 0, 0, 0.8)' 
      : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(15px);
  border: 1px solid ${({ darkMode }) => 
    darkMode 
      ? 'rgba(0, 168, 255, 0.4)' 
      : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  box-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 50px rgba(0, 168, 255, 0.5), inset 0 0 20px rgba(0, 168, 255, 0.1)' 
      : '0 0 30px rgba(0,0,0,0.2)'};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${popIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

  /* Effet glace futuriste */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: ${({ darkMode }) => 
      darkMode 
        ? 'linear-gradient(135deg, rgba(0, 168, 255, 0.15) 0%, transparent 50%, rgba(0, 255, 234, 0.15) 100%)' 
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(200, 200, 255, 0.3) 100%)'};
    pointer-events: none;
    z-index: -1;
  }
  
  /* Effet de bordure glacée */
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 22px;
    background: ${({ darkMode }) => 
      darkMode 
        ? 'linear-gradient(45deg, transparent, rgba(0, 168, 255, 0.3), transparent, rgba(0, 255, 234, 0.3), transparent)' 
        : 'linear-gradient(45deg, transparent, rgba(0, 168, 255, 0.2), transparent, rgba(200, 200, 255, 0.2), transparent)'};
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
    z-index: -2;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 85%;
    max-width: 320px;
    padding: 25px 20px;
    border-radius: 16px;
    
    &::after {
      border-radius: 18px;
    }
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    width: 80%;
    max-width: 400px;
    padding: 20px 15px;
    border-radius: 14px;
    
    &::after {
      border-radius: 16px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${({ darkMode }) => 
    darkMode 
      ? 'rgba(0, 168, 255, 0.3)' 
      : 'rgba(0, 0, 0, 0.1)'};
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ darkMode }) => darkMode ? '#00ffea' : '#444'};
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(90deg) scale(1.1);
    background: ${({ darkMode }) => 
      darkMode 
        ? 'rgba(255, 50, 50, 0.3)' 
        : 'rgba(255, 50, 50, 0.2)'};
  }

  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    font-size: 0.8rem;
  }
`;

const MessageContent = styled.div`
  color: ${({ darkMode }) => (darkMode ? '#fff' : '#333')};
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  margin: 20px 0;
  padding: 0 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 15px 0;
    padding: 0 5px;
  }

  /* Mode paysage pour téléphone */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: 0.9rem;
    margin: 15px 0;
    line-height: 1.5;
  }
`;

// Composant pour choisir l'icône en fonction de la température
const TemperatureIcon = ({ darkMode, temperature }) => {
  if (temperature === null || temperature === undefined) {
    return <FaThermometerHalf />;
  }
  
  if (temperature < 0) {
    return <FaSnowflake />;
  } else if (temperature < 10) {
    return <FaCloudRain />;
  } else if (temperature < 20) {
    return <FaCloud />;
  } else if (temperature < 30) {
    return <FaCloudSun />;
  } else {
    return <FaTemperatureHigh />;
  }
};

const RealTimeClock = ({ image, name = "Votre Nom", message = "Voici un message personnalisé que vous pouvez modifier en passant une prop 'message' au composant." }) => {
  const [time, setTime] = useState(new Date());
  const [temperature, setTemperature] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [manualDarkMode, setManualDarkMode] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const CITY = import.meta.env.VITE_WEATHER_CITY || 'cocody';
        if (!API_KEY){throw new Error ('cle api pas confuguré')}
        
        const response = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}&lang=fr`
        );
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données météo');
        }
        
        const data = await response.json();
        setWeatherData(data);
        setTemperature(Math.round(data.main.temp));
        setError(null);
      } catch (err) {
        console.error('Erreur météo:', err);
        setError('Impossible de charger la météo');
        setTemperature(30);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const autoDarkMode = hours >= 18 || hours < 6;
  const darkMode = manualDarkMode !== null ? manualDarkMode : autoDarkMode;

  const toggleDarkMode = () => {
    setManualDarkMode(prev => !prev);
  };

  const toggleMessage = () => {
    setShowMessage(prev => !prev);
  };

  const formatTime = () => {
    const h = hours.toString().padStart(2, '0');
    const m = time.getMinutes().toString().padStart(2, '0');
    const s = time.getSeconds().toString().padStart(2, '0');
    return { h, m, s };
  };

  const formatDate = () => {
    const days = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
    const months = ['Janv.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
    return {
      shortDayName: days[time.getDay()],
      dayName: days[time.getDay()],
      dayNumber: time.getDate(),
      month: months[time.getMonth()],
    };
  };

  const { h, m, s } = formatTime();
  const { shortDayName, dayName, dayNumber, month } = formatDate();

  if (!isClient) {
    return null; // Avoid SSR issues with timezone differences
  }

  return (
    <>
      <AppContainer darkMode={darkMode} blur={showMessage}>
        <ImageContainer>
          <ProfileImageWrapper darkMode={darkMode}>
            <ProfileImage 
              src={image} 
              alt={name}
            />
            <ThemeToggle 
              darkMode={darkMode} 
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </ThemeToggle>
            <MessageButton 
              darkMode={darkMode} 
              onClick={toggleMessage}aria-label="Afficher le message"
            >
              <FaEnvelope />
            </MessageButton>
          </ProfileImageWrapper>
          <ClientName darkMode={darkMode}>{name}</ClientName>
        </ImageContainer>

        <ClockContainer 
          darkMode={darkMode}
          role="timer"
          aria-live="polite"
          aria-label={`Il est ${h} heures ${m}. Nous sommes ${dayName} ${dayNumber}. Température actuelle : ${temperature} degrés Celsius`}
        >
          <TimeWrapper>
            <TimeNumber 
              darkMode={darkMode} 
              key={`h-${h}`}
              aria-hidden="true"
            >
              {h}
            </TimeNumber>
            <TimeSeparator 
              darkMode={darkMode}
              aria-hidden="true"
            >
              :
            </TimeSeparator>
            <TimeNumber 
              darkMode={darkMode} 
              key={`m-${m}`}
              aria-hidden="true"
            >
              {m}
            </TimeNumber>
            <Seconds 
              darkMode={darkMode}
              aria-hidden="true"
            >
              {s}
            </Seconds>
          </TimeWrapper>

          <DateWrapper>
            <DayInfo>
              <DayName 
                darkMode={darkMode}
                aria-hidden="true"
              >
                {shortDayName}
              </DayName>
              <DayNumber 
                darkMode={darkMode}
                aria-hidden="true"
              >
                {dayNumber} {month}
              </DayNumber>
            </DayInfo>
            <TemperatureWrapper>
              <WeatherIcon darkMode={darkMode} aria-hidden="true">
                <TemperatureIcon darkMode={darkMode} temperature={temperature} />
              </WeatherIcon>
              <Temperature 
                darkMode={darkMode}
                aria-label={loading ? "Chargement de température..." : `Température actuelle: ${temperature} degrés Celsius`}
              >
                {loading ? '...' : error ? 'N/A' : `${temperature}°C`}
                 <span className='Desc'>
                    {weatherData && `${weatherData.weather[0].description}`}
                 </span>
              </Temperature>
            </TemperatureWrapper>
          </DateWrapper>
        </ClockContainer>
      </AppContainer>

      {showMessage && (
        <PopupOverlay onClick={toggleMessage}>
          <MessageCard darkMode={darkMode} onClick={(e) => e.stopPropagation()}>
            <CloseButton 
              darkMode={darkMode} 
              onClick={toggleMessage}
              aria-label="Fermer le message"
            >
              <FaTimes />
            </CloseButton>
            <MessageContent darkMode={darkMode}>
              {message}
            </MessageContent>
          </MessageCard>
        </PopupOverlay>
      )}
    </>
  );
};

export default RealTimeClock;

