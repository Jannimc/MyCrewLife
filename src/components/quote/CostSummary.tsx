import React from 'react';
import { Receipt, AlertCircle } from 'lucide-react';
import { QuoteFormData } from '../../types/quote';

interface CostSummaryProps {
  formData: QuoteFormData;
}

export function CostSummary({ formData }: CostSummaryProps) {
  // Base prices
  const prices = {
    services: {
      regular_home: 30,
      deep_cleaning: 45,
      spring_cleaning: 50,
      end_of_tenancy: 60,
      move_in_out: 55,
      post_renovation: 65,
      office_cleaning: 40,
      disinfection: 35,
      retail_cleaning: 45
    },
    extraServices: {
      ironing: 15,
      laundry: 20,
      fridge: 25,
      oven: 30,
      windows: 20
    }
  };

  // Calculate service costs
  const calculateServiceCost = () => {
    return formData.services?.reduce((total, service) => {
      return total + (prices.services[service as keyof typeof prices.services] || 0);
    }, 0);
  };

  // Calculate extra services cost
  const calculateExtraServicesCost = () => {
    return formData.extraServices?.reduce((total, service) => {
      return total + (prices.extraServices[service as keyof typeof prices.extraServices] || 0);
    }, 0);
  };

  // Calculate area-based costs
  const calculateAreaCost = () => {
    let areaCost = 0;

    // Residential areas
    if (Object.keys(formData.residentialAreas || {}).length > 0) {
      areaCost += Object.values(formData.residentialAreas).reduce((sum, count) => sum + (count * 15), 0);
    }

    // Commercial areas
    if (Object.keys(formData.commercialAreas || {}).length > 0) {
      areaCost += Object.values(formData.commercialAreas).reduce((sum, count) => sum + (count * 20), 0);
    }

    return areaCost;
  };

  // Calculate frequency discount
  const getFrequencyDiscount = () => {
    switch (formData.frequency) {
      case 'weekly':
        return 0.15; // 15% discount
      case 'biweekly':
        return 0.10; // 10% discount
      case 'monthly':
        return 0.05; // 5% discount
      default:
        return 0;
    }
  };

  const subtotal = (calculateServiceCost() + calculateExtraServicesCost() + calculateAreaCost());
  const discount = subtotal * getFrequencyDiscount();
  const total = subtotal - discount;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Cost Summary</h2>
        <Receipt className="w-5 h-5 text-emerald-500" />
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-4">
        {calculateServiceCost() > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Selected Services</span>
            <span className="font-medium text-gray-900">£{calculateServiceCost().toFixed(2)}</span>
          </div>
        )}

        {calculateExtraServicesCost() > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Extra Services</span>
            <span className="font-medium text-gray-900">£{calculateExtraServicesCost().toFixed(2)}</span>
          </div>
        )}

        {calculateAreaCost() > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Area Charges</span>
            <span className="font-medium text-gray-900">£{calculateAreaCost().toFixed(2)}</span>
          </div>
        )}

        {discount > 0 && (
          <>
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">£{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-sm text-emerald-600">
              <span>Frequency Discount ({(getFrequencyDiscount() * 100)}%)</span>
              <span className="font-medium">-£{discount.toFixed(2)}</span>
            </div>
          </>
        )}

        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between text-base font-semibold">
            <span className="text-gray-900">Total</span>
            <span className="text-emerald-600">£{total.toFixed(2)}</span>
          </div>
          {formData.frequency && formData.frequency !== 'oneTime' && (
            <p className="text-sm text-gray-500 mt-1">
              per {formData.frequency.replace('ly', '')} clean
            </p>
          )}
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-6 bg-emerald-50 rounded-lg p-4">
        <div className="flex">
          <AlertCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="ml-3">
            <p className="text-sm text-emerald-700">
              Final price may vary based on specific requirements and property conditions. A detailed quote will be provided after the initial assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}