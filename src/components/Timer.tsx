import React, { useState, useCallback, useMemo } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import styled from 'styled-components';

const TimerContainer = styled(Box)`
  padding: 24px;
  border: 1px solid #aaaaaaff;
  border-radius: 12px;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffffff;
`;

const TimeDisplay = styled(Typography)<{ running: boolean }>`
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  font-weight: 500;
  color: ${(props) => (props.running ? '#f06000ff' : '#0f0f0fff')};
  margin: 16px 0;
  transition: color 0.3s ease;
`;

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (isRunning) return;

    const id = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);

    setIntervalId(id);
    setIsRunning(true);
  }, [isRunning]);

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
    setTime(0);
    setIsRunning(false);
  }, [intervalId]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10); 

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  }, [time]);

  return (
    <TimerContainer>
      <Typography variant="h5" component="h2" gutterBottom>
        Таймер
      </Typography>

      <TimeDisplay running={isRunning}>
        {formattedTime}
      </TimeDisplay>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant={isRunning ? 'outlined' : 'contained'}
          color={isRunning ? 'warning' : 'success'}
          onClick={isRunning ? pauseTimer : startTimer}
          size="large"
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
    </TimerContainer>
  );
};


export default React.memo(Timer);