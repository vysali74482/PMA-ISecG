using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Model
{
    public class FundInfo
    {
        public int FundId { get; set; }

        public string FundDesc { get; set; }

        public float FundAmount { get; set; }

        public DateTime ReceivedDate { get; set; }

        public DateTime ChangedDate { get; set; }

        public string ChangedBy { get; set; }

        public Boolean IsActive { get; set; }
    }

}

