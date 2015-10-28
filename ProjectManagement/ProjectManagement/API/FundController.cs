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
    public class FundController : ApiController
    {
        public JsonResult<IEnumerable<FundInfo>> Get()
        {

            FundInfo[] ListOfFunds = FundBl.GetAllFunds();
            //testing push
            var funds = from c in ListOfFunds
                        select c;


            return Json(funds);

        }
        public HttpResponseMessage Post(FundInfo fund)
        {

            try
            {

                FundBl.AddNewFund(fund);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }

    }
}
