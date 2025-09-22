export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// FIX: Add Page enum for navigation and titles to resolve import errors in Header.tsx and Dashboard.tsx.
export enum Page {
  Dashboard = 'Dashboard',
  BMICalculator = 'BMI Calculator',
  CalorieTracker = 'Calorie Tracker',
  AIHealthAssistant = 'AI Health Assistant',
}

// FIX: Add FoodItem interface for the Calorie Tracker to resolve import error in CalorieTracker.tsx.
export interface FoodItem {
  id: number;
  name: string;
  calories: number;
}
