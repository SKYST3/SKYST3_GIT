import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 120px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1000;
`;

const ControlRow = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  position: relative;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border: solid #8B8B8B;
    border-width: 0 2px 2px 0;
    display: inline-block;
    position: absolute;
  }

  &.up::before {
    transform: rotate(-135deg);
    top: 17px;
  }

  &.down::before {
    transform: rotate(45deg);
    top: 13px;
  }

  &.left::before {
    transform: rotate(135deg);
    left: 17px;
  }

  &.right::before {
    transform: rotate(-45deg);
    left: 13px;
  }

  &:hover {
    background-color: #f8f8f8;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
    background-color: #f0f0f0;
  }
`;

interface DirectionControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

export function DirectionControls({ onMove }: DirectionControlsProps) {
  return (
    <ControlsContainer>
      <ControlRow>
        <ControlButton className="up" onClick={() => onMove('up')} />
      </ControlRow>
      <ControlRow>
        <ControlButton className="left" onClick={() => onMove('left')} />
        <ControlButton className="down" onClick={() => onMove('down')} />
        <ControlButton className="right" onClick={() => onMove('right')} />
      </ControlRow>
    </ControlsContainer>
  );
} 