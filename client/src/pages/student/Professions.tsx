import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Target } from "lucide-react";

export default function StudentProfessions() {
  // Mock data for demonstration
  const professions = [
    { 
      name: "Веб-разработчик", 
      description: "Специалист, занимающийся разработкой веб-приложений и сайтов. Требует знания фронтенд и бэкенд технологий.",
      requiredCompetencies: 5, 
      achievedCompetencies: 3, 
      progress: 60,
      requiredCompetencyList: [
        { code: "ПК-1", name: "Программная инженерия", progress: 65 },
        { code: "ПК-2", name: "Анализ требований", progress: 45 },
        { code: "ОК-1", name: "Основы коммуникации", progress: 70 },
      ]
    },
    { 
      name: "Аналитик данных", 
      description: "Специалист, который собирает, обрабатывает и анализирует большие объемы данных для принятия бизнес-решений.",
      requiredCompetencies: 4, 
      achievedCompetencies: 1, 
      progress: 25,
      requiredCompetencyList: [
        { code: "ПК-3", name: "Математическое моделирование", progress: 80 },
        { code: "ПК-4", name: "Статистический анализ", progress: 30 },
        { code: "ОК-2", name: "Деловая этика", progress: 90 },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Мой Прогресс по Профессиям</h1>
      <p className="text-muted-foreground">
        Здесь вы можете увидеть, насколько вы готовы к освоению выбранных профессий на основе ваших компетенций.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {professions.map((prof, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">{prof.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">{prof.description}</CardDescription>
              <Users className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">{prof.progress}% Готовность</div>
              <Progress value={prof.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Освоено {prof.achievedCompetencies} из {prof.requiredCompetencies} требуемых компетенций.
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold mb-1">Требуемые компетенции:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {prof.requiredCompetencyList.map((comp, compIndex) => (
                    <li key={compIndex} className="flex items-center">
                      <Target className="h-3 w-3 mr-1 text-primary" /> 
                      <span className="font-medium text-foreground mr-1">{comp.code}</span>
                      <span className="text-muted-foreground mr-1">({comp.name})</span>
                      <span className="font-bold text-primary">({comp.progress}% освоено)</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
