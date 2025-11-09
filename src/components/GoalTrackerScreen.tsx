import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Target, TrendingUp, Edit3, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import type { Language, UserData } from '../App';

interface GoalTrackerScreenProps {
  language: Language;
  userData: UserData;
  onUpdateGoal: (goal: string) => void;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Goal Tracker",
    savingsGoal: "Savings Goal",
    currentSavings: "Current Savings",
    progress: "Progress",
    updateGoal: "Update Goal",
    newGoal: "New Goal Amount (₹)",
    save: "Save Changes",
    motivation: "Small steps create big savings!",
    youAre: "You're",
    towardGoal: "toward your savings goal!",
    keepGoing: "Keep going! You're doing great.",
    almostThere: "Almost there! Stay focused."
  },
  te: {
    title: "లక్ష్య ట్రాకర్ / Goal Tracker",
    savingsGoal: "పొదుపు లక్ష్యం / Savings Goal",
    currentSavings: "ప్రస్తుత పొదుపు / Current Savings",
    progress: "పురోగతి / Progress",
    updateGoal: "లక్ష్యం నవీకరించు / Update Goal",
    newGoal: "కొత్త లక్ష్యం మొత్తం / New Goal Amount (₹)",
    save: "మార్పులను సేవ్ చేయి / Save Changes",
    motivation: "చిన్న అడుగులు పెద్ద పొదుపును సృష్టిస్తాయి!",
    youAre: "మీరు",
    towardGoal: "మీ పొదుపు లక్ష్యం వైపు!",
    keepGoing: "ముందుకు సాగండి! మీరు బాగా చేస్తున్నారు.",
    almostThere: "దాదాపు వచ్చేశారు! దృష్టి కేంద్రీకరించండి."
  }
};

export function GoalTrackerScreen({
  language,
  userData,
  onUpdateGoal,
  onBack
}: GoalTrackerScreenProps) {
  const t = translations[language];
  const [isEditing, setIsEditing] = useState(false);
  const [newGoalAmount, setNewGoalAmount] = useState(userData.savingsGoal);

  const savingsGoal = parseInt(userData.savingsGoal || '50000');
  const income = parseInt(userData.monthlyExpenses) + savingsGoal;
  const expenses = parseInt(userData.monthlyExpenses);
  const currentSavings = income - expenses;
  const progress = Math.min((currentSavings / savingsGoal) * 100, 100);

  const handleSave = () => {
    onUpdateGoal(newGoalAmount);
    setIsEditing(false);
  };

  const getMotivationMessage = () => {
    if (progress >= 90) return t.almostThere;
    if (progress >= 50) return t.keepGoing;
    return t.motivation;
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
          <h1>{t.title}</h1>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-8">
        {/* Circular Progress */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 border-2 border-[#87CEEB]/30 bg-gradient-to-br from-white to-[#E6F7FF]/30">
            <div className="flex flex-col items-center">
              {/* Circular Progress Indicator */}
              <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#E5E7EB"
                    strokeWidth="16"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#gradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - progress / 100) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0D47A1" />
                      <stop offset="50%" stopColor="#87CEEB" />
                      <stop offset="100%" stopColor="#81C784" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-[#0D47A1]"
                  >
                    {Math.round(progress)}%
                  </motion.p>
                  <p className="text-sm text-gray-600 text-center px-4">
                    {t.towardGoal}
                  </p>
                </div>
              </div>

              {/* Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center"
              >
                <p className="text-[#0D47A1] mb-2">
                  {t.youAre} {Math.round(progress)}% {t.towardGoal}
                </p>
                <p className="text-sm text-gray-600">{getMotivationMessage()}</p>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="p-4 border-2 border-[#81C784]/30 bg-gradient-to-br from-[#81C784]/5 to-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#81C784] rounded-full p-2">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-gray-600">{t.currentSavings}</p>
            </div>
            <p className="text-[#0D47A1] ml-11">₹{currentSavings.toLocaleString()}</p>
          </Card>

          <Card className="p-4 border-2 border-[#0D47A1]/30 bg-gradient-to-br from-[#0D47A1]/5 to-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#0D47A1] rounded-full p-2">
                <Target className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-gray-600">{t.savingsGoal}</p>
            </div>
            <p className="text-[#0D47A1] ml-11">₹{savingsGoal.toLocaleString()}</p>
          </Card>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[#0D47A1]">{t.progress}</p>
              <p className="text-[#0D47A1]">{Math.round(progress)}%</p>
            </div>
            <Progress value={progress} className="h-3 bg-gray-200" />
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-600">₹0</p>
              <p className="text-sm text-gray-600">₹{savingsGoal.toLocaleString()}</p>
            </div>
          </Card>
        </motion.div>

        {/* Update Goal Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#0D47A1]">{t.updateGoal}</p>
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="text-[#0D47A1]"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-[#0D47A1]">{t.newGoal}</Label>
                  <Input
                    type="number"
                    value={newGoalAmount}
                    onChange={(e) => setNewGoalAmount(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-[#0D47A1] hover:bg-[#0D47A1]/90"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t.save}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setNewGoalAmount(userData.savingsGoal);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 bg-[#E6F7FF]/30 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Current Goal</p>
                <p className="text-[#0D47A1]">₹{savingsGoal.toLocaleString()}</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Motivation Quote */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-4 bg-gradient-to-r from-[#81C784]/10 to-[#87CEEB]/10 border-2 border-[#81C784]/30">
            <div className="flex items-center gap-3">
              <div className="bg-[#81C784] rounded-full p-2">
                <Target className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-gray-700 flex-1">{t.motivation}</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
