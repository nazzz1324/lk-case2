import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { mockDisciplines, mockIndicators, mockCompetencies } from "@/lib/mockData";

export default function Relations() {
  const [selectedDiscipline, setSelectedDiscipline] = useState(mockDisciplines[0]?.id || 1);
  const [selectedIndicator, setSelectedIndicator] = useState(mockIndicators[0]?.id || 1);

  const currentDiscipline = mockDisciplines.find((d) => d.id === selectedDiscipline);
  const currentIndicator = mockIndicators.find((i) => i.id === selectedIndicator);

  const disciplineIndicators = currentDiscipline?.indicators || [];
  const indicatorCompetencies = currentIndicator?.competencies || [];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="discipline-indicators" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="discipline-indicators">Дисциплина → Индикаторы</TabsTrigger>
          <TabsTrigger value="indicator-competencies">Индикатор → Компетенции</TabsTrigger>
        </TabsList>

        {/* Tab 1: Discipline to Indicators */}
        <TabsContent value="discipline-indicators" className="space-y-6">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Выберите дисциплину</h3>
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

          {/* Visual Representation */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Связь: Дисциплина → Индикаторы</h3>
            
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Discipline Box */}
              <div className="flex-1 w-full">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary rounded-2xl p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Дисциплина</p>
                  <p className="text-xl font-bold text-foreground">{currentDiscipline?.name}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden lg:block text-3xl text-primary font-bold">→</div>
              <div className="lg:hidden text-3xl text-primary font-bold">↓</div>

              {/* Indicators Box */}
              <div className="flex-1 w-full">
                <div className="space-y-2">
                  {disciplineIndicators.length > 0 ? (
                    disciplineIndicators.map((indicatorId) => {
                      const indicator = mockIndicators.find((i) => i.id === indicatorId);
                      return (
                        <div
                          key={indicatorId}
                          className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-secondary rounded-lg p-4"
                        >
                          <p className="text-sm font-semibold text-primary">{indicator?.code}</p>
                          <p className="text-sm text-foreground">{indicator?.name}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Нет связанных индикаторов
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Table View */}
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Код индикатора</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Название</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Уровень</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplineIndicators.length > 0 ? (
                    disciplineIndicators.map((indicatorId) => {
                      const indicator = mockIndicators.find((i) => i.id === indicatorId);
                      return (
                        <tr key={indicatorId} className="border-b border-border hover:bg-secondary transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-primary">{indicator?.code}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{indicator?.name}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{indicator?.level}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                        Нет данных
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Indicator to Competencies */}
        <TabsContent value="indicator-competencies" className="space-y-6">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Выберите индикатор</h3>
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {mockIndicators.map((indicator) => (
                <option key={indicator.id} value={indicator.id}>
                  {indicator.code} - {indicator.name}
                </option>
              ))}
            </select>
          </div>

          {/* Visual Representation */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Связь: Индикатор → Компетенции</h3>
            
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Indicator Box */}
              <div className="flex-1 w-full">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary rounded-2xl p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Индикатор</p>
                  <p className="text-lg font-bold text-foreground">{currentIndicator?.code}</p>
                  <p className="text-sm text-foreground mt-2">{currentIndicator?.name}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden lg:block text-3xl text-primary font-bold">→</div>
              <div className="lg:hidden text-3xl text-primary font-bold">↓</div>

              {/* Competencies Box */}
              <div className="flex-1 w-full">
                <div className="space-y-2">
                  {indicatorCompetencies.length > 0 ? (
                    indicatorCompetencies.map((competencyId) => {
                      const competency = mockCompetencies.find((c) => c.id === competencyId);
                      return (
                        <div
                          key={competencyId}
                          className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-secondary rounded-lg p-4"
                        >
                          <p className="text-sm font-semibold text-primary">{competency?.code}</p>
                          <p className="text-sm text-foreground">{competency?.name}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Нет связанных компетенций
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Table View */}
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Код компетенции</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Название</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Описание</th>
                  </tr>
                </thead>
                <tbody>
                  {indicatorCompetencies.length > 0 ? (
                    indicatorCompetencies.map((competencyId) => {
                      const competency = mockCompetencies.find((c) => c.id === competencyId);
                      return (
                        <tr key={competencyId} className="border-b border-border hover:bg-secondary transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-primary">{competency?.code}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{competency?.name}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground truncate">{competency?.description}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                        Нет данных
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
