import React, { ChangeEvent } from 'react';
import Input from 'components/Input';
import { Label, Error, Row } from './InputRow.style';

interface Props {
  label?: string | null;
  error?: string | null;
  type: string;
  disabled?: boolean;
  placeholder?: string;
  field: {
    name?: string;
    onBlur?: () => any;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => void;
    value?: string;
  };
}

const InputRow: React.FunctionComponent<Props> = props => {
  const { error, field, label, disabled, type, placeholder } = props;
  const hasError = !!error;

  return (
    <Row>
      {label && <Label>{label}</Label>}
      <Input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        hasError={hasError}
        {...field}
      />
      {hasError && <Error>{error}</Error>}
    </Row>
  );
};

export default InputRow;
