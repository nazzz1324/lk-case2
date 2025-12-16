import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mockDisciplines, mockIndicators } from "@/lib/mockData";

export default function StudentDisciplines() {
  const [expandedDiscipline, setExpandedDiscipline] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Мои дисциплины и оценки</h2>
        <p className="text-muted-foreground">Просмотр оценок по индикаторам для каждой дисциплины</p>
      </div>

      {/* Disciplines List */}
      <div className="space-y-4">
        {mockDisciplines.map((discipline) => (
          <div key={discipline.id} className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            {/* Header */}
            <button
              onClick={() =>
                setExpandedDiscipline(expandedDiscipline === discipline.id ? null : discipline.id)
              }
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition-colors"
            >
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">{discipline.name}</h3>
                <p className="text-sm text-muted-foreground">Семестр {discipline.semester}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Средняя оценка</p>
                  <p className="text-2xl font-bold text-primary">82</p>
                </div>
                {expandedDiscipline === discipline.id ? (
                  <ChevronUp className="text-primary" />
                ) : (
                  <ChevronDown className="text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {expandedDiscipline === discipline.id && (
              <div className="border-t border-border px-6 py-4 bg-secondary/30">
                <div className="space-y-3">
                  {discipline.indicators.map((indicatorId) => {
                    const indicator = mockIndicators.find((i) => i.id === indicatorId);
                    const grade = Math.floor(Math.random() * 40) + 60;

                    return (
                      <div key={indicatorId} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                        <div>
                          <p className="font-medium text-foreground">{indicator?.code} - {indicator?.name}</p>
                          <p className="text-xs text-muted-foreground">Уровень: {indicator?.level}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Оценка</p>
                          <p className="text-2xl font-bold text-primary">{grade}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">Общий прогресс по дисциплине</p>
                    <p className="text-sm font-semibold text-primary">75%</p>
                  </div>
                  <div className="w-full bg-border rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-sidebar-primary h-3 rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
