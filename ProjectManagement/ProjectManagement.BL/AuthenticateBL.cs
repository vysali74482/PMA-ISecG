using ProjectManagement.DAL;
using ProjectManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.BL
{
    public class AuthenticateBL
    {
        public static AccountInfo AuthenticateUser(AccountInfo account)
        {
            if (account == null)
                return null;

            return AuthenticateDal.AuthenticateUser(account);
        }

        public static int RegisterAccount(AccountInfo registerAccount)
        {
            return AuthenticateDal.RegisterAccount(registerAccount);
        }

    }
}
