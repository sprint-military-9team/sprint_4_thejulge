export type InputDataType = {
  id: string;
  type: string;
  value: string | number;
  label: string;
  errorMessage: string;
  isError: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  unit?: string;
};
