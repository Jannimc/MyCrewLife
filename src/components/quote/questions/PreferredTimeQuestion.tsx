import React from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';

interface PreferredTimeQuestionProps {
  value: string;
  onChange: (value: string) => void;
}

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 8; hour <= 19; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = new Date();
      time.setHours(hour, minute);
      options.push(time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
    }
  }

  // Add exactly 8:00 PM
  const eightPM = new Date();
  eightPM.setHours(20, 0);
  options.push(eightPM.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }));

  return options;
};

const formatTime = (time: string) => {
  try {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    return time;
  }
};

export function PreferredTimeQuestion({
  value,
  onChange
}: PreferredTimeQuestionProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const timeOptions = React.useMemo(() => generateTimeOptions(), []);

  React.useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Convert AM/PM time to 24-hour format for input
  const getInitialTime = () => {
    if (!value) return '09:00';
    try {
      const [time, period] = value.split(' ');
      const [hours, minutes] = time.split(':');
      let hour = parseInt(hours);
      
      if (period === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        hour = 0;
      }
      
      return `${hour.toString().padStart(2, '0')}:${minutes}`;
    } catch (e) {
      return '09:00';
    }
  };

  const handleTimeSelect = (selectedTime: string) => {
    onChange(selectedTime);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-200" />
        <div className="relative" ref={dropdownRef}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          {isMobile ? (
            <input
              type="time"
              value={getInitialTime()}
              onChange={(e) => {
                const formattedTime = formatTime(e.target.value);
                onChange(formattedTime);
              }}
              min="08:00"
              max="20:00"
              step="900"
              className="block w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg font-medium text-center cursor-pointer"
            />
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="block w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg font-medium text-center cursor-pointer bg-white relative"
              >
                <span>{value || '9:00 AM'}</span>
                <div className="absolute inset-y-0 right-4 flex items-center">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-[280px] overflow-y-auto scrollbar-thin">
                  <div className="py-2">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`w-full px-4 py-3 text-sm hover:bg-emerald-50 transition-colors duration-200 text-left ${
                          value === time ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-500 text-center">
        Choose any time between 8:00 AM and 8:00 PM
      </p>
    </div>
  );
}