using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProjectManagement.Model;
using ProjectManagement.BL;
using System.Web.Http.Results;

namespace ProjectManagement.API
{
    public class UserController : ApiController
    {
        public JsonResult<IEnumerable<UserInfo>> Get()
        {

            UserInfo[] ListOfUsers = UserBl.GetAllUsers();
            //testing push
            var users = from c in ListOfUsers
                           select c;


            return Json(users);

        }
        public HttpResponseMessage Post(UserInfo user)
        {

            try
            {

                UserBl.AddNewUser(user);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
        [HttpGet]
        public JsonResult<IEnumerable<UserInfo>> FetchProjectLeads(int id)
        {

            UserInfo[] ListOfUsers = UserBl.GetAllProjectLeads();
            //testing push
            var users = from c in ListOfUsers
                        select c;
            return Json(users);

        }
    }
}
