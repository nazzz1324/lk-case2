import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mockDisciplines, mockIndicators, mockGrades } from "@/lib/mockData";

// Функция для преобразования оценки 0-100 в 1-5
const convertGradeToFivePoint = (grade: number): number => {
  if (grade >= 90) return 5;
  if (grade >= 75) return 4;
  if (grade >= 60) return 3;
  if (grade >= 40) return 2;
  return 1;
};

// Функция для расчета средней оценки по дисциплине
const calculateAverageGrade = (disciplineId: number): number => {
  const studentGrades = mockGrades.find(g => g.disciplineId === disciplineId);
  if (!studentGrades) return 0;

  const indicatorGrades = Object.values(studentGrades.grades);
  if (indicatorGrades.length === 0) return 0;

  const fivePointGrades = indicatorGrades.map(convertGradeToFivePoint);
  const sum = fivePointGrades.reduce((acc, grade) => acc + grade, 0);
  
  return parseFloat((sum / fivePointGrades.length).toFixed(1));
};

export default function StudentDisciplines() {
	  const [expandedDiscipline, setExpandedDiscipline] = useState<number | null>(null);
  const studentId = 1; // Предполагаем, что это ID текущего студента

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
	                <p className="text-sm text-muted-foreground">Преподаватель: {discipline.teacher || "Не назначен"}</p>
              </div>
              <div className="flex items-center gap-4">
	              <div className="text-right">
	                <p className="text-sm text-muted-foreground">Средняя оценка</p>
	                  <p className="text-2xl font-bold text-primary">{calculateAverageGrade(discipline.id)}</p>
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
	                    const studentGrades = mockGrades.find(g => g.disciplineId === discipline.id);
	                    const rawGrade = studentGrades?.grades[indicatorId] || 0;
	                    const fivePointGrade = convertGradeToFivePoint(rawGrade);
	
	                    return (
	                      <div key={indicatorId} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
	                        <div>
	                          <p className="font-medium text-foreground">{indicator?.code} - {indicator?.name}</p>
	                        </div>
	                        <div className="text-right">
	                          <p className="text-sm text-muted-foreground">Оценка (1-5)</p>
	                          <p className="text-2xl font-bold text-primary">{fivePointGrade}</p>
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
