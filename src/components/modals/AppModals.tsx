import React from 'react';
import { CityAirData } from '../../types';
import { AboutModal } from '../AboutModal';
import { CreditsModal } from '../CreditsModal';
import { AIAssistantChat } from '../AIAssistantChat';

interface AppModalsProps {
  currentCity: CityAirData;
  isAboutOpen: boolean;
  isCreditsOpen: boolean;
  isAIOpen: boolean;
  onCloseAbout: () => void;
  onCloseCredits: () => void;
  onCloseAI: () => void;
}

/** Overlay modal containers for About, Image Credits, and AI Assistant. */
export const AppModals: React.FC<AppModalsProps> = ({
  currentCity,
  isAboutOpen,
  isCreditsOpen,
  isAIOpen,
  onCloseAbout,
  onCloseCredits,
  onCloseAI
}) => {
  return (
    <>
      <AboutModal isOpen={isAboutOpen} onClose={onCloseAbout} />
      <CreditsModal isOpen={isCreditsOpen} onClose={onCloseCredits} />
      <AIAssistantChat city={currentCity} isOpen={isAIOpen} onClose={onCloseAI} />
    </>
  );
};
