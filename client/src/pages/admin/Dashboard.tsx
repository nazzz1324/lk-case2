import { Users, BookOpen, Target, Pin, Users2 } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import { dashboardMetrics } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const disciplineData = [
  { name: "Веб-разработка", competencies: 5 },
  { name: "Базы данных", competencies: 4 },
  { name: "Алгоритмы", competencies: 6 },
  { name: "ООП", competencies: 5 },
  { name: "Сети", competencies: 3 },
];

const activityData = [
  { name: "Пн", оценки: 12 },
  { name: "Вт", оценки: 19 },
  { name: "Ср", оценки: 15 },
  { name: "Чт", оценки: 25 },
  { name: "Пт", оценки: 22 },
  { name: "Сб", оценки: 8 },
  { name: "Вс", оценки: 5 },
];

const competencyDistribution = [
  { name: "ПК-1", value: 25 },
  { name: "ПК-2", value: 20 },
  { name: "ПК-3", value: 30 },
  { name: "ОК-1", value: 25 },
];

const COLORS = ["#377DFF", "#A6C8FF", "#2D4DBF", "#5B9EFF"];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          icon={<Users size={24} />}
          value={dashboardMetrics.users}
          label="Пользователей"
          color="blue"
        />
        <MetricCard
          icon={<BookOpen size={24} />}
          value={dashboardMetrics.disciplines}
          label="Дисциплин"
          color="purple"
        />
        <MetricCard
          icon={<Target size={24} />}
          value={dashboardMetrics.competencies}
          label="Компетенций"
          color="green"
        />
        <MetricCard
          icon={<Pin size={24} />}
          value={dashboardMetrics.indicators}
          label="Индикаторов"
          color="orange"
        />
        <MetricCard
          icon={<Users2 size={24} />}
          value={dashboardMetrics.groups}
          label="Групп"
          color="blue"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Competencies by Discipline */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Распределение компетенций по дисциплинам</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={disciplineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="name" stroke="#666666" style={{ fontSize: "12px" }} />
              <YAxis stroke="#666666" style={{ fontSize: "12px" }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#FFFFFF", 
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Bar dataKey="competencies" fill="#377DFF" name="Компетенции" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Activity */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Активность оценивания (неделя)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="name" stroke="#666666" style={{ fontSize: "12px" }} />
              <YAxis stroke="#666666" style={{ fontSize: "12px" }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#FFFFFF", 
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="оценки" fill="#A6C8FF" name="Оценки" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Competency Distribution */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Распределение компетенций</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={competencyDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {competencyDistribution.map((entry, index) => (
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

        {/* Statistics Card */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Статистика</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
              <span className="text-sm text-foreground">Средний прогресс студентов</span>
              <span className="text-2xl font-bold text-primary">68%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
              <span className="text-sm text-foreground">Оцененных индикаторов</span>
              <span className="text-2xl font-bold text-primary">1,247</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
              <span className="text-sm text-foreground">Активных пользователей</span>
              <span className="text-2xl font-bold text-primary">52</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
