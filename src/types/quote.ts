export interface QuoteFormData {
  propertyType: string;
  squareFootage: string;
  bedrooms: string;
  bathrooms: string;
  areas: string[];
  frequency: string;
  preferredDay: string;
  preferredTime: string;
  specialRequirements: string;
  hasPets: boolean;
  petDetails?: string;
  accessInstructions: string;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'select' | 'number' | 'multiselect' | 'text' | 'radio' | 'time' | 'boolean';
  options?: { value: string; label: string }[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  conditional?: {
    field: string;
    value: any;
  };
}