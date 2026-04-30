"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  ClipboardCheck,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { pdplQuestions } from "./content";
import { updatePDPLProgress } from "./actions";
import { EntityType } from "@prisma/client";

interface Props {
  initialAnswers: Record<string, boolean>;
  organizationId: string;
  initialScore: number;
  entityType: EntityType;
}

import PDPLResultView from "./PDPLResultView";
import PDPLDocumentGenerator from "./PDPLDocumentGenerator";

export default function PDPLDashboard({ 
  initialAnswers, 
  organizationId, 
  initialScore,
  entityType 
}: Props) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [view, setView] = useState<"assessment" | "result" | "docs">(
    Object.keys(initialAnswers).length > 0 ? "result" : "assessment"
  );
  const [score, setScore] = useState(initialScore);
  const [isPending, startTransition] = useTransition();

  const questions = pdplQuestions;
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = async (answer: boolean | "unknown") => {
    const isYes = answer === true;
    const newAnswers = { ...answers, [currentQuestion.id]: isYes };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setView("result");
      startTransition(async () => {
        const result = await updatePDPLProgress(organizationId, entityType, newAnswers);
        if (result.success) {
          setScore(result.score);
        }
      });
    }
  };

  const encouragingMessages = [
    "بداية ممتازة، بضع أسئلة تفصلنا عن النتيجة!",
    "إجاباتك تساعدنا نحدد الفجوات بدقة.",
    "باقي خطوات بسيطة وننتهي.",
    "أنت الآن في منتصف الطريق، استمر!",
    "قربنا نخلص، إجاباتك قيمة جداً.",
    "تقريباً انتهينا، مجهود رائع!",
  ];

  const getEncouragingMessage = () => {
    const index = Math.floor((currentStep / questions.length) * encouragingMessages.length);
    return encouragingMessages[index];
  };

  if (view === "result") {
    return (
      <PDPLResultView 
        score={score} 
        answers={answers} 
        entityType={entityType} 
        onNavigateDocs={() => setView("docs")}
      />
    );
  }

  if (view === "docs") {
    return (
      <PDPLDocumentGenerator 
        answers={answers} 
        entityType={entityType} 
        onBack={() => setView("result")}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      {/* Progress Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-sm font-bold text-primary">السؤال {currentStep + 1} من {questions.length}</span>
          <span className="text-sm font-bold text-gray-400">جاهزية الامتثال (PDPL)</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 md:p-12 text-right"
      >
        <div className="inline-block px-4 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full mb-6">
          {currentQuestion.category}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-8">
          {currentQuestion.labels[entityType]}
        </h2>

        <div className="space-y-4 mb-10">
          <button
            onClick={() => handleAnswer(true)}
            className="w-full p-6 bg-gray-50 hover:bg-primary hover:text-white border border-gray-100 hover:border-primary rounded-2xl font-bold text-lg transition-all flex items-center justify-between group"
          >
            <div className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-white/30 flex items-center justify-center">
              <div className="w-3 h-3 bg-transparent group-hover:bg-white rounded-full" />
            </div>
            <span>نعم</span>
          </button>
          
          <button
            onClick={() => handleAnswer(false)}
            className="w-full p-6 bg-gray-50 hover:bg-gray-900 hover:text-white border border-gray-100 hover:border-gray-900 rounded-2xl font-bold text-lg transition-all flex items-center justify-between group"
          >
            <div className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-white/30 flex items-center justify-center">
              <div className="w-3 h-3 bg-transparent group-hover:bg-white rounded-full" />
            </div>
            <span>لا</span>
          </button>

          <button
            onClick={() => handleAnswer("unknown")}
            className="w-full p-6 bg-gray-50 hover:bg-gray-200 border border-gray-100 rounded-2xl font-bold text-lg transition-all flex items-center justify-between group"
          >
            <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center">
              <div className="w-3 h-3 bg-transparent group-hover:bg-gray-400 rounded-full" />
            </div>
            <span>لا أعرف</span>
          </button>
        </div>

        <div className="pt-8 border-t border-gray-100 flex items-center justify-between flex-row-reverse">
          <p className="text-sm font-medium text-gray-400 italic">
            "{getEncouragingMessage()}"
          </p>
          
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1"
            >
              <ChevronRight size={18} />
              السابق
            </button>
          )}
        </div>
      </motion.div>

      <p className="text-center mt-12 text-xs text-gray-400 leading-relaxed">
        * إجاباتك تساعدنا في تحديد الفجوات القانونية وتجهيز النماذج المناسبة لنشاطك.<br />
        التقييم لا يعتبر استشارة قانونية مهنية.
      </p>
    </div>
  );
}
