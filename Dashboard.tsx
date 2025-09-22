
import React from 'react';
import { Page } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { FireIcon } from './icons/FireIcon';

interface DashboardProps {
  setCurrentPage: (page: Page) => void;
}

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ title, description, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-slate-200"
    >
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <p className="mt-1 text-slate-500 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-8">
      <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800">Welcome to Vilux Care</h2>
        <p className="mt-2 text-slate-500 max-w-2xl mx-auto">
          Your personal health companion. Track your progress, get insights, and stay motivated on your wellness journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title={Page.AIHealthAssistant}
          description="Ask our AI for quick health and wellness tips."
          icon={<SparklesIcon />}
          onClick={() => setCurrentPage(Page.AIHealthAssistant)}
        />
        <FeatureCard
          title={Page.BMICalculator}
          description="Calculate your Body Mass Index to understand your weight status."
          icon={<CalculatorIcon />}
          onClick={() => setCurrentPage(Page.BMICalculator)}
        />
        <FeatureCard
          title={Page.CalorieTracker}
          description="Log your meals to keep track of your daily calorie intake."
          icon={<FireIcon />}
          onClick={() => setCurrentPage(Page.CalorieTracker)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
