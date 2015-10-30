using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Model
{
    public class BarGraphSeriesInfo
    {
        public string name { get; set; }
        public IList<int> data { get; set; }
        public IList<MyInt> dataForTable { get; set; }
       

    }
}
