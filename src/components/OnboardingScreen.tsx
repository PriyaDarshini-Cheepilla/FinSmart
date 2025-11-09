import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, IndianRupee, TrendingUp, Target, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { BilingualText } from './BilingualText';
import type { Language, UserData } from '../App';

interface OnboardingScreenProps {
  language: Language;
  onComplete: (data: UserData) => void;
}

const labels = {
  title: { en: "Let's Get Started", te: "మొదలు పెడదాం" },
  subtitle: { en: "Tell us about your finances", te: "మీ ఆర్థిక వివరాలు చెప్పండి" },
  incomeLabel: { en: "Monthly Income Range", te: "నెలవారీ ఆదాయ పరిధి" },
  expensesLabel: { en: "Estimated Monthly Expenses", te: "అంచనా నెలవారీ ఖర్చులు" },
  goalLabel: { en: "Savings Goal (₹)", te: "పొదుపు లక్ష్యం (₹)" },
  prioritiesLabel: { en: "Financial Priorities", te: "ఆర్థిక ప్రాధాన్యతలు" },
  continue: { en: "Continue", te: "కొనసాగించు" },
  priorities: [
    { en: "Save for emergencies", te: "అత్యవసర పొదుపు" },
    { en: "Pay off debts", te: "అప్పులు తీర్చడం" },
    { en: "Build wealth", te: "సంపద నిర్మాణం" },
    { en: "Track spending", te: "ఖర్చు ట్రాకింగ్" },
    { en: "Learn about finance", te: "ఆర్థిక విద్య" }
  ]
};

export function OnboardingScreen({ language, onComplete }: OnboardingScreenProps) {
  const [incomeRange, setIncomeRange] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [priorities, setPriorities] = useState<string[]>([]);

  const handlePriorityToggle = (priorityEn: string) => {
    if (priorities.includes(priorityEn)) {
      setPriorities(priorities.filter(p => p !== priorityEn));
    } else {
      setPriorities([...priorities, priorityEn]);
    }
  };

  const handleContinue = () => {
    onComplete({
      incomeRange,
      monthlyExpenses,
      savingsGoal,
      priorities
    });
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#E6F7FF] to-white overflow-y-auto">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 opacity-10">
        <IndianRupee className="w-24 h-24 text-[#0D47A1]" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-10">
        <TrendingUp className="w-20 h-20 text-[#81C784]" />
      </div>

      <div className="relative z-10 p-6 pb-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 mt-4"
        >
          <BilingualText 
            english={labels.title.en}
            telugu={labels.title.te}
            primaryClassName="text-[#0D47A1] text-2xl font-semibold mb-1"
            secondaryClassName="text-[#0D47A1] text-sm opacity-70 mb-2"
          />
          <BilingualText 
            english={labels.subtitle.en}
            telugu={labels.subtitle.te}
            primaryClassName="text-gray-600"
            secondaryClassName="text-gray-500 text-sm"
          />
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          {/* Income Range */}
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <BilingualText 
              english={labels.incomeLabel.en}
              telugu={labels.incomeLabel.te}
              className="mb-2"
              primaryClassName="text-[#0D47A1]"
              secondaryClassName="text-[#0D47A1] text-xs opacity-70"
            />
            <Select value={incomeRange} onValueChange={setIncomeRange}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-20000">₹0 - ₹20,000</SelectItem>
                <SelectItem value="20000-40000">₹20,000 - ₹40,000</SelectItem>
                <SelectItem value="40000-60000">₹40,000 - ₹60,000</SelectItem>
                <SelectItem value="60000-100000">₹60,000 - ₹1,00,000</SelectItem>
                <SelectItem value="100000+">₹1,00,000+</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          {/* Monthly Expenses */}
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <BilingualText 
              english={labels.expensesLabel.en}
              telugu={labels.expensesLabel.te}
              className="mb-2"
              primaryClassName="text-[#0D47A1]"
              secondaryClassName="text-[#0D47A1] text-xs opacity-70"
            />
            <Input
              type="number"
              placeholder="₹25,000"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full"
            />
          </Card>

          {/* Savings Goal */}
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#0D47A1]" />
              <BilingualText 
                english={labels.goalLabel.en}
                telugu={labels.goalLabel.te}
                primaryClassName="text-[#0D47A1]"
                secondaryClassName="text-[#0D47A1] text-xs opacity-70"
              />
            </div>
            <Input
              type="number"
              placeholder="₹50,000"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
              className="w-full"
            />
          </Card>

          {/* Priorities */}
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <BilingualText 
              english={labels.prioritiesLabel.en}
              telugu={labels.prioritiesLabel.te}
              className="mb-3"
              primaryClassName="text-[#0D47A1]"
              secondaryClassName="text-[#0D47A1] text-xs opacity-70"
            />
            <div className="space-y-3">
              {labels.priorities.map((priority, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Checkbox
                    id={`priority-${index}`}
                    checked={priorities.includes(priority.en)}
                    onCheckedChange={() => handlePriorityToggle(priority.en)}
                    className="border-[#87CEEB]"
                  />
                  <label
                    htmlFor={`priority-${index}`}
                    className="text-gray-700 cursor-pointer flex-1"
                  >
                    <div>{priority.en}</div>
                    <div className="text-xs text-gray-600">{priority.te}</div>
                  </label>
                  {priorities.includes(priority.en) && (
                    <CheckCircle2 className="w-5 h-5 text-[#81C784]" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!incomeRange || !monthlyExpenses || !savingsGoal}
            className="w-full bg-[#0D47A1] hover:bg-[#0D47A1]/90 h-12 mt-6"
          >
            <BilingualText 
              english={labels.continue.en}
              telugu={labels.continue.te}
              inline
              secondaryClassName="text-xs opacity-80 ml-1"
            />
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
