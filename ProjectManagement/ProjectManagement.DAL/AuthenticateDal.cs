using ProjectManagement.Model;
using ProjectManagement.SPHelper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.DAL
{
    public class AuthenticateDal
    {
        public static AccountInfo AuthenticateUser(AccountInfo account)
        {
            int retValue = -1;
            AccountInfo accountInfo = new AccountInfo();

            using (SqlDataReader dr = ProjManagementAdmin.AuthenticateUser(account.UserName, account.Password, out retValue)) //Initialize and retrieve code for Datareader goes here
            {
                if (dr != null && dr.HasRows)
                {
                    while (dr.Read())
                    {
                        accountInfo.AccountId = Convert.ToInt32(dr["account_id"]);
                        accountInfo.UserName = dr["user_name"].ToString();
                        accountInfo.Password = dr["password"].ToString();
                        accountInfo.FirstName = dr["first_name"].ToString();
                        accountInfo.LastName = dr["last_name"].ToString();
                    }
                }
            }

            return accountInfo;
        }

        public static int RegisterAccount(AccountInfo account)
        {
            int retValue = -1;

            ProjManagementAdmin.RegisterAccount(account, out retValue); //Initialize and retrieve code for Datareader goes here

            return retValue;
        }
    }
}
