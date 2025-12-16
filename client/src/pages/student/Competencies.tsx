import { mockCompetencies, mockStudentCompetencies } from "@/lib/mockData";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function StudentCompetencies() {
  const competencyData = mockStudentCompetencies.map((sc) => {
    const comp = mockCompetencies.find((c) => c.id === sc.competencyId);
    return {
      id: sc.competencyId,
      code: comp?.code || "",
      name: comp?.name || "",
      progress: sc.progress,
      level: sc.level,
    };
  });

  const radarData = competencyData.map((c) => ({
    name: c.code,
    progress: c.progress,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Освоение компетенций</h2>
        <p className="text-muted-foreground">Визуализация прогресса по всем компетенциям</p>
      </div>

      {/* Radar Chart */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Радиальная диаграмма прогресса</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#E0E0E0" />
            <PolarAngleAxis dataKey="name" stroke="#666666" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#666666" />
            <Radar
              name="Прогресс %"
              dataKey="progress"
              stroke="#377DFF"
              fill="#377DFF"
              fillOpacity={0.6}
            />
            <Legend />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#FFFFFF", 
                border: "1px solid #E0E0E0",
                borderRadius: "8px"
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Competencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competencyData.map((competency) => (
          <div key={competency.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="mb-4">
              <p className="text-sm text-primary font-semibold">{competency.code}</p>
              <h3 className="text-lg font-semibold text-foreground">{competency.name}</h3>
            </div>

            {/* Level Indicator */}
            <div className="mb-4 p-3 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Уровень освоения</p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-3 w-3 rounded-full ${
                        level <= competency.level ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{competency.level}/4</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Прогресс</p>
                <p className="text-lg font-bold text-primary">{competency.progress}%</p>
              </div>
              <div className="w-full bg-border rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-sidebar-primary h-3 rounded-full transition-all"
                  style={{ width: `${competency.progress}%` }}
                />
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-4">
              {competency.progress >= 80 ? (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  ✓ Хорошо освоено
                </span>
              ) : competency.progress >= 50 ? (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  ◐ В процессе
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  ◐ В процессе
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-primary/10 to-sidebar-primary/10 rounded-2xl p-6 border border-primary/20">
        <h3 className="text-lg font-semibold text-foreground mb-4">Итоговая статистика</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Средний прогресс</p>
            <p className="text-2xl font-bold text-primary">
              {Math.round(competencyData.reduce((sum, c) => sum + c.progress, 0) / competencyData.length)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Компетенций</p>
            <p className="text-2xl font-bold text-primary">{competencyData.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Средний уровень</p>
            <p className="text-2xl font-bold text-primary">
              {(competencyData.reduce((sum, c) => sum + c.level, 0) / competencyData.length).toFixed(1)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Полностью освоено</p>
            <p className="text-2xl font-bold text-primary">
              {competencyData.filter((c) => c.progress === 100).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
