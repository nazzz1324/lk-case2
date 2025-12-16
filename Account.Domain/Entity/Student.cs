using Account.Domain.Entity.AuthRole;
using Account.Domain.Interfaces.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Account.Domain.Entity
{
    public class Student : IPeople
    {
        public long Id { get; set; } // Номер зачетки, PK for Student and FK for User
        public string Fullname { get; set ; }
        public DateTime DateOfBirth { get; set; }
        public DateTime EnrollmentYear { get; set; } = DateTime.Now;

        public ICollection<DisciplineScore> DisciplineScores { get; set; } = new List<DisciplineScore>();
        public ICollection<CompetenceScore> CompetenceScores { get; set; } = new List<CompetenceScore>();
        public ICollection<IndicatorScore> IndicatorScores { get; set; } = new List<IndicatorScore>();//Bestpracties
        public User User { get; set; }
        public Group Group { get; set; }
    }
}
