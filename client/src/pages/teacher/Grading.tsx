import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockDisciplines, mockIndicators, mockUsers } from "@/lib/mockData";

interface GradeData {
  [studentId: number]: {
    [indicatorId: number]: {
      grade: number;
    };
  };
}

export default function Grading() {
  const [selectedDiscipline, setSelectedDiscipline] = useState(mockDisciplines[0]?.id || 1);
  const [selectedGroup, setSelectedGroup] = useState("ПИ-21-1");
  const [grades, setGrades] = useState<GradeData>({});


  const currentDiscipline = mockDisciplines.find((d) => d.id === selectedDiscipline);
  const disciplineIndicators = currentDiscipline?.indicators || [];
  const students = mockUsers.filter((u) => u.role === "student" && u.group === selectedGroup);

  const handleGradeChange = (studentId: number, indicatorId: number, value: number) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [indicatorId]: {
          ...(prev[studentId]?.[indicatorId] || {}),
          grade: value,
        },
      },
    }));
  };


  const getGrade = (studentId: number, indicatorId: number) => {
    return grades[studentId]?.[indicatorId]?.grade || 0;
  };


  const calculateFinalGrade = (studentId: number): number => {
    const totalIndicators = disciplineIndicators.length;
    if (totalIndicators === 0) {
      return 0;
    }

    const totalSum = disciplineIndicators.reduce((sum, indicatorId) => {
      return sum + getGrade(studentId, indicatorId);
    }, 0);

    const average = totalSum / totalIndicators;
    return Math.round(average * 10) / 10; // Округляем до одного знака после запятой
  };

  return (
    <div className="space-y-6">
      {/* Selection Panel */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Выбор дисциплины и группы</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Дисциплина</label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {mockDisciplines.map((discipline) => (
                <option key={discipline.id} value={discipline.id}>
                  {discipline.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Группа</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="ПИ-21-1">ПИ-21-1</option>
              <option value="ПИ-21-2">ПИ-21-2</option>
              <option value="ПИ-21-3">ПИ-21-3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grading Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground sticky left-0 bg-secondary z-10">
                  Студент
                </th>
                {disciplineIndicators.map((indicatorId) => {
                  const indicator = mockIndicators.find((i) => i.id === indicatorId);
                  return (
                    <th
                      key={indicatorId}
                      className="px-4 py-4 text-center text-sm font-semibold text-foreground whitespace-nowrap"
                    >
                      <div className="text-xs text-primary font-medium">{indicator?.code}</div>
                      <div className="text-xs text-muted-foreground">{indicator?.name.substring(0, 20)}...</div>
                    </th>
                  );
                })}
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground bg-secondary z-10">
                  Итоговая оценка
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground sticky left-0 bg-card hover:bg-secondary z-10">
                    {student.name}
                  </td>
                  {disciplineIndicators.map((indicatorId) => (
                    <td
                      key={indicatorId}
                      className="px-4 py-4 text-center border-l border-border"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={getGrade(student.id, indicatorId)}
                          onChange={(e) =>
                            handleGradeChange(student.id, indicatorId, parseInt(e.target.value) || 0)
                          }
                          className="w-12 px-2 py-1 text-center border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          placeholder="0"
                        />
                      </div>
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center text-sm font-bold text-primary border-l border-border">
                    {calculateFinalGrade(student.id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Save size={18} className="mr-2" />
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
}
