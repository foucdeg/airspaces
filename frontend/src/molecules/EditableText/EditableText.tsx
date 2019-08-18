import React, { useState, useEffect } from 'react';

const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => e.target.select();

interface Props {
  value: string;
  onSubmit: (newValue: string) => void;
}

const EditableText: React.FunctionComponent<Props> = ({ value, onSubmit }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>('');

  useEffect(() => {
    if (!editing) {
      setCurrentValue(value);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setEditing(false);
    onSubmit(currentValue);
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentValue(e.target.value.substring(0, 64));

  const handleReset = () => {
    setEditing(false);
    setCurrentValue(value);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(true);
  };

  const staticRender = (
    <strong onClick={handleClick} style={{ cursor: 'text' }} title="Click to edit">
      {value}
    </strong>
  );

  const editingRender = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoFocus
        onFocus={handleFocus}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleReset}
      />
    </form>
  );

  return editing ? editingRender : staticRender;
};

export default EditableText;
