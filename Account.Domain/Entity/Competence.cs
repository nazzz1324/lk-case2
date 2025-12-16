using Account.Domain.Entity.LinkedEntites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Account.Domain.Entity
{
    public class Competence
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public long proleId { get; set; }

        public ICollection<Indicator> Indicators { get; set; } = new List<Indicator>();
        public CompetenceScore CompetenceScore { get; set; }
        public ProfessionalRole ProfessionalRole { get; set; }
    }

}
