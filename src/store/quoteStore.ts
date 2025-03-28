import { create } from 'zustand';
import { QuoteFormData } from '../types/quote';

interface QuoteState {
  formData: QuoteFormData;
  setFormData: (data: Partial<QuoteFormData>) => void;
}

export const useQuoteStore = create<QuoteState>((set) => ({
  formData: {
    postcode: '',
    propertyType: '',
    services: [],
    residentialAreas: {},
    commercialAreas: {},
    otherAreas: [],
    customAreaName: '',
    extraServices: [],
    frequency: '',
    preferredDay: '',
    preferredTime: '',
    specialRequirements: '',
    hasPets: undefined,
    petDetails: '',
    accessInstructions: ''
  },
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  }))
}));