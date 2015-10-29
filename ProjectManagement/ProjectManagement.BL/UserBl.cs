using ProjectManagement.DAL;
using ProjectManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.BL
{
    public class UserBl
    {
        public static UserInfo[] GetAllUsers()
        {
            UserInfo[] userInfo = UserDal.GetAllUsers();
            return userInfo;

        }
        
       public static int AddNewUser(UserInfo user)
        {
            return UserDal.AddNewUser(user);
        }



        public static UserInfo GetUserById(int userId)
        {
            return UserDal.GetUserById(userId);
        }



        public static HttpResponseMessage SoftDeleteUser(int userId, bool isOpen)
        {
            try
            {
                int val = UserDal.SoftDeleteUser(userId, isOpen);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION: " + ex);
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }

        public static HttpResponseMessage UpdateUser(UserInfo user)
        {
            try
            {
                int val = UserDal.UpdateUser(user);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION: " + ex);
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
        public static UserInfo[] GetAllProjectLeads()
        {
            UserInfo[] userInfo = UserDal.GetAllProjectLeads();
            return userInfo;

        }
    }
}
