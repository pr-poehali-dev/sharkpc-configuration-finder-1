import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FocusInputProps {
  label: string;
  placeholder: string;
  value: string;
  onSave: (value: string) => void;
  onCancel?: () => void;
}

export default function FocusInput({ label, placeholder, value, onSave, onCancel }: FocusInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleOpen = () => {
    setIsOpen(true);
    setInputValue(value);
  };

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(inputValue.trim());
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsOpen(false);
    onCancel?.();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleOpen}
        className="w-full text-left justify-start"
      >
        {value || label}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCancel}
          />
          
          {/* Input container */}
          <div className="relative bg-white rounded-lg shadow-xl p-6 min-w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">{label}</h3>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              className="mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCancel}>
                Отмена
              </Button>
              <Button onClick={handleSave}>
                Подтвердить
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}