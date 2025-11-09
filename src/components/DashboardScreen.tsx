import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  PlusCircle, 
  Lightbulb,
  BookOpen,
  Settings,
  Languages,
  Wallet,
  ShoppingBag,
  Car,
  Home
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { BilingualText } from './BilingualText';
import type { Language, UserData, Expense, Screen } from '../App';

interface DashboardScreenProps {
  language: Language;
  userData: UserData;
  expenses: Expense[];
  onNavigate: (screen: Screen) => void;
  onLanguageToggle: () => void;
}

const labels = {
  dashboard: { en: "Dashboard", te: "డాష్‌బోర్డ్" },
  monthlyIncome: { en: "Monthly Income", te: "నెలవారీ ఆదాయం" },
  expenses: { en: "Expenses", te: "ఖర్చులు" },
  savings: { en: "Savings Goal", te: "పొదుపు లక్ష్యం" },
  todaysTip: { en: "Today's Tip", te: "నేటి చిట్కా" },
  tip: { 
    en: "Save first, spend later. Automate your savings!", 
    te: "మొదట పొదుపు చేయండి, తర్వాత ఖర్చు చేయండి!"
  },
  addExpense: { en: "Add Expense", te: "ఖర్చు జోడించు" },
  setGoal: { en: "Set Goal", te: "లక్ష్యం పెట్టు" },
  learnFinance: { en: "Learn Finance", te: "ఆర్థిక విద్య" },
  spendingByCategory: { en: "Spending by Category", te: "వర్గం వారీ ఖర్చు" },
  monthlyOverview: { en: "Monthly Overview", te: "నెలవారీ అవలోకనం" },
  viewAll: { en: "View All", te: "అన్నీ చూడు" },
  savingsProgress: { en: "Savings Progress", te: "పొదుపు పురోగతి" }
};

