import { User, Mail, BookOpen } from "lucide-react";
import { mockStudentCompetencies, mockCompetencies } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const COLORS = ["#377DFF", "#A6C8FF", "#2D4DBF", "#5B9EFF"];

export default function StudentProfile() {
  const studentName = sessionStorage.getItem("userName") || "Иван Петров";
  const studentId = 1;
  const group = "ПИ-21-1";

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

  const averageProgress = Math.round(
    competencyData.reduce((sum, c) => sum + c.progress, 0) / competencyData.length
  );

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-sidebar-primary flex items-center justify-center text-white">
            <User size={48} />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">{studentName}</h1>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>ivan.petrov@university.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>Группа: {group}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              Активен
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <p className="text-sm text-muted-foreground mb-2">Средний прогресс</p>
          <p className="text-4xl font-bold text-primary mb-2">{averageProgress}%</p>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-sidebar-primary h-2 rounded-full"
              style={{ width: `${averageProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <p className="text-sm text-muted-foreground mb-2">Компетенций освоено</p>
          <p className="text-4xl font-bold text-primary">{competencyData.length}</p>
          <p className="text-xs text-muted-foreground mt-2">из {mockCompetencies.length}</p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <p className="text-sm text-muted-foreground mb-2">Средний уровень</p>
          <p className="text-4xl font-bold text-primary">
            {Math.round(competencyData.reduce((sum, c) => sum + c.level, 0) / competencyData.length)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">из 4</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Competency Distribution */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Распределение прогресса</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={competencyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ code, progress }) => `${code}: ${progress}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="progress"
              >
                {competencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#FFFFFF", 
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Competency Progress */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Прогресс по компетенциям</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={competencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="code" stroke="#666666" style={{ fontSize: "12px" }} />
              <YAxis stroke="#666666" style={{ fontSize: "12px" }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#FFFFFF", 
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="progress" fill="#377DFF" name="Прогресс %" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competencies List */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-6">Детали компетенций</h3>
        <div className="space-y-4">
          {competencyData.map((competency) => (
            <div key={competency.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{competency.code} - {competency.name}</p>
                  <p className="text-sm text-muted-foreground">Уровень: {competency.level} из 4</p>
                </div>
                <span className="text-lg font-bold text-primary">{competency.progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-sidebar-primary h-2 rounded-full transition-all"
                  style={{ width: `${competency.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
