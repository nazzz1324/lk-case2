using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Account.Domain.Entity
{
    public class Group
    {
        public long Id { get; set; }
        public long CourseId {  get; set; } // Курс студента (год)
        public long FacultyId { get; set; }
        public long StudentId { get; set; }
        public long EducationFormId { get; set; }

        public EducationForm EducationForm { get; set; }
        public Faculty Faculty { get; set; }
        public Course Course { get; set; }  // Курс студента (год)
        public ICollection<Student> Students { get; set; } = new List<Student>();
        public ICollection<Discipline> Disciplines { get; set; } = new List<Discipline>();
    }
}
