import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateLoanPayoff } from '../utils/calculators';
import { LoanPayoffInputs, LoanPayoffResults } from '../types/calculator';

export const LoanPayoffCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<LoanPayoffInputs>({
    loanAmount: 20000,
    interestRate: 5.5,
    monthlyPayment: 400,
    additionalPayment: 0,
  });

  const [results, setResults] = useState<LoanPayoffResults>({
    monthsToPayoff: 0,
    totalInterest: 0,
    totalPayment: 0,
    payoffDate: new Date(),
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateLoanPayoff(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Loan Payoff Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Plan your loan repayment strategy
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Loan Details
          </h2>
          <InputField
            label="Loan Amount"
            value={inputs.loanAmount}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, loanAmount: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Interest Rate"
            value={inputs.interestRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, interestRate: value }))
            }
            min={0}
            max={100}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Monthly Payment"
            value={inputs.monthlyPayment}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, monthlyPayment: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <InputField
            label="Additional Payment"
            value={inputs.additionalPayment}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, additionalPayment: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Payoff</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Months to Payoff"
            amount={results.monthsToPayoff}
            isCurrency={false}
            description={`Payoff date: ${results.payoffDate.toLocaleDateString()}`}
          />
          <ResultCard
            title="Total Interest"
            amount={results.totalInterest}
            description="Total interest you will pay"
          />
          <ResultCard
            title="Monthly Payment"
            amount={inputs.monthlyPayment + inputs.additionalPayment}
            description="Your total monthly payment"
          />
          <ResultCard
            title="Total Payment"
            amount={results.totalPayment}
            description="Total amount you will pay"
          />
        </div>
      </div>
    </div>
  );
};