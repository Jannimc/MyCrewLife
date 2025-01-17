export interface QuoteFormData {
  propertyType: string;
  squareFootage: string;
  residentialAreas: Record<string, number>;
  commercialAreas: Record<string, number>;
  otherAreas: string[];
  customAreaName: string;
  extraServices: string[];
  frequency: string;
  preferredDay: string;
  preferredTime: string;
  specialRequirements: string;
  hasPets: boolean | undefined;
  petDetails: string;
  accessInstructions: string;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'select' | 'number' | 'counter' | 'text' | 'radio' | 'time' | 'boolean' | 'multiselect';
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