using ProjectManagement.BL;
using ProjectManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace ProjectManagement.API
{
    public class BeneficiaryAtProjectLocationController : ApiController
    {
        //
        // GET: /BeneficiaryAtProjectLocation/
       // public BeneficiaryProjLocInfo Get(int id)
       // {

      //      BeneficiaryProjLocInfo beneficiary = new BeneficiaryProjLocInfo();
      //      beneficiary = BeneficiaryProjLocBl.GetBeneficiaryAtProjectLocation(id);
      //      return beneficiary;
      //  }
         public JsonResult<IEnumerable<BeneficiaryProjLocInfo>> Get(int id)
        {

            BeneficiaryProjLocInfo[] beneficiaries = BeneficiaryProjLocBl.GetBeneficiaryAtProjectLocation(id);
            var bene = from c in beneficiaries
                       select c;
            return Json(bene);

        }

         public HttpResponseMessage Post(BeneficiaryProjLocInfo bene)
         {

             return BeneficiaryProjLocBl.UpdateBeneficiary(bene);

         }

         public HttpResponseMessage Delete(int id, bool isOpen)
         {

             return BeneficiaryProjLocBl.SoftDeleteBeneficiary
                 (id, isOpen);

         }
	}
}
