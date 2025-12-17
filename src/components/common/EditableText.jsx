import { useState, useRef, useEffect } from 'react';
import './EditableText.css';

function EditableText({ value, onChange, className, placeholder = '클릭하여 편집' }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [width, setWidth] = useState('auto');
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    if (spanRef.current) {
      setWidth(spanRef.current.offsetWidth + 'px');
    }
  }, [value, editValue]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim() && editValue !== value) {
      onChange(editValue);
    } else {
      setEditValue(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  if (isEditing) {
    return (
      <>
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`editable-text-input ${className}`}
          placeholder={placeholder}
          style={{ width: editValue ? 'auto' : width, minWidth: '100px' }}
          size={editValue.length || placeholder.length}
        />
        <span ref={spanRef} className={`editable-text-measure ${className}`}>
          {editValue || placeholder}
        </span>
      </>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`editable-text ${className}`}
      title="클릭하여 편집"
      style={{ display: 'inline-block', width: 'auto' }}
    >
      {value || placeholder}
    </div>
  );
}

export default EditableText;
