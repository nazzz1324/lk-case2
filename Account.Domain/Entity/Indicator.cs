using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Account.Domain.Entity.LinkedEntites
{
    public class Indicator
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        public long DisciplineId { get; set; }
        public string CompetenceId { get; set; }

        public Discipline Discipline { get; set; }
        public Competence Competence { get; set; }
        public IndicatorScore IndicatorScore { get; set; }
    }
}