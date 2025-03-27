import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Home, Building, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { debounce } from '../../utils/debounce.ts';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  postcode: string;
  is_default: boolean;
}

interface Suggestion {
  postcode: string;
  address: string;
  district: string;
}

interface PostcodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect?: (address: Address) => void;
  onValidate?: () => void;
}

export function PostcodeInput({ value, onChange, onAddressSelect, onValidate, error }: PostcodeInputProps) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [filteredAddresses, setFilteredAddresses] = useState<Address[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownHeight, setDropdownHeight] = useState('250px');

  // UK postcode regex pattern
  const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;

  // Input validation function
  const validateInput = (input: string): boolean => {
    // Check for inappropriate content
    const blockedTerms = ['offensive', 'inappropriate']; // Add terms to block
    return !blockedTerms.some(term => input.toLowerCase().includes(term));
  };

  // Debounced function to fetch address suggestions
  const fetchSuggestions = debounce(async (input: string) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${input}/autocomplete`);
      const data = await response.json();
      
      if (data.result) {
        // Fetch full details for each postcode
        const detailsPromises = data.result.map(async (postcode: string) => {
          const detailsResponse = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
          const details = await detailsResponse.json();
          return {
            postcode,
            address: `${details.result.admin_district}, ${details.result.admin_ward}`,
            district: details.result.admin_district
          };
        });

        const suggestions = await Promise.all(detailsPromises);
        setSuggestions(suggestions);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setSuggestions([]);
    }
  }, 300);

  // Fetch user's saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false });

        if (error) throw error;
        setAddresses(data || []);
      } catch (err) {
        console.error('Error fetching addresses:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [user]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    if (user && addresses.length > 0 && !value) {
      setShowDropdown(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    
    // Just update the value and filter addresses, no validation
    onChange(newValue);
    
    // Filter saved addresses
    if (addresses.length > 0) {
      const filtered = addresses.filter(addr => 
        addr.postcode.toLowerCase().includes(newValue.toLowerCase()) ||
        addr.street.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredAddresses(filtered);
    }
    
    // Fetch suggestions
    if (newValue) {
      setShowDropdown(true);
      fetchSuggestions(newValue);
    } else {
      setShowDropdown(false);
      setSuggestions([]);
    }
  };

  const handleAddressSelect = (address: Address) => {
    // First update the input value
    onChange(address.postcode);
    // Notify parent component about selected address
    if (onAddressSelect) {
      onAddressSelect(address);
    }
    setShowDropdown(false);
    // Validate the selected postcode
    validatePostcode(address.postcode);
  };

  const validatePostcode = async (postcode: string) => {
    setIsValidating(true);

    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`);
      const data = await response.json();
      setIsValid(data.result);
      if (!data.result) {
        onValidate?.();
      }
    } catch (err) {
      setIsValid(false);
      onValidate?.();
    } finally {
      setIsValidating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    onChange(newValue);
  };

  const getAddressIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home':
        return <Home className="w-4 h-4" />;
      case 'office':
        return <Building className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MapPin className={`h-5 w-5 ${isValidating ? 'text-emerald-500 animate-pulse' : 'text-gray-400'}`} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className={`block w-full pl-11 pr-4 py-4 border ${error || validationError ? 'border-red-300' : 'border-gray-200'} rounded-lg sm:rounded-r-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm text-gray-900`}
          placeholder="Enter your postcode"
          maxLength={8}
        />
      </div>

      {/* Error Message */}
      {validationError && (
        <p className="mt-2 text-sm text-red-600">
          {validationError}
        </p>
      )}

      {/* Addresses Dropdown */}
      {showDropdown && (filteredAddresses.length > 0 || suggestions.length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 animate-fade-in max-h-[240px]"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-25"></div>
            <div className="relative bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden max-h-[240px] overflow-y-auto scrollbar-thin">
              <div className="py-2 px-0.5">
                {/* Saved Addresses */}
                {filteredAddresses.map((address) => (
                  <button
                    key={address.id}
                    onClick={() => handleAddressSelect(address)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 group transition-colors duration-200"
                  >
                    <div className={`text-gray-400 group-hover:text-emerald-500 transition-colors duration-200 ${address.is_default ? 'text-emerald-500' : ''}`}>
                      {getAddressIcon(address.label)}
                    </div>
                    <div className="flex-1 truncate">
                      <span className="text-sm font-medium text-gray-900">{address.label}</span>
                      <p className="text-sm text-gray-500 truncate">
                        {address.street}, {address.postcode}
                      </p>
                    </div>
                    {address.is_default && (
                      <Star className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
                
                {/* Live Suggestions */}
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.postcode}
                    onClick={() => {
                      onChange(suggestion.postcode);
                      setShowDropdown(false);
                      validatePostcode(suggestion.postcode);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 group transition-colors duration-200"
                  >
                    <div className="text-gray-400 group-hover:text-emerald-500 transition-colors duration-200">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1 truncate">
                      <span className="text-sm font-medium text-gray-900">{suggestion.postcode}</span>
                      <p className="text-sm text-gray-500 truncate">{suggestion.address}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}