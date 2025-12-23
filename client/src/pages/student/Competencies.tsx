import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mockCompetencies, mockIndicators, mockStudentCompetencies } from "@/lib/mockData";

// Функция для расчета среднего прогресса по компетенции
const calculateAverageProgress = (competencyId: number): number => {
  const studentCompetency = mockStudentCompetencies.find(sc => sc.competencyId === competencyId);
  if (!studentCompetency) return 0;
  
  return studentCompetency.progress;
};

export default function StudentCompetencies() {
  const [expandedCompetency, setExpandedCompetency] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Освоение компетенций</h2>
        <p className="text-muted-foreground">Просмотр прогресса по индикаторам для каждой компетенции</p>
      </div>

      {/* Competencies List */}
      <div className="space-y-4">
        {mockCompetencies.map((competency) => (
          <div key={competency.id} className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            {/* Header */}
            <button
              onClick={() =>
                setExpandedCompetency(expandedCompetency === competency.id ? null : competency.id)
              }
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition-colors"
            >
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">{competency.code} - {competency.name}</h3>
                <p className="text-sm text-muted-foreground">{competency.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Прогресс</p>
                  <p className="text-2xl font-bold text-primary">{calculateAverageProgress(competency.id)}%</p>
                </div>
                {expandedCompetency === competency.id ? (
                  <ChevronUp className="text-primary" />
                ) : (
                  <ChevronDown className="text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {expandedCompetency === competency.id && (
              <div className="border-t border-border px-6 py-4 bg-secondary/30">
                <div className="space-y-3">
                  {competency.indicators.map((indicatorId) => {
                    const indicator = mockIndicators.find((i) => i.id === indicatorId);
                    // Здесь мы используем моковые данные для демонстрации, 
                    // в реальном приложении нужно будет получать прогресс по индикатору
                    const progress = Math.floor(Math.random() * 100); 

                    return (
                      <div key={indicatorId} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                        <div>
	                          <p className="font-medium text-foreground">{indicator?.code} - {indicator?.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Прогресс</p>
                          <p className="text-2xl font-bold text-primary">{progress}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
