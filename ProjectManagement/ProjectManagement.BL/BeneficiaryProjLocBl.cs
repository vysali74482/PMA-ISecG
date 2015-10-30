using System;
using ProjectManagement.DAL;
using ProjectManagement.Model;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.BL
{
   public class BeneficiaryProjLocBl
    {
        public static BeneficiaryProjLocInfo[] GetBeneficiaryAtProjectLocation(int BeneficiaryId)
        {
            BeneficiaryProjLocInfo[] beneficiaryProjLocInfo = BeneficiaryProjLocDal.GetBeneficiaryAtProjectLocation(BeneficiaryId);
            return beneficiaryProjLocInfo;

        }
        public static BeneficiaryProjLocInfo[] GetAllBeneficiaries()
        {
            BeneficiaryProjLocInfo[] benes = BeneficiaryProjLocDal.GetAllBeneficiaries();
            return benes;

        }

        public static int AddNewBeneficiary(BeneficiaryProjLocInfo bene)
        {
            return BeneficiaryProjLocDal.AddNewBeneficiary(bene);
        }




        public static HttpResponseMessage SoftDeleteBeneficiary(int beneficiaryId, bool isOpen)
        {
            try
            {
                int val = BeneficiaryProjLocDal.SoftDeleteBeneficiary(beneficiaryId, isOpen);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION: " + ex);
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }

        public static HttpResponseMessage UpdateBeneficiary(BeneficiaryProjLocInfo bene)
        {
            try
            {
                int val = BeneficiaryProjLocDal.UpdateBeneficiary(bene);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION: " + ex);
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
    }
}
