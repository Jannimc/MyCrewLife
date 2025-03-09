import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface PreferredDayQuestionProps {
  value: string;
  onChange: (value: string) => void;
}

export function PreferredDayQuestion({
  value,
  onChange
}: PreferredDayQuestionProps) {
  // Convert string date to Date object for DatePicker
  const selectedDate = value ? new Date(value) : null;

  // Get tomorrow's date as minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get date 3 months from now as maximum selectable date
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  // Filter out Sundays (0 = Sunday)
  const filterWeekends = (date: Date) => {
    return date.getDay() !== 0;
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-200" />
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => onChange(date.toISOString().split('T')[0])}
          minDate={tomorrow}
          maxDate={maxDate}
          filterDate={filterWeekends}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a date"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg font-medium text-center cursor-pointer"
          wrapperClassName="relative w-full"
          calendarClassName="bg-white border border-gray-200 rounded-lg shadow-lg"
          showPopperArrow={false}
        />
      </div>
      <p className="mt-3 text-sm text-gray-500 text-center">
        Choose any date within the next 3 months (excluding Sundays)
      </p>
    </div>
  );
}