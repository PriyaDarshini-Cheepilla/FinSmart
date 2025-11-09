import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ExpenseTrackerScreen } from './components/ExpenseTrackerScreen';
import { GoalTrackerScreen } from './components/GoalTrackerScreen';
import { RecommendationsScreen } from './components/RecommendationsScreen';
import { EducationScreen } from './components/EducationScreen';
import { SettingsScreen } from './components/SettingsScreen';

export type Screen = 'splash' | 'onboarding' | 'dashboard' | 'expenses' | 'goals' | 'recommendations' | 'education' | 'settings';

export type Language = 'en' | 'te';

export interface UserData {
  incomeRange: string;
  monthlyExpenses: string;
  savingsGoal: string;
  priorities: string[];
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  paymentMode: string;
  note: string;
  date: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [language, setLanguage] = useState<Language>('en');
  const [userData, setUserData] = useState<UserData>({
    incomeRange: '',
    monthlyExpenses: '',
    savingsGoal: '',
    priorities: []
  });
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      category: 'Food',
      amount: 2500,
      paymentMode: 'UPI',
      note: 'Groceries',
      date: '2025-11-08'
    },
    {
      id: '2',
      category: 'Transport',
      amount: 800,
      paymentMode: 'Cash',
      note: 'Auto fare',
      date: '2025-11-07'
    },
    {
      id: '3',
      category: 'Shopping',
      amount: 1500,
      paymentMode: 'Card',
      note: 'Clothing',
      date: '2025-11-06'
    }
  ]);

  useEffect(() => {
    // Auto-navigate from splash to onboarding after 2 seconds
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile Container */}
      <div className="w-full max-w-md h-[812px] bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        {currentScreen === 'splash' && (
          <SplashScreen />
        )}
        {currentScreen === 'onboarding' && (
          <OnboardingScreen
            language={language}
            onComplete={(data) => {
              setUserData(data);
              setCurrentScreen('dashboard');
            }}
          />
        )}
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            language={language}
            userData={userData}
            expenses={expenses}
            onNavigate={setCurrentScreen}
            onLanguageToggle={() => setLanguage(language === 'en' ? 'te' : 'en')}
          />
        )}
        {currentScreen === 'expenses' && (
          <ExpenseTrackerScreen
            language={language}
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )}
        {currentScreen === 'goals' && (
          <GoalTrackerScreen
            language={language}
            userData={userData}
            onUpdateGoal={(goal) => setUserData({ ...userData, savingsGoal: goal })}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )}
        {currentScreen === 'recommendations' && (
          <RecommendationsScreen
            language={language}
            userData={userData}
            expenses={expenses}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )}
        {currentScreen === 'education' && (
          <EducationScreen
            language={language}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )}
        {currentScreen === 'settings' && (
          <SettingsScreen
            language={language}
            onLanguageChange={setLanguage}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )}
      </div>
    </div>
  );
}
