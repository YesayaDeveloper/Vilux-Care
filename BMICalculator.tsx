
import React, { useState, useMemo } from 'react';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmiValue = w / (h / 100) ** 2;
      setBmi(bmiValue);
    } else {
      setBmi(null);
    }
  };

  const { category, colorClass } = useMemo(() => {
    if (bmi === null) return { category: '', colorClass: 'text-slate-500' };
    if (bmi < 18.5) return { category: 'Underweight', colorClass: 'text-blue-500' };
    if (bmi < 24.9) return { category: 'Normal weight', colorClass: 'text-green-500' };
    if (bmi < 29.9) return { category: 'Overweight', colorClass: 'text-yellow-500' };
    return { category: 'Obesity', colorClass: 'text-red-500' };
  }, [bmi]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">BMI Calculator</h2>
      <form onSubmit={calculateBmi} className="space-y-4">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-slate-600">Height (cm)</label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 175"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-slate-600">Weight (kg)</label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 70"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Calculate BMI
        </button>
      </form>
      {bmi !== null && (
        <div className="mt-8 text-center p-6 bg-slate-100 rounded-lg">
          <p className="text-lg text-slate-600">Your BMI is</p>
          <p className="text-5xl font-bold text-blue-600 my-2">{bmi.toFixed(1)}</p>
          <p className={`text-xl font-semibold ${colorClass}`}>{category}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
