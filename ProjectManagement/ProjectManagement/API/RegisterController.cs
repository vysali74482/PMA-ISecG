using ProjectManagement.BL;
using ProjectManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectManagement.API
{
    public class RegisterController : ApiController
    {
        public HttpResponseMessage Post(AccountInfo account)
        {
            try
            {
                AuthenticateBL.RegisterAccount(account);

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }

    }
}