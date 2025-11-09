import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Wallet, Car, ShoppingBag, Home, Trash2, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BilingualText } from './BilingualText';
import type { Language, Expense } from '../App';

interface ExpenseTrackerScreenProps {
  language: Language;
  expenses: Expense[];
  onAddExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
  onBack: () => void;
}

const labels = {
  title: { en: "Expense Tracker", te: "ఖర్చు ట్రాకర్" },
  addExpense: { en: "Add Expense", te: "ఖర్చు జోడించు" },
  category: { en: "Category", te: "వర్గం" },
  amount: { en: "Amount (₹)", te: "మొత్తం (₹)" },
  paymentMode: { en: "Payment Mode", te: "చెల్లింపు విధానం" },
  note: { en: "Note", te: "గమనిక" },
  date: { en: "Date", te: "తేదీ" },
  save: { en: "Save Expense", te: "ఖర్చు సేవ్ చేయి" },
  noExpenses: { en: "No expenses yet", te: "ఇంకా ఖర్చులు లేవు" },
  startTracking: { en: "Start tracking your spending", te: "మీ ఖర్చును ట్రాక్ చేయడం ప్రారంభించండి" },
  categories: {
    Food: { en: "Food", te: "ఆహారం" },
    Transport: { en: "Transport", te: "రవాణా" },
    Shopping: { en: "Shopping", te: "షాపింగ్" },
    Bills: { en: "Bills", te: "బిల్లులు" }
  }
};

export function ExpenseTrackerScreen({
  language,
  expenses,
  onAddExpense,
  onDeleteExpense,
  onBack
}: ExpenseTrackerScreenProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categoryIcons = {
    Food: Wallet,
    Transport: Car,
    Shopping: ShoppingBag,
    Bills: Home
  };

  const categoryColors = {
    Food: '#0D47A1',
    Transport: '#87CEEB',
    Shopping: '#81C784',
    Bills: '#FFB74D'
  };

  const handleSave = () => {
    if (category && amount && paymentMode) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        category,
        amount: parseFloat(amount),
        paymentMode,
        note,
        date
      };
      onAddExpense(newExpense);
      setIsDialogOpen(false);
      // Reset form
      setCategory('');
      setAmount('');
      setPaymentMode('');
      setNote('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#E6F7FF] to-white flex flex-col">
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
          <BilingualText 
            english={labels.title.en}
            telugu={labels.title.te}
            primaryClassName="text-2xl font-semibold"
            secondaryClassName="text-sm opacity-70"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {expenses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-64"
          >
            <Wallet className="w-16 h-16 text-gray-300 mb-4" />
            <BilingualText 
              english={labels.noExpenses.en}
              telugu={labels.noExpenses.te}
              primaryClassName="text-gray-500"
              secondaryClassName="text-sm text-gray-400 mt-1"
            />
            <BilingualText 
              english={labels.startTracking.en}
              telugu={labels.startTracking.te}
              className="mt-2"
              primaryClassName="text-sm text-gray-400"
              secondaryClassName="text-xs text-gray-400"
            />
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {expenses.map((expense, index) => {
                const Icon = categoryIcons[expense.category as keyof typeof categoryIcons] || Wallet;
                const color = categoryColors[expense.category as keyof typeof categoryColors] || '#0D47A1';

                return (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4 border-2 border-[#87CEEB]/30 hover:border-[#87CEEB] transition-colors">
                      <div className="flex items-center gap-4">
                        <div
                          className="rounded-full p-3 flex-shrink-0"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <BilingualText 
                            english={labels.categories[expense.category as keyof typeof labels.categories]?.en || expense.category}
                            telugu={labels.categories[expense.category as keyof typeof labels.categories]?.te || expense.category}
                            primaryClassName="text-[#0D47A1]"
                            secondaryClassName="text-xs text-[#0D47A1] opacity-70"
                          />
                          {expense.note && (
                            <p className="text-sm text-gray-600 truncate">{expense.note}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500">{expense.date}</p>
                            <span className="text-xs text-gray-400">•</span>
                            <p className="text-xs text-gray-500">{expense.paymentMode}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <p className="text-[#0D47A1] whitespace-nowrap">
                            ₹{expense.amount.toLocaleString()}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDeleteExpense(expense.id)}
                            className="text-red-500 hover:bg-red-50 h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* FAB */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <motion.div
            className="fixed bottom-24 right-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Button
              size="icon"
              className="w-14 h-14 rounded-full bg-[#0D47A1] hover:bg-[#0D47A1]/90 shadow-lg"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </motion.div>
        </DialogTrigger>

        <DialogContent className="w-[90%] max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              <BilingualText 
                english={labels.addExpense.en}
                telugu={labels.addExpense.te}
                primaryClassName="text-[#0D47A1]"
                secondaryClassName="text-xs text-[#0D47A1] opacity-70"
              />
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <BilingualText 
                english={labels.category.en}
                telugu={labels.category.te}
                primaryClassName="text-[#0D47A1]"
                secondaryClassName="text-xs text-[#0D47A1] opacity-70"
              />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">{labels.categories.Food.en} / {labels.categories.Food.te}</SelectItem>
                  <SelectItem value="Transport">{labels.categories.Transport.en} / {labels.categories.Transport.te}</SelectItem>
                  <SelectItem value="Shopping">{labels.categories.Shopping.en} / {labels.categories.Shopping.te}</SelectItem>
                  <SelectItem value="Bills">{labels.categories.Bills.en} / {labels.categories.Bills.te}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <BilingualText 
                english={labels.amount.en}
                telugu={labels.amount.te}
                primaryClassName="text-[#0D47A1]"
                secondaryClassName="text-xs text-[#0D47A1] opacity-70"
              />
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
                className="mt-1"
              />
            </div>

            <div>
              <BilingualText 
                english={labels.paymentMode.en}
                telugu={labels.paymentMode.te}
                primaryClassName="text-[#0D47A1]"
                secondaryClassName="text-xs text-[#0D47A1] opacity-70"
              />
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Net Banking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <BilingualText 
                english={labels.date.en}
                telugu={labels.date.te}
                primaryClassName="text-[#0D47A1]"
                secondaryClassName="text-xs text-[#0D47A1] opacity-70"
              />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <BilingualText 
                english={labels.note.en}
                telugu={labels.note.te}
                primaryClassName="text-[#0D47A1]"
                secondaryClassName="text-xs text-[#0D47A1] opacity-70"
              />
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional note"
                className="mt-1"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={!category || !amount || !paymentMode}
              className="w-full bg-[#0D47A1] hover:bg-[#0D47A1]/90"
            >
              <BilingualText 
                english={labels.save.en}
                telugu={labels.save.te}
                inline
                secondaryClassName="text-xs opacity-80 ml-1"
              />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
