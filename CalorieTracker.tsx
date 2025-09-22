
import React, { useState, useMemo } from 'react';
import type { FoodItem } from '../types';

const CalorieTracker: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    { id: 1, name: 'Apple', calories: 95 },
    { id: 2, name: 'Chicken Breast (100g)', calories: 165 },
    { id: 3, name: 'Salad', calories: 150 },
  ]);
  const [foodName, setFoodName] = useState<string>('');
  const [calories, setCalories] = useState<string>('');

  const totalCalories = useMemo(() => {
    return foodItems.reduce((total, item) => total + item.calories, 0);
  }, [foodItems]);

  const addFoodItem = (e: React.FormEvent) => {
    e.preventDefault();
    const cal = parseInt(calories, 10);
    if (foodName && cal > 0) {
      setFoodItems([
        ...foodItems,
        { id: Date.now(), name: foodName, calories: cal },
      ]);
      setFoodName('');
      setCalories('');
    }
  };

  const removeFoodItem = (id: number) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Calorie Tracker</h2>
      <div className="text-center mb-6 p-4 bg-blue-100 rounded-lg">
        <p className="text-lg font-medium text-slate-600">Total Calories Today</p>
        <p className="text-4xl font-bold text-blue-600">{totalCalories}</p>
      </div>

      <form onSubmit={addFoodItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Food name"
          className="sm:col-span-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories"
          className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="sm:col-span-3 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Add Food
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Today's Log</h3>
        <ul className="space-y-2">
          {foodItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-slate-50 p-3 rounded-md"
            >
              <div>
                <span className="font-medium text-slate-800">{item.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-slate-500">{item.calories} kcal</span>
                <button
                  onClick={() => removeFoodItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
           {foodItems.length === 0 && (
            <p className="text-center text-slate-500 py-4">No food logged yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CalorieTracker;
