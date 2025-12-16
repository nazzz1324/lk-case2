import { useState } from "react";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { mockCompetencies, mockIndicators } from "@/lib/mockData";

interface Competency {
  id: number;
  code: string;
  name: string;
  description: string;
  indicators: number[];
}

export default function Competencies() {
  const [competencies, setCompetencies] = useState<Competency[]>(mockCompetencies);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompetency, setEditingCompetency] = useState<Competency | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    indicators: [] as number[],
  });

  const filteredCompetencies = competencies.filter((competency) =>
    competency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    competency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (competency?: Competency) => {
    if (competency) {
      setEditingCompetency(competency);
      setFormData({
        code: competency.code,
        name: competency.name,
        description: competency.description,
        indicators: competency.indicators,
      });
    } else {
      setEditingCompetency(null);
      setFormData({
        code: "",
        name: "",
        description: "",
        indicators: [],
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingCompetency) {
      setCompetencies(
        competencies.map((c) =>
          c.id === editingCompetency.id
            ? {
                ...c,
                code: formData.code,
                name: formData.name,
                description: formData.description,
                indicators: formData.indicators,
              }
            : c
        )
      );
    } else {
      setCompetencies([
        ...competencies,
        {
          id: Math.max(...competencies.map((c) => c.id), 0) + 1,
          code: formData.code,
          name: formData.name,
          description: formData.description,
          indicators: formData.indicators,
        },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setCompetencies(competencies.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Поиск по названию или коду..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
        >
          <Plus size={18} className="mr-2" />
          Добавить компетенцию
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Код</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Название</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Описание</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompetencies.map((competency) => (
                <tr
                  key={competency.id}
                  className="border-b border-border hover:bg-secondary transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-primary">{competency.code}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{competency.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground truncate">{competency.description}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenDialog(competency)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(competency.id)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors text-destructive"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCompetency ? "Редактировать компетенцию" : "Добавить компетенцию"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Код</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="ПК-1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Разработка программного обеспечения"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Описание компетенции..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Индикаторы</Label>
              <div className="border border-border rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
                {mockIndicators.map((indicator) => (
                  <label key={indicator.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.indicators.includes(indicator.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            indicators: [...formData.indicators, indicator.id],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            indicators: formData.indicators.filter((id) => id !== indicator.id),
                          });
                        }
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-foreground">{indicator.code} - {indicator.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {editingCompetency ? "Сохранить" : "Добавить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
