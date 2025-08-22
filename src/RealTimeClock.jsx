

import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaSun, FaMoon, FaThermometerHalf } from 'react-icons/fa';

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
  0% { text-shadow: 0 0 5px #00a8ff, 0 0 10px #00a8ff, 0 0 15px #00a8ff, 0 0 20px #00a8ff; }
  50% { text-shadow: 0 0 10px #00a8ff, 0 0 20px #00a8ff, 0 0 30px #00a8ff, 0 0 40px #00a8ff; }
  100% { text-shadow: 0 0 5px #00a8ff, 0 0 10px #00a8ff, 0 0 15px #00a8ff, 0 0 20px #00a8ff; }
`;

// Style Comtainair avec props
const AppContainer = styled.div`
  background: ${({ darkMode }) => 
    darkMode 
      ? 'linear-gradient(135deg, #0a0a16 0%, #1a1a2e 50%, #16213e 100%)' 
      : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'};
  min-height: 100vh;
  width : 100% ;
  display: flex;
  align-items: center;
  justify-content: center;
//   padding: 20px;
  transition: all 0.5s ease;
  font-family: 'Orbitron', sans-serif;
  margin:Opx;
`;

const Container = styled.div`
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
  // width: 90vw;
  max-width: 95vw;
  box-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 40px rgba(0, 168, 255, 0.4), inset 0 0 20px rgba(0, 168, 255, 0.1)' 
      : '0 0 20px rgba(0,0,0,0.1)'};
  margin: 0 auto;
  transition: all 0.5s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  @media (max-width: 768px) {
    border-radius: 16px;
    padding: clamp(15px, 3vw, 20px);
    width: 90%;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${({ darkMode }) => 
    darkMode 
      ? 'rgba(0, 168, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ darkMode }) => darkMode ? '#00a8ff' : '#444'};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: ${({ darkMode }) => 
    darkMode 
      ? '0 0 15px rgba(0, 168, 255, 0.5)' 
      : '0 0 10px rgba(0,0,0,0.1)'};
  
  &:hover {
    transform: rotate(15deg);
    box-shadow: ${({ darkMode }) => 
      darkMode 
        ? '0 0 20px rgba(0, 168, 255, 0.8)' 
        : '0 0 15px rgba(0,0,0,0.3)'};
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    top: 10px;
    right: 10px;
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  position: relative;
`;

const TimeNumber = styled.span`
  font-size: clamp(3.5rem, 12vw, 6rem);
  font-weight: 700;
  color: ${({ darkMode }) => (darkMode ? '#00a8ff' : '#222')};
  line-height: 1;
  animation: ${fadeIn} 0.3s ease-out, ${({ darkMode }) => darkMode ? css`${neonPulse} 2s infinite` : 'none'};
  text-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 10px rgba(0, 168, 255, 0.7), 0 0 20px rgba(0, 168, 255, 0.4)' 
      : 'none'};
  transition: color 0.3s ease, text-shadow 0.3s ease;
  font-variant-numeric: tabular-nums;

  @media (max-width: 768px) {
    font-size: clamp(3rem, 15vw, 4rem);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TimeSeparator = styled.span`
  font-size: clamp(3.5rem, 12vw, 6rem);
  font-weight: 400;
  color: ${({ darkMode }) => (darkMode ? '#00a8ff' : '#444')};
  margin: 0 0.3rem;
  line-height: 1;
  animation: ${pulse} 1s infinite, ${({ darkMode }) => darkMode ? css`${neonPulse} 2s infinite` : 'none'};
  text-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 5px rgba(0, 168, 255, 0.5)' 
      : 'none'};
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: clamp(3rem, 15vw, 4rem);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Seconds = styled.span`
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 500;
  color: ${({ darkMode }) => (darkMode ? '#4fc3f7' : '#666')};
  align-self: flex-end;
  margin-bottom: 0.4rem;
  margin-left: 0.3rem;
  transition: color 0.3s ease;
  text-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 5px rgba(79, 195, 247, 0.7)' 
      : 'none'};

  @media (max-width: 768px) {
    font-size: clamp(1rem, 4vw, 1.4rem);
    margin-bottom: 0.3rem;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
`;

const DayInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DayName = styled.span`
  font-size: clamp(1rem, 3vw, 1.3rem);
  color: ${({ darkMode }) => (darkMode ? '#ccc' : '#555')};
  letter-spacing: 0.05rem;
  transition: color 0.3s ease;
`;

const DayNumber = styled.span`
  font-size: clamp(1rem, 3vw, 1.3rem);
  color: ${({ darkMode }) => (darkMode ? '#fff' : '#333')};
  transition: color 0.3s ease;
`;

const TemperatureWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const TemperatureIcon = styled(FaThermometerHalf)`
  color: ${({ darkMode }) => (darkMode ? '#00ffea' : '#007acc')};
  font-size: clamp(1rem, 3vw, 1.3rem);
  transition: color 0.3s ease;
`;

const Temperature = styled.div`
  font-size: clamp(1rem, 3.5vw, 1.4rem);
  color: ${({ darkMode }) => (darkMode ? '#00ffea' : '#007acc')};
  text-shadow: ${({ darkMode }) =>
    darkMode 
      ? '0 0 8px rgba(0, 255, 234, 0.5)' 
      : 'none'};
  transition: color 0.3s ease, text-shadow 0.3s ease;
`;

const RealTimeClock = () => {
  const [time, setTime] = useState(new Date());
  const [temperature] = useState(30);
  const [manualDarkMode, setManualDarkMode] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const autoDarkMode = hours >= 18 || hours < 6;
  const darkMode = manualDarkMode !== null ? manualDarkMode : autoDarkMode;

  const toggleDarkMode = () => {
    setManualDarkMode(prev => !prev);
  };

  const formatTime = () => {
    const h = hours.toString().padStart(2, '0');
    const m = time.getMinutes().toString().padStart(2, '0');
    const s = time.getSeconds().toString().padStart(2, '0');
    return { h, m, s };
  };

  const formatDate = () => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return {
      shortDayName: days[time.getDay()].substring(0, 3) + '.',
      dayName: days[time.getDay()],
      dayNumber: time.getDate(),
    };
  };

  const { h, m, s } = formatTime();
  const { shortDayName, dayName, dayNumber } = formatDate();

  if (!isClient) {
    return null; // Avoid SSR issues with timezone differences
  }

  return (
    <AppContainer darkMode={darkMode}>
      <Container 
        darkMode={darkMode}
        role="timer"
        aria-live="polite"
        aria-label={`Il est ${h} heures ${m}. Nous sommes ${dayName} ${dayNumber}. Température actuelle : ${temperature} degrés Celsius`}
      >
        <ThemeToggle 
          darkMode={darkMode} 
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>

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
              {dayNumber}
            </DayNumber>
          </DayInfo>
          <TemperatureWrapper>
            <TemperatureIcon darkMode={darkMode} aria-hidden="true" />
            <Temperature 
              darkMode={darkMode}
              aria-label={`Température: ${temperature}°C`}
            >
              {temperature}°C
            </Temperature>
          </TemperatureWrapper>
        </DateWrapper>
      </Container>
    </AppContainer>
  );
};

export default RealTimeClock;



