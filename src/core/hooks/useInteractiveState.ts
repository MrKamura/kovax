import { useState } from 'react';

export interface InteractiveState {
  isHover: boolean;
  isActive: boolean;
  isFocused: boolean;
}

export const useInteractiveState = (): [
  InteractiveState,
  {
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleMouseDown: () => void;
    handleMouseUp: () => void;
    handleFocus: () => void;
    handleBlur: () => void;
  }
] => {
  const [state, setState] = useState<InteractiveState>({
    isHover: false,
    isActive: false,
    isFocused: false,
  });

  const handlers = {
    handleMouseEnter: () => setState(prev => ({ ...prev, isHover: true })),
    handleMouseLeave: () => setState({ isHover: false, isActive: false, isFocused: false }),
    handleMouseDown: () => setState(prev => ({ ...prev, isActive: true })),
    handleMouseUp: () => setState(prev => ({ ...prev, isActive: false })),
    handleFocus: () => setState(prev => ({ ...prev, isFocused: true })),
    handleBlur: () => setState(prev => ({ ...prev, isFocused: false })),
  };

  return [state, handlers];
};