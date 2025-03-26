import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, addDays, isSunday } from 'date-fns';

interface PreferredDayQuestionProps {
  value: string;
  onChange: (value: string) => void;
}

const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

export function PreferredDayQuestion({
  value,
  onChange
}: PreferredDayQuestionProps) {
  // Convert string date to Date object for DatePicker
  const selectedDate = parseDate(value);

  // Get tomorrow's date as minimum selectable date
  const tomorrow = addDays(new Date(), 1);

  // Get date 3 months from now as maximum selectable date
  const maxDate = addMonths(new Date(), 3);

  // Filter out Sundays (0 = Sunday)
  const filterWeekends = (date: Date) => {
    return !isSunday(date);
  };

  const handleDateChange = (date: Date) => {
    // Ensure we're working with a valid date
    if (date && !isNaN(date.getTime())) {
      // Set the time to noon UTC to avoid timezone issues
      const utcDate = new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12, 0, 0
      ));
      onChange(utcDate.toISOString().split('T')[0]);
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25 transition duration-200" />
        <div className="relative bg-white rounded-xl p-4">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={tomorrow}
            maxDate={maxDate}
            filterDate={filterWeekends}
            dateFormat="MMMM d, yyyy"
            inline
            calendarClassName="w-full"
            monthsShown={1}
            showPopperArrow={false}
            fixedHeight
            shouldCloseOnSelect={false}
            disabledKeyboardNavigation
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between px-2 py-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={`p-1 rounded-full hover:bg-emerald-50 transition-colors duration-200 ${
                    prevMonthButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={`p-1 rounded-full hover:bg-emerald-50 transition-colors duration-200 ${
                    nextMonthButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
            renderDayContents={(day, date) => (
              <div
                className={`w-full h-full p-2 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                  date && selectedDate && 
                  date.getFullYear() === selectedDate.getFullYear() &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getDate() === selectedDate.getDate()
                    ? 'bg-emerald-500 text-white'
                    : 'hover:bg-emerald-50'
                }`}
              >
                {day}
              </div>
            )}
          />
          <p className="mt-4 text-sm text-gray-500 text-center">
            Choose any date within the next 3 months (excluding Sundays)
          </p>
        </div>
      </div>
    </div>
  );
}