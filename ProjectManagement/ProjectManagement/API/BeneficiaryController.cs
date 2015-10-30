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
    public class BeneficiaryController : ApiController
    {


        public JsonResult<IEnumerable<BeneficiaryProjLocInfo>> Get()
        {

            BeneficiaryProjLocInfo[] ListOfBeneficiaries = BeneficiaryProjLocBl.GetAllBeneficiaries();
            //testing push
            var benes = from c in ListOfBeneficiaries
                        select c;


            return Json(benes);

        }
        public HttpResponseMessage Post(BeneficiaryProjLocInfo bene)
        {

            try
            {

                BeneficiaryProjLocBl.AddNewBeneficiary(bene);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
       
    }
}