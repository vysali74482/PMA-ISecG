using ProjectManagement.Model;
using ProjectManagement.SPHelper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.DAL
{
    public class UserDal
    {
        public static UserInfo[] GetAllUsers()
        {
            ArrayList al = new ArrayList();

            int retValue = -1;


            //Generated Code for query : dbo.GetAllVendors
            using (SqlDataReader dr = ProjManagementAdmin.GetAllUsers(out retValue)) //Initialize and retrieve code for Datareader goes here
            {

                while (dr.Read())
                {
                    UserInfo user = new UserInfo();

                    user.UserName = dr["user_name"].ToString();
                    user.UserId = Convert.ToInt32(dr["user_id"]);
                    user.UserEmail = dr["user_email"].ToString();
                    user.ChangedByName = dr["changed_by"].ToString();

                    al.Add(user);
                }
                //dr.Close();
            }

            UserInfo[] allInfo = new UserInfo[al.Count];
            al.CopyTo(allInfo);
            return allInfo;

        }
        public static UserInfo GetUserById(int userId)
        {
            int retValue = -1;
            UserInfo user = new UserInfo();
            //Generated Code for query : dbo.GetAllVendors
            using (SqlDataReader dr = ProjManagementAdmin.GetUserById(userId, out retValue)) //Initialize and retrieve code for Datareader goes here
            {
                while (dr.Read())
                {
                    user.UserName = dr["user_name"].ToString();
                    user.UserId = Convert.ToInt32(dr["user_id"]);
                    user.UserEmail = dr["user_email"].ToString();
                    user.ChangedByName = dr["changed_by"].ToString();
                }
                //dr.Close();
            }

            return user;
        }
        public static int SoftDeleteUser(int userId, bool isOpen)
        {
            int retValue = -1;
            return ProjManagementAdmin.SoftDeleteUser(userId, isOpen, out retValue);
        }

        public static int UpdateUser(UserInfo user)
        {
            int retValue = -1;
            return ProjManagementAdmin.UpdateUser(user, out retValue);
        }

        public static int AddNewUser(UserInfo user)
        {
            if (user == null)
                throw new ArgumentNullException("user");


            int retValue = -1;
            return ProjManagementAdmin.AddNewUser(user, out retValue);
        }
        public static UserInfo[] GetAllProjectLeads()
        {
            ArrayList al = new ArrayList();
            int retValue = -1;
            using (SqlDataReader dr = ProjManagementAdmin.GetAllProjectLeads(out retValue)) //Initialize and retrieve code for Datareader goes here
            {
                while (dr.Read())
                {
                    UserInfo user = new UserInfo();

                    user.UserName = dr["user_name"].ToString();
                    user.UserId = Convert.ToInt32(dr["user_id"]);
                    user.UserEmail = dr["user_email"].ToString();
                    user.ChangedByName = dr["changed_by"].ToString();

                    al.Add(user);
                }
                //dr.Close();
            }

            UserInfo[] allInfo = new UserInfo[al.Count];
            al.CopyTo(allInfo);
            return allInfo;
        }
    }
}
