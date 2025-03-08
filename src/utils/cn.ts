/**
 * Utility function to conditionally join class names
 * @param inputs - Class values to be joined
 * @returns A string of joined class names
 */
type ClassValue = string | number | boolean | undefined | null;
type ClassArray = ClassValue[];
type ClassDictionary = Record<string, any>;
type ClassInput = ClassValue | ClassArray | ClassDictionary;

export function cn(...inputs: ClassInput[]): string {
  // Filter out falsy values and join with space
  return inputs
    .filter(Boolean)
    .filter(input => {
      if (typeof input === 'string') return input.trim().length > 0;
      return true;
    })
    .join(' ');
}