
export const mockUsers = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan.petrov@university.ru",
    role: "student",
    status: "active",
    group: "ПИ-21-1",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "maria.sidorova@university.ru",
    role: "student",
    status: "active",
    group: "ПИ-21-1",
  },
  {
    id: 3,
    name: "Алексей Иванов",
    email: "alexey.ivanov@university.ru",
    role: "teacher",
    status: "active",
    group: null,
  },
  {
    id: 4,
    name: "Елена Смирнова",
    email: "elena.smirnova@university.ru",
    role: "admin",
    status: "active",
    group: null,
  },
  {
    id: 5,
    name: "Дмитрий Козлов",
    email: "dmitry.kozlov@university.ru",
    role: "student",
    status: "blocked",
    group: "ПИ-21-2",
  },
];

export const mockGroups = [
  {
    id: 1,
    name: "ПИ-21-1",
    studentCount: 25,
    curator: "Алексей Иванов",
    students: [1, 2],
  },
  {
    id: 2,
    name: "ПИ-21-2",
    studentCount: 23,
    curator: "Алексей Иванов",
    students: [5],
  },
  {
    id: 3,
    name: "ПИ-21-3",
    studentCount: 24,
    curator: "Елена Смирнова",
    students: [],
  },
];

export const mockDisciplines = [
  {
    id: 1,
    name: "Веб-разработка",
    semester: 3,
    indicatorCount: 5,
    indicators: [1, 2, 3],
  },
  {
    id: 2,
    name: "Базы данных",
    semester: 3,
    indicatorCount: 4,
    indicators: [4, 5],
  },
  {
    id: 3,
    name: "Алгоритмы и структуры данных",
    semester: 2,
    indicatorCount: 6,
    indicators: [1, 6, 7],
  },
  {
    id: 4,
    name: "Объектно-ориентированное программирование",
    semester: 1,
    indicatorCount: 5,
    indicators: [2, 8, 9],
  },
];

export const mockCompetencies = [
  {
    id: 1,
    code: "ПК-1",
    name: "Разработка программного обеспечения",
    description: "Способность разрабатывать программное обеспечение",
    indicators: [1, 2, 3],
  },
  {
    id: 2,
    code: "ПК-2",
    name: "Проектирование информационных систем",
    description: "Способность проектировать информационные системы",
    indicators: [4, 5],
  },
  {
    id: 3,
    code: "ПК-3",
    name: "Администрирование баз данных",
    description: "Способность администрировать базы данных",
    indicators: [6, 7],
  },
  {
    id: 4,
    code: "ОК-1",
    name: "Общекультурная компетенция",
    description: "Развитие общекультурных компетенций",
    indicators: [8, 9],
  },
];

export const mockIndicators = [
  {
    id: 1,
    code: "И-1.1",
    name: "Знание основ веб-разработки",
    level: 1,
    competencies: [1],
  },
  {
    id: 2,
    code: "И-1.2",
    name: "Умение разрабатывать веб-приложения",
    level: 2,
    competencies: [1],
  },
  {
    id: 3,
    code: "И-1.3",
    name: "Владение фреймворками веб-разработки",
    level: 3,
    competencies: [1],
  },
  {
    id: 4,
    code: "И-2.1",
    name: "Знание основ проектирования ИС",
    level: 1,
    competencies: [2],
  },
  {
    id: 5,
    code: "И-2.2",
    name: "Умение проектировать архитектуру ИС",
    level: 2,
    competencies: [2],
  },
  {
    id: 6,
    code: "И-3.1",
    name: "Знание основ администрирования БД",
    level: 1,
    competencies: [3],
  },
  {
    id: 7,
    code: "И-3.2",
    name: "Умение администрировать БД",
    level: 2,
    competencies: [3],
  },
  {
    id: 8,
    code: "И-4.1",
    name: "Развитие коммуникативных навыков",
    level: 1,
    competencies: [4],
  },
  {
    id: 9,
    code: "И-4.2",
    name: "Развитие лидерских качеств",
    level: 2,
    competencies: [4],
  },
];

export const mockGrades = [
  {
    studentId: 1,
    disciplineId: 1,
    grades: {
      1: 85,
      2: 90,
      3: 88,
    },
    comments: {
      1: "Хорошее понимание основ",
      2: "Отличная работа",
      3: "Нужно улучшить",
    },
  },
  {
    studentId: 2,
    disciplineId: 1,
    grades: {
      1: 92,
      2: 88,
      3: 95,
    },
    comments: {
      1: "Отличный результат",
      2: "Хорошо",
      3: "Превосходно",
    },
  },
];

export const mockStudentCompetencies = [
  {
    studentId: 1,
    competencyId: 1,
    progress: 65,
    level: 2,
  },
  {
    studentId: 1,
    competencyId: 2,
    progress: 45,
    level: 1,
  },
  {
    studentId: 1,
    competencyId: 3,
    progress: 55,
    level: 1,
  },
  {
    studentId: 1,
    competencyId: 4,
    progress: 70,
    level: 2,
  },
];

export const dashboardMetrics = {
  users: 60,
  disciplines: 25,
  competencies: 15,
  indicators: 45,
  groups: 12,
};
