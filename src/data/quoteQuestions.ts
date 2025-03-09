import { Question } from '../types/quote';
import { Home, Sparkles, Brush, Key, Box, Building, SprayCan, Hammer, Store } from 'lucide-react';

export const questions: Question[] = [
  {
    id: 'postcode',
    title: 'What is your postcode?',
    description: 'Enter your postcode so we can match you with cleaners in your area',
    type: 'text',
    validation: { 
      required: true,
      pattern: '^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$'
    }
  },
  {
    id: 'services',
    title: 'Which service/services do you want?',
    description: 'Select the cleaning services you need',
    type: 'multiselect',
    options: [
      {
        value: 'regular_home',
        label: 'Regular Home Cleaning',
        description: 'Weekly or bi-weekly cleaning to keep your home spotless',
        features: ['Dusting & wiping', 'Vacuuming & mopping', 'Kitchen & bathroom cleaning', 'Bed making'],
        icon: Home
      },
      {
        value: 'deep_cleaning',
        label: 'Deep Cleaning',
        description: 'Thorough cleaning of every nook and cranny',
        features: ['Inside cabinets', 'Behind appliances', 'Window cleaning', 'Deep carpet cleaning'],
        icon: Sparkles
      },
      {
        value: 'spring_cleaning',
        label: 'Spring Cleaning',
        description: 'Annual deep clean to refresh your space',
        features: ['Seasonal decluttering', 'Deep sanitization', 'Window washing', 'Furniture cleaning'],
        icon: Brush
      },
      {
        value: 'end_of_tenancy',
        label: 'End of Tenancy',
        description: 'Get your deposit back with our thorough cleaning',
        features: ['Full property cleaning', 'Oven & appliance cleaning', 'Carpet deep clean', 'Window cleaning'],
        icon: Key
      },
      {
        value: 'move_in_out',
        label: 'Move In/Out Cleaning',
        description: 'Start fresh in your new home',
        features: ['Pre-move cleaning', 'Post-move cleaning', 'Cabinet sanitization', 'Floor restoration'],
        icon: Box
      },
      {
        value: 'post_renovation',
        label: 'Post-Renovation Cleaning',
        description: 'Professional cleanup after construction or renovation',
        features: ['Construction debris removal', 'Dust & particle cleaning', 'Surface sanitization', 'Paint spot removal'],
        icon: Hammer
      },
      {
        value: 'office_cleaning',
        label: 'Office Cleaning',
        description: 'Professional cleaning services for workspaces',
        features: ['Workspace sanitization', 'Kitchen & break rooms', 'Meeting rooms', 'Reception areas'],
        icon: Building
      },
      {
        value: 'disinfection',
        label: 'Disinfection Service',
        description: 'Sanitization and disinfection of high-touch areas',
        features: ['Surface disinfection', 'Air purification', 'Touch point cleaning', 'EPA-approved products'],
        icon: SprayCan
      },
      {
        value: 'retail_cleaning',
        label: 'Retail Store Cleaning',
        description: 'Comprehensive cleaning for retail environments',
        features: ['Floor maintenance', 'Window cleaning', 'Display area dusting', 'High-touch sanitization'],
        icon: Store
      }
    ],
    validation: { required: true }
  },
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
      { 
        value: 'other',
        label: 'Other',
        subOptions: [
          { value: 'shed', label: 'Shed' },
          { value: 'garage', label: 'Garage' },
          { value: 'carport', label: 'Car Port' },
          { value: 'caravan', label: 'Caravan' },
          { value: 'custom', label: 'Custom' }
        ]
      }
    ],
    validation: { required: true }
  },
  {
    id: 'residentialAreas',
    title: 'Which areas need cleaning?',
    description: 'Select the number of each area that needs cleaning',
    type: 'counter',
    options: [
      { value: 'kitchen', label: 'Kitchen' },
      { value: 'livingRoom', label: 'Living Room' },
      { value: 'bedrooms', label: 'Bedrooms' },
      { value: 'bathrooms', label: 'Bathrooms' },
      { value: 'windows', label: 'Windows' },
      { value: 'office', label: 'Home Office' },
      { value: 'basement', label: 'Basement' }
    ],
    validation: { required: true },
    conditional: {
      field: 'propertyType',
      value: ['house', 'apartment']
    }
  },
  {
    id: 'extraServices',
    title: 'Would you like any extra services?',
    description: 'These additional services are available at an extra cost',
    type: 'multiselect',
    options: [
      { value: 'ironing', label: 'Ironing Service' },
      { value: 'laundry', label: 'Laundry Service' },
      { value: 'fridge', label: 'Inside Fridge Cleaning' },
      { value: 'oven', label: 'Inside Oven Cleaning' },
      { value: 'windows', label: 'Inside Windows Cleaning' }
    ],
    conditional: {
      field: 'propertyType',
      value: ['house', 'apartment']
    }
  },
  {
    id: 'commercialAreas',
    title: 'Which areas need cleaning?',
    description: 'Select the number of each area that needs cleaning',
    type: 'counter',
    options: [
      { value: 'offices', label: 'Offices/Cubicles' },
      { value: 'meetingRooms', label: 'Meeting Rooms' },
      { value: 'breakRoom', label: 'Break Room/Kitchen' },
      { value: 'reception', label: 'Reception Area' },
      { value: 'storage', label: 'Storage/Stockroom' },
      { value: 'bathrooms', label: 'Bathrooms' }
    ],
    validation: { required: true },
    conditional: {
      field: 'propertyType',
      value: ['office', 'retail']
    }
  },
  {
    id: 'otherAreas',
    title: 'General Areas',
    description: 'Select all areas that need cleaning',
    type: 'multiselect',
    options: [
      { value: 'floors', label: 'Floors' },
      { value: 'windows', label: 'Windows' },
      { value: 'walls', label: 'Walls' },
      { value: 'ceilings', label: 'Ceilings' },
      { value: 'furniture', label: 'Furniture/Fixtures' }
    ],
    validation: { required: true },
    conditional: {
      field: 'propertyType',
      value: 'other'
    }
  },
  {
    id: 'customAreaName',
    title: 'Custom Room/Area Name',
    description: 'Describe the area that needs cleaning',
    type: 'text',
    validation: { required: true },
    conditional: {
      field: 'propertyType',
      value: 'other'
    }
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
    title: 'When would you like your cleaning service?',
    description: 'Select your preferred date for the cleaning service',
    type: 'select',
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
    validation: { required: true },
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