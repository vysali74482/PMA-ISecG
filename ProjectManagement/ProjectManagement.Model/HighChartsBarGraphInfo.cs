using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Model
{
    public class HighChartsBarGraphInfo
    {
        public IList<BarGraphSeriesInfo> series { get; set; }
        public IList<string> categories { get; set; }
       
    }
}