export function DashboardScreen({ 
  language, 
  userData, 
  expenses,
  onNavigate,
  onLanguageToggle
}: DashboardScreenProps) {

  // Calculate totals
  const income = parseInt(userData.monthlyExpenses) + parseInt(userData.savingsGoal || '0');
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const savingsGoal = parseInt(userData.savingsGoal || '50000');
  const currentSavings = income - totalExpenses;
  const savingsProgress = Math.min((currentSavings / savingsGoal) * 100, 100);

  // Category data for pie chart
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#0D47A1', '#87CEEB', '#81C784', '#FFB74D'];

  // Bar chart data
  const barData = [
    { name: 'Income', value: income },
    { name: 'Expenses', value: totalExpenses },
    { name: 'Savings', value: currentSavings }
  ];

  const categoryIcons = {
    Food: Wallet,
    Transport: Car,
    Shopping: ShoppingBag,
    Bills: Home
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#E6F7FF] to-white overflow-y-auto">
      {/* Header */}
      <div className="bg-[#0D47A1] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <BilingualText 
            english={labels.dashboard.en}
            telugu={labels.dashboard.te}
            primaryClassName="text-2xl font-semibold"
            secondaryClassName="text-sm opacity-70 mt-0.5"
          />
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('settings')}
              className="text-white hover:bg-white/20"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-3"
          >
            <TrendingUp className="w-5 h-5 mb-2 text-[#81C784]" />
            <div className="text-[10px] opacity-80 leading-tight">
              <div>{labels.monthlyIncome.en}</div>
              <div>{labels.monthlyIncome.te}</div>
            </div>
            <p className="mt-1">₹{income.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-3"
          >
            <TrendingDown className="w-5 h-5 mb-2 text-[#FFB74D]" />
            <div className="text-[10px] opacity-80 leading-tight">
              <div>{labels.expenses.en}</div>
              <div>{labels.expenses.te}</div>
            </div>
            <p className="mt-1">₹{totalExpenses.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-3"
          >
            <Target className="w-5 h-5 mb-2 text-[#87CEEB]" />
            <div className="text-[10px] opacity-80 leading-tight">
              <div>{labels.savings.en}</div>
              <div>{labels.savings.te}</div>
            </div>
            <p className="mt-1">₹{savingsGoal.toLocaleString()}</p>
          </motion.div>
        </div>
      </div>

      <div className="p-6 space-y-4 pb-8">
        {/* Savings Progress */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 border-2 border-[#87CEEB]/30 bg-gradient-to-br from-white to-[#E6F7FF]/30">
            <div className="flex justify-between items-center mb-3">
              <BilingualText 
                english={labels.savingsProgress.en}
                telugu={labels.savingsProgress.te}
                primaryClassName="text-[#0D47A1]"
                secondaryClassName="text-xs text-[#0D47A1] opacity-70"
              />
              <p className="text-[#0D47A1]">{Math.round(savingsProgress)}%</p>
            </div>
            <Progress value={savingsProgress} className="h-3 bg-gray-200" />
            <p className="text-sm text-gray-600 mt-2">
              ₹{currentSavings.toLocaleString()} of ₹{savingsGoal.toLocaleString()}
            </p>
          </Card>
        </motion.div>

        {/* Today's Tip */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4 bg-gradient-to-r from-[#81C784]/10 to-[#87CEEB]/10 border-2 border-[#81C784]/30">
            <div className="flex items-start gap-3">
              <div className="bg-[#81C784] rounded-full p-2 mt-1">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <BilingualText 
                  english={labels.todaysTip.en}
                  telugu={labels.todaysTip.te}
                  primaryClassName="text-[#0D47A1] mb-1"
                  secondaryClassName="text-xs text-[#0D47A1] opacity-70"
                />
                <div className="mt-2">
                  <p className="text-sm text-gray-700">{labels.tip.en}</p>
                  <p className="text-xs text-gray-600 mt-1">{labels.tip.te}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <div className="flex justify-between items-center mb-4">
              <BilingualText 
                english={labels.spendingByCategory.en}
                telugu={labels.spendingByCategory.te}
                primaryClassName="text-[#0D47A1]"
                secondaryClassName="text-xs text-[#0D47A1] opacity-70"
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('expenses')}
                className="text-[#0D47A1] text-xs"
              >
                <BilingualText 
                  english={labels.viewAll.en}
                  telugu={labels.viewAll.te}
                  inline
                  secondaryClassName="text-[10px] opacity-70"
                />
              </Button>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieData.map((item, index) => {
                const Icon = categoryIcons[item.name as keyof typeof categoryIcons] || Wallet;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Monthly Overview Bar Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <BilingualText 
              english={labels.monthlyOverview.en}
              telugu={labels.monthlyOverview.te}
              className="mb-4"
              primaryClassName="text-[#0D47A1]"
              secondaryClassName="text-xs text-[#0D47A1] opacity-70"
            />
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar dataKey="value" fill="#87CEEB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-3 pt-2"
        >
          <Button
            onClick={() => onNavigate('expenses')}
            className="bg-[#0D47A1] hover:bg-[#0D47A1]/90 h-auto py-4 flex flex-col gap-1.5"
          >
            <PlusCircle className="w-6 h-6" />
            <div className="text-xs leading-tight text-center">
              <div>{labels.addExpense.en}</div>
              <div className="text-[10px] opacity-80">{labels.addExpense.te}</div>
            </div>
          </Button>

          <Button
            onClick={() => onNavigate('goals')}
            className="bg-[#81C784] hover:bg-[#81C784]/90 h-auto py-4 flex flex-col gap-1.5"
          >
            <Target className="w-6 h-6" />
            <div className="text-xs leading-tight text-center">
              <div>{labels.setGoal.en}</div>
              <div className="text-[10px] opacity-80">{labels.setGoal.te}</div>
            </div>
          </Button>

          <Button
            onClick={() => onNavigate('education')}
            className="bg-[#87CEEB] hover:bg-[#87CEEB]/90 h-auto py-4 flex flex-col gap-1.5"
          >
            <BookOpen className="w-6 h-6" />
            <div className="text-xs leading-tight text-center">
              <div>{labels.learnFinance.en}</div>
              <div className="text-[10px] opacity-80">{labels.learnFinance.te}</div>
            </div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
