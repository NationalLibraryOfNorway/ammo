import {Theme, useTheme} from '@/providers/ThemeProvider';
import {LuMoon, LuSun} from 'react-icons/lu';
import React from 'react';
import {Button} from '@nextui-org/button';
import {Tooltip} from '@nextui-org/tooltip';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Tooltip content={theme === Theme.Dark ? 'Bytt til lys modus' : 'Bytt til mørk modus'}>
      <Button isIconOnly variant="light" onClick={toggleTheme} className="p-2">
        {theme === Theme.Dark ? <LuSun size={24}/> : <LuMoon size={24}/>}
      </Button>
    </Tooltip>
  );
};