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
    public class FundBl
    {
        public static FundInfo[] GetAllFunds()
        {
            FundInfo[] fundInfo = FundDal.GetAllFunds();
            return fundInfo;

        }

        public static int AddNewFund(FundInfo fund)
        {
            return FundDal.AddNewFund(fund);
        }



        public static FundInfo GetFundById(int fundId)
        {
            return FundDal.GetFundById(fundId);
        }



        public static HttpResponseMessage SoftDeleteFund(int fundId, bool isOpen)
        {
            try
            {
                int val = FundDal.SoftDeleteFund(fundId, isOpen);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION: " + ex);
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }

        public static HttpResponseMessage UpdateFund(FundInfo fund)
        {
            try
            {
                int val = FundDal.UpdateFund(fund);
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
