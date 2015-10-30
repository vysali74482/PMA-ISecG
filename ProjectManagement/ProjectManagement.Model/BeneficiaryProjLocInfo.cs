using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Model
{
   public class BeneficiaryProjLocInfo
    {
        public int BeneficiaryId { get; set; }

        public string BeneficiaryName { get; set; }

        public string BeneficiaryAddress { get; set; }

        public int ProjectLocationId { get; set; }

        public int ProjectId { get; set; }

        public string ProjectName { get; set; }

        public string ProjectCode { get; set; }

        public int LocationId { get; set; }

        public string LocationName { get; set; }

        public Boolean IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ChangedDate { get; set; }

        public string ChangedBy { get; set; }

        public string OpenClose { get; set; }
    }
}
