using ProjectManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProjectManagement.BL;

namespace ProjectManagement.API
{
    public class SelectedUserController : ApiController
    {
        public UserInfo Get(int id)
        {
            UserInfo user = new UserInfo();
            user = UserBl.GetUserById(id);
            return user;
        }

        public HttpResponseMessage Post(UserInfo user)
        {

            return UserBl.UpdateUser(user);

        }

        public HttpResponseMessage Delete(int id, bool isOpen)
        {

            return UserBl.SoftDeleteUser
                (id, isOpen);

        }
    }
}
