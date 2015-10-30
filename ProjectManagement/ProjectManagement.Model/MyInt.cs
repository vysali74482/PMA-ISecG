using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Model
{
    public class MyInt
    {
        public int Value { get; set; }
        public MyInt()
        {
            Value = 0;
        }
        public MyInt(int Value)
        {
            this.Value = Value;
        }
    }
}
