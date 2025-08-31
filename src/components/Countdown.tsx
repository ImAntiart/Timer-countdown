import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  LinearProgress,
  Paper,
} from '@mui/material';
import InputTimeControl from './InputTimeControl';
import styled from 'styled-components';

const useSound = () => {
  const audio = useMemo(
    () => new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'),
    []
  );

  const play = useCallback(() => {
    audio.currentTime = 0;
    audio.play().catch((e) => console.warn('Не удалось проиграть звук:', e));
  }, [audio]);

  return play;
};

const CountdownContainer = styled(Paper)`
  padding: 24px;
  max-width: 500px;
  margin: 20px auto;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #1e1e1e;
  color: white;
`;

const TimeDisplay = styled(Typography)<{ finished: boolean }>`
  font-size: 3rem;
  font-weight: 600;
  color: ${(props) => (props.finished ? '#ff5252' : '#81c784')};
  margin: 16px 0;
  transition: color 0.3s ease;
`;

const Countdown: React.FC = () => {
  const [totalTime, setTotalTime] = useState<number>(60); 
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const progress = useMemo(
    () => ((totalTime - timeLeft) / totalTime) * 100,
    [totalTime, timeLeft]
  );

  const playSound = useSound();

  const handleTimeChange = useCallback((seconds: number) => {
    setTotalTime(seconds);
    setTimeLeft(seconds);
  }, []);

  const startTimer = useCallback(() => {
    if (isRunning || timeLeft <= 0) return;

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIsRunning(false);
          playSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
    setIsRunning(true);
  }, [isRunning, timeLeft, playSound]);

  const pauseTimer = useCallback(() => {
    if (!isRunning || !intervalId) return;

    clearInterval(intervalId);
    setIntervalId(null);
    setIsRunning(false);
  }, [isRunning, intervalId]);

  const resetTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimeLeft(totalTime);
    setIsRunning(false);
  }, [intervalId, totalTime]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [timeLeft]);

  return (
    <CountdownContainer elevation={3}>
      <Typography variant="h5" component="h2" gutterBottom>
        Обратный отсчёт
      </Typography>

      <InputTimeControl
        totalSeconds={totalTime}
        onChange={handleTimeChange}
        disabled={isRunning}
      />

      <Box sx={{ mt: 3 }}>
        <TimeDisplay finished={timeLeft === 0}>
          {formattedTime}
        </TimeDisplay>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#444',
            '& .MuiLinearProgress-bar': {
              backgroundColor: timeLeft === 0 ? '#ff5252' : '#4caf50',
            },
          }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {Math.round(progress)}% завершено
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Button
          variant={isRunning ? 'outlined' : 'contained'}
          color={isRunning ? 'warning' : 'success'}
          onClick={isRunning ? pauseTimer : startTimer}
          size="large"
          disabled={totalTime === 0}
        >
          {isRunning ? 'Пауза' : 'Старт'}
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={resetTimer}
          size="large"
        >
          Сброс
        </Button>
      </Stack>
    </CountdownContainer>
  );
};

export default React.memo(Countdown);