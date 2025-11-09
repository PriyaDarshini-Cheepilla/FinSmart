import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, PlayCircle, CheckCircle2, XCircle, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { Language } from '../App';

interface EducationScreenProps {
  language: Language;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Learn Finance",
    subtitle: "Build your financial knowledge",
    lessons: "Lessons",
    takeQuiz: "Take Quiz",
    backToLessons: "Back to Lessons",
    nextQuestion: "Next Question",
    showResults: "Show Results",
    retakeQuiz: "Retake Quiz",
    yourScore: "Your Score",
    correct: "Correct!",
    incorrect: "Incorrect",
    question: "Question"
  },
  te: {
    title: "ఆర్థిక విద్య / Learn Finance",
    subtitle: "మీ ఆర్థిక జ్ఞానాన్ని పెంచుకోండి",
    lessons: "పాఠాలు / Lessons",
    takeQuiz: "క్విజ్ తీసుకోండి / Take Quiz",
    backToLessons: "పాఠాలకు తిరిగి / Back to Lessons",
    nextQuestion: "తదుపరి ప్రశ్న / Next Question",
    showResults: "ఫలితాలు చూపు / Show Results",
    retakeQuiz: "క్విజ్ మళ్లీ తీసుకోండి / Retake Quiz",
    yourScore: "మీ స్కోర్ / Your Score",
    correct: "సరైనది! / Correct!",
    incorrect: "తప్పు / Incorrect",
    question: "ప్రశ్న / Question"
  }
};

interface Lesson {
  id: string;
  title: string;
  titleTe: string;
  content: string;
  contentTe: string;
  icon: string;
  quiz: Quiz;
}

interface Quiz {
  questions: QuizQuestion[];
}

