using ProjectManagement.BL;
using ProjectManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Security;

namespace ProjectManagement.API
{
    public class AuthenticateController : ApiController
    {
        public HttpResponseMessage Post(AccountInfo account)
        {
            try
            {
                AccountInfo accountInfo = AuthenticateBL.AuthenticateUser(account);

                if (accountInfo != null)
                {
                    if (accountInfo.UserName == account.UserName && accountInfo.Password == account.Password)
                    {
                        return new HttpResponseMessage(HttpStatusCode.OK);
                    }
                }
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }

    }
}