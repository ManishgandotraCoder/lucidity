export interface InputInterface {
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  prefixIcon?: React.ReactNode; // Accepts an icon as a prop
  disabled?: boolean;
}
