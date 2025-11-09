import { motion } from 'motion/react';
import { ArrowLeft, Languages, Palette, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import type { Language } from '../App';

interface SettingsScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Settings",
    subtitle: "Customize your experience",
    language: "Language",
    english: "English",
    telugu: "Telugu (తెలుగు)",
    theme: "Theme",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    skyBlueMode: "Sky Blue Mode (Default)",
    about: "About FinSmart",
    aboutText: "FinSmart is a personalized financial guidance and budgeting tool designed for young adults and beginners. Learn, track, and achieve your financial goals.",
    version: "Version 1.0.0"
  },
  te: {
    title: "సెట్టింగ్‌లు / Settings",
    subtitle: "మీ అనుభవాన్ని అనుకూలీకరించండి",
    language: "భాష / Language",
    english: "ఇంగ్లీష్ / English",
    telugu: "తెలుగు / Telugu",
    theme: "థీమ్ / Theme",
    lightMode: "లైట్ మోడ్ / Light Mode",
    darkMode: "డార్క్ మోడ్ / Dark Mode",
    skyBlueMode: "స్కై బ్లూ మోడ్ (డిఫాల్ట్) / Sky Blue Mode (Default)",
    about: "FinSmart గురించి / About FinSmart",
    aboutText: "FinSmart అనేది యువ పెద్దలు మరియు ప్రారంభకుల కోసం రూపొందించబడిన వ్యక్తిగతీకరించిన ఆర్థిక మార్గదర్శకత్వం మరియు బడ్జెటింగ్ సాధనం. మీ ఆర్థిక లక్ష్యాలను నేర్చుకోండి, ట్రాక్ చేయండి మరియు సాధించండి.",
    version: "వెర్షన్ 1.0.0 / Version 1.0.0"
  }
};

export function SettingsScreen({ language, onLanguageChange, onBack }: SettingsScreenProps) {
  const t = translations[language];

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
        {/* Language Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#87CEEB] rounded-full p-2">
                <Languages className="w-5 h-5 text-white" />
              </div>
              <p className="text-[#0D47A1]">{t.language}</p>
            </div>

            <div className="space-y-3">
              <div
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  language === 'en'
                    ? 'border-[#0D47A1] bg-[#0D47A1]/5'
                    : 'border-gray-200 hover:border-[#87CEEB]'
                }`}
                onClick={() => onLanguageChange('en')}
              >
                <div className="flex items-center justify-between">
                  <Label className="cursor-pointer">{t.english}</Label>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      language === 'en' ? 'border-[#0D47A1]' : 'border-gray-300'
                    }`}
                  >
                    {language === 'en' && (
                      <div className="w-3 h-3 rounded-full bg-[#0D47A1]" />
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  language === 'te'
                    ? 'border-[#0D47A1] bg-[#0D47A1]/5'
                    : 'border-gray-200 hover:border-[#87CEEB]'
                }`}
                onClick={() => onLanguageChange('te')}
              >
                <div className="flex items-center justify-between">
                  <Label className="cursor-pointer">{t.telugu}</Label>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      language === 'te' ? 'border-[#0D47A1]' : 'border-gray-300'
                    }`}
                  >
                    {language === 'te' && (
                      <div className="w-3 h-3 rounded-full bg-[#0D47A1]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#81C784] rounded-full p-2">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <p className="text-[#0D47A1]">{t.theme}</p>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg border-2 border-[#0D47A1] bg-[#0D47A1]/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A7E0F3] to-[#E6F7FF] border-2 border-[#87CEEB]" />
                    <Label>{t.skyBlueMode}</Label>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-[#0D47A1] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#0D47A1]" />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border-2 border-gray-200 opacity-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                      <Sun className="w-4 h-4 text-gray-400" />
                    </div>
                    <Label className="text-gray-400">{t.lightMode}</Label>
                  </div>
                  <p className="text-xs text-gray-400">Coming Soon</p>
                </div>
              </div>

              <div className="p-3 rounded-lg border-2 border-gray-200 opacity-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                      <Moon className="w-4 h-4 text-gray-300" />
                    </div>
                    <Label className="text-gray-400">{t.darkMode}</Label>
                  </div>
                  <p className="text-xs text-gray-400">Coming Soon</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 border-2 border-[#87CEEB]/30">
            <p className="text-[#0D47A1] mb-3">{t.about}</p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {t.aboutText}
            </p>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">{t.version}</p>
            </div>
          </Card>
        </motion.div>

        {/* App Logo */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center pt-6"
        >
          <div className="bg-gradient-to-br from-[#A7E0F3] to-[#E6F7FF] rounded-2xl p-4 mb-3">
            <div className="bg-white rounded-xl p-3">
              <p className="text-[#0D47A1]" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                FinSmart
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Smart Finance, Simple Life
          </p>
        </motion.div>
      </div>
    </div>
  );
}
