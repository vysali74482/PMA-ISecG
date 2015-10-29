using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Model
{
    public class UserInfo
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string UserEmail{ get; set; }

        public int RoleId{ get; set; }

        public char Password { get; set; }

        public Boolean IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ChangedDate { get; set; }

        public int ChangedById { get; set; }

        public string ChangedByName { get; set; }
    }

}

