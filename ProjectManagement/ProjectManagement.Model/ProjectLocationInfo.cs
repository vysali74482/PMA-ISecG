using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Model
{
    public class ProjectLocationInfo
    {
        public int ProjectLocationId { get; set; }

        public int ProjectId { get; set; }

        public string ProjectName { get; set; }

        public string ProjectCode { get; set; }

        public int ProjectLeadId { get; set; }

        public string ProjectLeadName { get; set; }

        public int LocationId { get; set; }

        public string LocationName { get; set; }

        public Boolean IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ChangedDate { get; set; }

        public int ChangedById { get; set; }

        public string ChangedByName { get; set; }

        public string OpenClose { get; set; }
    }
}
