using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Model
{
    public class LocationInfo
    {
        public int LocationId { get; set; }

        public string LocationName { get; set; }

        public Boolean IsActive { get; set; }

        public string OpenClose { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ChangedDate { get; set; }

        public int ChangedById { get; set; }

        public string ChangedByName { get; set; }

    }
}
