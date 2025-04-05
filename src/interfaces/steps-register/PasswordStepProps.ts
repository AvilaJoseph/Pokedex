export interface PasswordStepProps {
    password: string;
    setPassword: (value: string) => void;
    onNext: () => void;
    onBack: () => void;
  }