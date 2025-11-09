import { motion } from 'motion/react';
import { ArrowLeft, AlertCircle, CheckCircle, TrendingDown, Target, Wallet, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { Language, UserData, Expense } from '../App';

interface RecommendationsScreenProps {
  language: Language;
  userData: UserData;
  expenses: Expense[];
  onBack: () => void;
}

const translations = {
  en: {
    title: "Recommendations",
    subtitle: "Personalized financial advice",
    forYou: "For You",
    action: "Action Required",
    goodHabit: "Good Habit",
    warning: "Warning",
    implement: "Implement"
  },
  te: {
    title: "సిఫార్సులు / Recommendations",
    subtitle: "వ్యక్తిగతీకరించిన ఆర్థిక సలహా",
    forYou: "మీ కోసం / For You",
    action: "చర్య అవసరం / Action Required",
    goodHabit: "మంచి అలవాటు / Good Habit",
    warning: "హెచ్చరిక / Warning",
    implement: "అమలు చేయండి / Implement"
  }
};

interface Recommendation {
  type: 'alert' | 'success' | 'warning';
  title: string;
  titleTe: string;
  description: string;
  descriptionTe: string;
  icon: React.ElementType;
}

export function RecommendationsScreen({
  language,
  userData,
  expenses,
  onBack
}: RecommendationsScreenProps) {
  const t = translations[language];

  // Calculate insights
  const income = parseInt(userData.monthlyExpenses) + parseInt(userData.savingsGoal || '0');
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const savingsGoal = parseInt(userData.savingsGoal || '50000');
  const currentSavings = income - totalExpenses;
  const savingsRate = (currentSavings / income) * 100;

  // Category spending
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const highestCategory = Object.entries(categoryTotals).reduce(
    (max, [cat, amount]) => (amount > max.amount ? { category: cat, amount } : max),
    { category: '', amount: 0 }
  );

  // Generate recommendations
  const recommendations: Recommendation[] = [];

  // Rule 1: Expenses > Income
  if (totalExpenses > income) {
    recommendations.push({
      type: 'alert',
      title: 'Reduce Discretionary Spending',
      titleTe: 'విచక్షణ ఖర్చును తగ్గించండి',
      description: `Your expenses (₹${totalExpenses.toLocaleString()}) exceed your income (₹${income.toLocaleString()}). Review and cut non-essential spending.`,
      descriptionTe: `మీ ఖర్చులు (₹${totalExpenses.toLocaleString()}) మీ ఆదాయం (₹${income.toLocaleString()}) కంటే ఎక్కువగా ఉన్నాయి. అనవసరమైన ఖర్చులను తగ్గించండి.`,
      icon: AlertCircle
    });
  }

  // Rule 2: Low savings rate
  if (savingsRate < 20) {
    recommendations.push({
      type: 'warning',
      title: 'Automate Your Savings',
      titleTe: 'మీ పొదుపును ఆటోమేట్ చేయండి',
      description: `You're saving only ${savingsRate.toFixed(1)}% of your income. Aim for at least 20%. Set up automatic transfers to a savings account.`,
      descriptionTe: `మీరు మీ ఆదాయంలో కేవలం ${savingsRate.toFixed(1)}% మాత్రమే పొదుపు చేస్తున్నారు. కనీసం 20% లక్ష్యంగా పెట్టుకోండి. పొదుపు ఖాతాకు ఆటోమేటిక్ బదిలీలు సెటప్ చేయండి.`,
      icon: TrendingDown
    });
  } else {
    recommendations.push({
      type: 'success',
      title: 'Great Savings Rate!',
      titleTe: 'గొప్ప పొదుపు రేటు!',
      description: `You're saving ${savingsRate.toFixed(1)}% of your income - that's excellent! Keep up this healthy financial habit.`,
      descriptionTe: `మీరు మీ ఆదాయంలో ${savingsRate.toFixed(1)}% పొదుపు చేస్తున్నారు - ఇది అద్భుతం! ఈ ఆరోగ్యకరమైన ఆర్థిక అలవాటును కొనసాగించండి.`,
      icon: Award
    });
  }

  // Rule 3: High spending in one category
  if (highestCategory.category && highestCategory.amount > income * 0.3) {
    recommendations.push({
      type: 'warning',
      title: `Review Your ${highestCategory.category} Budget`,
      titleTe: `మీ ${highestCategory.category} బడ్జెట్‌ను సమీక్షించండి`,
      description: `You're spending ₹${highestCategory.amount.toLocaleString()} on ${highestCategory.category} (${((highestCategory.amount / income) * 100).toFixed(1)}% of income). Consider ways to reduce this.`,
      descriptionTe: `మీరు ${highestCategory.category}పై ₹${highestCategory.amount.toLocaleString()} ఖర్చు చేస్తున్నారు (ఆదాయంలో ${((highestCategory.amount / income) * 100).toFixed(1)}%). దీన్ని తగ్గించే మార్గాలను పరిశీలించండి.`,
      icon: Wallet
    });
  }

  // Rule 4: Close to goal
  if (currentSavings >= savingsGoal * 0.8 && currentSavings < savingsGoal) {
    recommendations.push({
      type: 'success',
      title: 'Almost at Your Goal!',
      titleTe: 'దాదాపు మీ లక్ష్యం వద్ద!',
      description: `You're ${((currentSavings / savingsGoal) * 100).toFixed(1)}% toward your savings goal. Just a little more to go!`,
      descriptionTe: `మీరు మీ పొదుపు లక్ష్యంలో ${((currentSavings / savingsGoal) * 100).toFixed(1)}% వరకు వచ్చారు. ఇంకా కొంచెం మాత్రమే!`,
      icon: Target
    });
  }

  // Rule 5: Emergency fund recommendation
  if (savingsRate >= 15 && currentSavings < income * 3) {
    recommendations.push({
      type: 'warning',
      title: 'Build an Emergency Fund',
      titleTe: 'అత్యవసర నిధిని నిర్మించండి',
      description: 'Aim to save 3-6 months of expenses for emergencies. You\'re on the right track with your savings!',
      descriptionTe: 'అత్యవసర పరిస్థితుల కోసం 3-6 నెలల ఖర్చులను పొదుపు చేయడం లక్ష్యంగా పెట్టుకోండి. మీ పొదుపుతో మీరు సరైన మార్గంలో ఉన్నారు!',
      icon: CheckCircle
    });
  }

  const getCardStyle = (type: Recommendation['type']) => {
    switch (type) {
      case 'alert':
        return {
          border: 'border-red-200',
          bg: 'bg-gradient-to-r from-red-50 to-white',
          iconBg: 'bg-red-500',
          badge: 'bg-red-500'
        };
      case 'success':
        return {
          border: 'border-green-200',
          bg: 'bg-gradient-to-r from-green-50 to-white',
          iconBg: 'bg-green-500',
          badge: 'bg-green-500'
        };
      case 'warning':
        return {
          border: 'border-orange-200',
          bg: 'bg-gradient-to-r from-orange-50 to-white',
          iconBg: 'bg-orange-500',
          badge: 'bg-orange-500'
        };
    }
  };

  const getBadgeText = (type: Recommendation['type']) => {
    switch (type) {
      case 'alert':
        return t.action;
      case 'success':
        return t.goodHabit;
      case 'warning':
        return t.warning;
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#E6F7FF] to-white overflow-y-auto">
      {/* Header */}
      <div className="bg-[#0D47A1] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1>{t.title}</h1>
            <p className="text-sm opacity-80 mt-1">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 pb-8">
        {/* Header Badge */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <Badge className="bg-[#81C784] text-white px-3 py-1">
            {t.forYou}
          </Badge>
          <p className="text-sm text-gray-600">{recommendations.length} recommendations</p>
        </motion.div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const style = getCardStyle(rec.type);
            const Icon = rec.icon;

            return (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-4 border-2 ${style.border} ${style.bg}`}>
                  <div className="flex items-start gap-4">
                    <div className={`${style.iconBg} rounded-full p-3 flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-[#0D47A1]">
                          {language === 'en' ? rec.title : rec.titleTe}
                        </p>
                        <Badge className={`${style.badge} text-white text-xs`}>
                          {getBadgeText(rec.type)}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed">
                        {language === 'en' ? rec.description : rec.descriptionTe}
                      </p>

                      {rec.type !== 'success' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 border-[#0D47A1] text-[#0D47A1] hover:bg-[#0D47A1] hover:text-white"
                        >
                          {t.implement}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: recommendations.length * 0.1 + 0.2 }}
        >
          <Card className="p-4 bg-gradient-to-r from-[#87CEEB]/10 to-[#81C784]/10 border-2 border-[#87CEEB]/30">
            <div className="flex items-start gap-3">
              <div className="bg-[#0D47A1] rounded-full p-2">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[#0D47A1] mb-1">Keep Learning!</p>
                <p className="text-sm text-gray-700">
                  {language === 'en'
                    ? 'These recommendations are based on your current financial data. Update your expenses regularly for better insights.'
                    : 'ఈ సిఫార్సులు మీ ప్రస్తుత ఆర్థిక డేటా ఆధారంగా ఉన్నాయి. మెరుగైన అంతర్దృష్టుల కోసం మీ ఖర్చులను క్రమం తప్పకుండా నవీకరించండి.'}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
