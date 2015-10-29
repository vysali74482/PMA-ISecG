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
    public class SelectedFundController : ApiController
    {
        public FundInfo Get(int id)
        {


            FundInfo fund = new FundInfo();
            fund = FundBl.GetFundById(id);
            return fund;
        }

        public HttpResponseMessage Post(FundInfo fund)
        {

            return FundBl.UpdateFund(fund);

        }

        public HttpResponseMessage Delete(int id)
        {

            return FundBl.SoftDeleteFund(id);

        }
    }
}
