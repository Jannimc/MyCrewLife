import { Question } from '../types/quote';

export const questions: Question[] = [
  {
    id: 'propertyType',
    title: 'What type of property needs cleaning?',
    description: 'Select the type of property that best describes your space',
    type: 'select',
    options: [
      { value: 'house', label: 'House' },
      { value: 'apartment', label: 'Apartment' },
      { value: 'office', label: 'Office' },
      { value: 'retail', label: 'Retail Space' },
      { value: 'other', label: 'Other' }
    ],
    validation: { required: true }
  },
  {
    id: 'squareFootage',
    title: 'What is the approximate square footage?',
    description: 'This helps us estimate the time needed for cleaning',
    type: 'select',
    options: [
      { value: 'under500', label: 'Under 500 sq ft' },
      { value: '500-1000', label: '500-1000 sq ft' },
      { value: '1000-2000', label: '1000-2000 sq ft' },
      { value: '2000-3000', label: '2000-3000 sq ft' },
      { value: 'over3000', label: 'Over 3000 sq ft' }
    ],
    validation: { required: true }
  },
  {
    id: 'bedrooms',
    title: 'How many bedrooms need cleaning?',
    type: 'number',
    validation: { required: true, min: 0, max: 10 },
    conditional: {
      field: 'propertyType',
      value: ['house', 'apartment']
    }
  },
  {
    id: 'bathrooms',
    title: 'How many bathrooms need cleaning?',
    type: 'number',
    validation: { required: true, min: 0, max: 10 }
  },
  {
    id: 'areas',
    title: 'Which areas need cleaning?',
    description: 'Select all areas that require cleaning',
    type: 'multiselect',
    options: [
      { value: 'kitchen', label: 'Kitchen' },
      { value: 'livingRoom', label: 'Living Room' },
      { value: 'bedrooms', label: 'Bedrooms' },
      { value: 'bathrooms', label: 'Bathrooms' },
      { value: 'windows', label: 'Windows' },
      { value: 'office', label: 'Home Office' },
      { value: 'basement', label: 'Basement' },
      { value: 'garage', label: 'Garage' }
    ],
    validation: { required: true }
  },
  {
    id: 'frequency',
    title: 'How often would you like cleaning service?',
    type: 'radio',
    options: [
      { value: 'oneTime', label: 'One-time cleaning' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'biweekly', label: 'Bi-weekly' },
      { value: 'monthly', label: 'Monthly' }
    ],
    validation: { required: true }
  },
  {
    id: 'preferredDay',
    title: 'What is your preferred cleaning day?',
    type: 'select',
    options: [
      { value: 'monday', label: 'Monday' },
      { value: 'tuesday', label: 'Tuesday' },
      { value: 'wednesday', label: 'Wednesday' },
      { value: 'thursday', label: 'Thursday' },
      { value: 'friday', label: 'Friday' },
      { value: 'saturday', label: 'Saturday' }
    ],
    validation: { required: true }
  },
  {
    id: 'preferredTime',
    title: 'What is your preferred time?',
    type: 'select',
    options: [
      { value: 'morning', label: '8:00 AM - 12:00 PM' },
      { value: 'afternoon', label: '12:00 PM - 4:00 PM' },
      { value: 'evening', label: '4:00 PM - 8:00 PM' }
    ],
    validation: { required: true }
  },
  {
    id: 'hasPets',
    title: 'Do you have any pets?',
    type: 'boolean',
    validation: { required: true }
  },
  {
    id: 'petDetails',
    title: 'Please provide details about your pets',
    description: 'This helps us prepare appropriately for the cleaning',
    type: 'text',
    conditional: {
      field: 'hasPets',
      value: true
    }
  },
  {
    id: 'accessInstructions',
    title: 'How should the cleaner access your property?',
    description: 'Please provide any specific access instructions',
    type: 'text',
    validation: { required: true }
  },
  {
    id: 'specialRequirements',
    title: 'Do you have any special requirements or preferences?',
    description: 'Let us know about any specific cleaning preferences or requirements',
    type: 'text'
  }
];