import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Slider } from '@mui/material';

interface InputTimeControlProps {
  totalSeconds: number;
  onChange: (seconds: number) => void;
  disabled: boolean;
}

const StyledSlider = styled(Slider)`
  margin: 24px 0;
`;

const InputTimeControl: React.FC<InputTimeControlProps> = ({ totalSeconds, onChange, disabled }) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(720, Number(e.target.value) || 0); 
    const newTotal = value * 60 + seconds;
    onChange(newTotal);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(59, Number(e.target.value) || 0));
    const newTotal = minutes * 60 + value;
    onChange(newTotal);
  };

  const handleSliderChange = (e: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    const roundedSeconds = Math.round(value / 15) * 15;
    onChange(roundedSeconds);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Установите время
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          label="Минуты"
          type="number"
          value={minutes}
          onChange={handleMinutesChange}
          disabled={disabled}
          inputProps={{ min: 0, max: 720 }}
          size="small"
          sx={{ width: 100 }}
        />
        <Typography variant="body1">:</Typography>
        <TextField
          label="Секунды"
          type="number"
          value={seconds}
          onChange={handleSecondsChange}
          disabled={disabled}
          inputProps={{ min: 0, max: 59 }}
          size="small"
          sx={{ width: 100 }}
        />
      </Box>

      <StyledSlider
        value={totalSeconds}
        min={0}
        max={3600}
        step={15} 
        disabled={disabled}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="input-slider"
      />

      <Typography variant="body2" color="text.secondary" align="center">
        {Math.floor(totalSeconds / 60)} мин {totalSeconds % 60} сек
      </Typography>
    </Box>
  );
};

export default React.memo(InputTimeControl);