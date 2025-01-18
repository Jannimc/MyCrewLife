import React from 'react';

interface CustomAreaQuestionProps {
  value: string;
  onChange: (value: string) => void;
}

export function CustomAreaQuestion({
  value,
  onChange
}: CustomAreaQuestionProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
      placeholder="Describe the area (e.g., gym, warehouse, event hall, etc.)"
    />
  );
}