interface QuizQuestion {
  question: string;
  questionTe: string;
  options: string[];
  optionsTe: string[];
  correctAnswer: number;
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'How to Budget',
    titleTe: 'బడ్జెట్ ఎలా చేయాలి',
    content: `A budget is a plan for your money. The 50/30/20 rule is simple:

• 50% for Needs (rent, food, bills)
• 30% for Wants (entertainment, shopping)
• 20% for Savings (emergency fund, goals)

Track your spending weekly to stay on track. Use apps or simple spreadsheets to monitor where your money goes.`,
    contentTe: `బడ్జెట్ అంటే మీ డబ్బు కోసం ప్లాన్. 50/30/20 నియమం సులభం:

• 50% అవసరాల కోసం (అద్దె, ఆహారం, బిల్లులు)
• 30% కోరికల కోసం (వినోదం, షాపింగ్)
• 20% పొదుపు కోసం (అత్యవసర నిధి, లక్ష్యాలు)

మీ ట్రాక్‌లో ఉండటానికి వారానికోసారి మీ ఖర్చును ట్రాక్ చేయండి. మీ డబ్బు ఎక్కడికి వెళుతుందో పర్యవేక్షించడానికి యాప్‌లు లేదా సాధారణ స్ప్రెడ్‌షీట్‌లను ఉపయోగించండి.`,
    icon: '📊',
    quiz: {
      questions: [
        {
          question: 'What percentage of income should go to savings according to the 50/30/20 rule?',
          questionTe: '50/30/20 నియమం ప్రకారం ఆదాయంలో ఎన్ని శాతం పొదుపుకు వెళ్లాలి?',
          options: ['10%', '20%', '30%', '50%'],
          optionsTe: ['10%', '20%', '30%', '50%'],
          correctAnswer: 1
        },
        {
          question: 'Which category takes the largest portion in the 50/30/20 rule?',
          questionTe: '50/30/20 నియమంలో అతిపెద్ద భాగాన్ని ఏ వర్గం తీసుకుంటుంది?',
          options: ['Wants', 'Needs', 'Savings', 'Investments'],
          optionsTe: ['కోరికలు', 'అవసరాలు', 'పొదుపు', 'పెట్టుబడులు'],
          correctAnswer: 1
        },
        {
          question: 'How often should you track your spending?',
          questionTe: 'మీ ఖర్చును ఎంత తరచుగా ట్రాక్ చేయాలి?',
          options: ['Monthly', 'Weekly', 'Yearly', 'Never'],
          optionsTe: ['నెలవారీ', 'వారానికోసారి', 'సంవత్సరానికోసారి', 'ఎప్పుడూ కాదు'],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: '2',
    title: 'How to Save Money',
    titleTe: 'డబ్బు ఎలా ఆదా చేయాలి',
    content: `Saving money is easier when you automate it:

1. Pay yourself first - Transfer savings when you get paid
2. Set clear goals - Know what you're saving for
3. Cut unnecessary expenses - Review subscriptions monthly
4. Use the 24-hour rule - Wait before big purchases

Even small amounts add up. Start with ₹500/month and increase gradually.`,
    contentTe: `మీరు దానిని ఆటోమేట్ చేసినప్పుడు డబ్బు ఆదా చేయడం సులభం:

1. మొదట మీకు చెల్లించండి - మీకు జీతం వచ్చినప్పుడు పొదుపును బదిలీ చేయండి
2. స్పష్టమైన లక్ష్యాలను సెట్ చేయండి - మీరు దేని కోసం పొదుపు చేస్తున్నారో తెలుసుకోండి
3. అనవసర ఖర్చులను తగ్గించండి - సబ్‌స్క్రిప్షన్‌లను నెలవారీగా సమీక్షించండి
4. 24-గంటల నియమాన్ని ఉపయోగించండి - పెద్ద కొనుగోళ్ల ముందు వేచి ఉండండి

చిన్న మొత్తాలు కూడా పెరుగుతాయి. నెలకు ₹500తో ప్రారంభించి క్రమంగా పెంచండి.`,
    icon: '💰',
    quiz: {
      questions: [
        {
          question: 'What does "pay yourself first" mean?',
          questionTe: '"మొదట మీకు చెల్లించండి" అంటే ఏమిటి?',
          options: ['Buy yourself gifts', 'Save money before spending', 'Get a raise', 'Pay bills first'],
          optionsTe: ['మీకు బహుమతులు కొనుగోలు చేయండి', 'ఖర్చు చేసే ముందు డబ్బు ఆదా చేయండి', 'జీతం పెంపు పొందండి', 'మొదట బిల్లులు చెల్లించండి'],
          correctAnswer: 1
        },
        {
          question: 'What is the 24-hour rule?',
          questionTe: '24-గంటల నియమం ఏమిటి?',
          options: ['Sleep for 24 hours', 'Wait before making big purchases', 'Work 24 hours', 'Save for 24 days'],
          optionsTe: ['24 గంటలు నిద్రించండి', 'పెద్ద కొనుగోళ్లు చేసే ముందు వేచి ఉండండి', '24 గంటలు పని చేయండి', '24 రోజులు పొదుపు చేయండి'],
          correctAnswer: 1
        },
        {
          question: 'What is a good starting amount for monthly savings?',
          questionTe: 'నెలవారీ పొదుపు కోసం మంచి ప్రారంభ మొత్తం ఎంత?',
          options: ['₹10,000', '₹500', '₹50,000', '₹100'],
          optionsTe: ['₹10,000', '₹500', '₹50,000', '₹100'],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: '3',
    title: 'Understanding Credit',
    titleTe: 'క్రెడిట్ అర్థం చేసుకోవడం',
    content: `Credit cards and loans can be useful tools when used wisely:

• Always pay on time to build good credit score
• Don't spend more than you can repay
• Keep credit utilization below 30%
• Read all terms and conditions

A good credit score (750+) helps you get better loan rates and financial opportunities.`,
    contentTe: `క్రెడిట్ కార్డ్‌లు మరియు రుణాలు తెలివిగా ఉపయోగించినప్పుడు ఉపయోగకరమైన సాధనాలు:

• మంచి క్రెడిట్ స్కోర్‌ను నిర్మించడానికి ఎల్లప్పుడూ సమయానికి చెల్లించండి
• మీరు తిరిగి చెల్లించగలిగే దానికంటే ఎక్కువ ఖర్చు చేయవద్దు
• క్రెడిట్ వినియోగాన్ని 30% కంటే తక్కువగా ఉంచండి
• అన్ని నిబంధనలు మరియు షరతులను చదవండి

మంచి క్రెడిట్ స్కోర్ (750+) మీకు మెరుగైన రుణ రేట్లు మరియు ఆర్థిక అవకాశాలను పొందడంలో సహాయపడుతుంది.`,
    icon: '💳',
    quiz: {
      questions: [
        {
          question: 'What is a good credit score?',
          questionTe: 'మంచి క్రెడిట్ స్కోర్ ఏమిటి?',
          options: ['300', '500', '750+', '1000'],
          optionsTe: ['300', '500', '750+', '1000'],
          correctAnswer: 2
        },
        {
          question: 'What percentage of credit should you use?',
          questionTe: 'మీరు ఎంత శాతం క్రెడిట్‌ను ఉపయోగించాలి?',
          options: ['90%', 'Below 30%', '100%', '50%'],
          optionsTe: ['90%', '30% కంటే తక్కువ', '100%', '50%'],
          correctAnswer: 1
        },
        {
          question: 'Why is paying on time important?',
          questionTe: 'సమయానికి చెల్లించడం ఎందుకు ముఖ్యం?',
          options: ['To avoid fees', 'To build credit score', 'Both', 'Neither'],
          optionsTe: ['రుసుములను నివారించడానికి', 'క్రెడిట్ స్కోర్‌ను నిర్మించడానికి', 'రెండూ', 'ఏదీ కాదు'],
          correctAnswer: 2
        }
      ]
    }
  }
];

export function EducationScreen({ language, onBack }: EducationScreenProps) {
  const t = translations[language];
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (selectedLesson?.quiz.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!selectedLesson) return 0;
    const correct = selectedAnswers.filter(
      (answer, index) => answer === selectedLesson.quiz.questions[index].correctAnswer
    ).length;
    return Math.round((correct / selectedLesson.quiz.questions.length) * 100);
  };

  if (showQuiz && selectedLesson) {
    const quiz = selectedLesson.quiz;
    const currentQ = quiz.questions[currentQuestion];

    if (showResults) {
      const score = calculateScore();
      const correctCount = selectedAnswers.filter(
        (answer, index) => answer === quiz.questions[index].correctAnswer
      ).length;

      return (
        <div className="h-full w-full bg-gradient-to-b from-[#E6F7FF] to-white flex flex-col">
          <div className="bg-[#0D47A1] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowQuiz(false);
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers([]);
                }}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1>Quiz Results</h1>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center mb-6"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={score >= 70 ? '#81C784' : '#FFB74D'}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - score / 100) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[#0D47A1]">{score}%</p>
                </div>
              </div>

              <p className="text-[#0D47A1] mb-2">{t.yourScore}</p>
              <p className="text-gray-600">
                {correctCount} out of {quiz.questions.length} correct
              </p>
            </motion.div>

            <div className="space-y-3 mb-6">
              {quiz.questions.map((q, index) => {
                const isCorrect = selectedAnswers[index] === q.correctAnswer;
                return (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`p-4 border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm mb-1">
                            {language === 'en' ? q.question : q.questionTe}
                          </p>
                          <p className="text-xs text-gray-600">
                            {isCorrect ? t.correct : t.incorrect}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleRetakeQuiz}
                className="w-full bg-[#0D47A1] hover:bg-[#0D47A1]/90"
              >
                {t.retakeQuiz}
              </Button>
              <Button
                onClick={() => {
                  setShowQuiz(false);
                  setShowResults(false);
                  setSelectedLesson(null);
                  setCurrentQuestion(0);
                  setSelectedAnswers([]);
                }}
                variant="outline"
                className="w-full"
              >
                {t.backToLessons}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full w-full bg-gradient-to-b from-[#E6F7FF] to-white flex flex-col">
        <div className="bg-[#0D47A1] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowQuiz(false);
                setCurrentQuestion(0);
                setSelectedAnswers([]);
              }}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1>{language === 'en' ? selectedLesson.title : selectedLesson.titleTe}</h1>
          </div>
          <Progress 
            value={((currentQuestion + 1) / quiz.questions.length) * 100} 
            className="h-2 bg-white/20" 
          />
          <p className="text-sm mt-2 opacity-80">
            {t.question} {currentQuestion + 1} of {quiz.questions.length}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 border-2 border-[#87CEEB]/30 mb-6">
                <p className="text-[#0D47A1] mb-4">
                  {language === 'en' ? currentQ.question : currentQ.questionTe}
                </p>

                <div className="space-y-3">
                  {(language === 'en' ? currentQ.options : currentQ.optionsTe).map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      variant={selectedAnswers[currentQuestion] === index ? 'default' : 'outline'}
                      className={`w-full justify-start h-auto py-3 px-4 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'bg-[#0D47A1] text-white'
                          : 'border-[#87CEEB] hover:border-[#0D47A1]'
                      }`}
                    >
                      <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-left">{option}</span>
                    </Button>
                  ))}
                </div>
              </Card>

              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="w-full bg-[#0D47A1] hover:bg-[#0D47A1]/90"
              >
                {currentQuestion < quiz.questions.length - 1 ? t.nextQuestion : t.showResults}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (selectedLesson && !showQuiz) {
    return (
      <div className="h-full w-full bg-gradient-to-b from-[#E6F7FF] to-white flex flex-col">
        <div className="bg-[#0D47A1] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedLesson(null)}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedLesson.icon}</span>
              <h1>{language === 'en' ? selectedLesson.title : selectedLesson.titleTe}</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <Card className="p-6 border-2 border-[#87CEEB]/30 mb-6">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {language === 'en' ? selectedLesson.content : selectedLesson.contentTe}
            </p>
          </Card>

          <Button
            onClick={() => setShowQuiz(true)}
            className="w-full bg-[#81C784] hover:bg-[#81C784]/90 h-12"
          >
            <PlayCircle className="mr-2 w-5 h-5" />
            {t.takeQuiz}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#E6F7FF] to-white overflow-y-auto">
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
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-[#81C784] text-white px-3 py-1">
            {t.lessons}
          </Badge>
          <p className="text-sm text-gray-600">{lessons.length} available</p>
        </div>

        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="p-4 border-2 border-[#87CEEB]/30 hover:border-[#87CEEB] transition-all cursor-pointer"
              onClick={() => setSelectedLesson(lesson)}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl flex-shrink-0">{lesson.icon}</div>
                <div className="flex-1">
                  <p className="text-[#0D47A1] mb-1">
                    {language === 'en' ? lesson.title : lesson.titleTe}
                  </p>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {lesson.quiz.questions.length} quiz questions
                    </p>
                  </div>
                </div>
                <PlayCircle className="w-6 h-6 text-[#81C784]" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
