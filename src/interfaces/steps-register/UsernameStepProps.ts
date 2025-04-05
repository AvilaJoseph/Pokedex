// Interfaces para el paso de Username
export default interface UsernameStepProps {
    username: string;
    setUsername: (value: string) => void;
    onNext: () => void;
    onBack: () => void;
  }
  