using ProjectManagement.Model;
using ProjectManagement.SPHelper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.DAL
{
    public class FundDal
    {
        public static FundInfo[] GetAllFunds()
        {
            ArrayList al = new ArrayList();

            int retValue = -1;


            //Generated Code for query : dbo.GetAllVendors
            using (SqlDataReader dr = ProjManagementAdmin.GetAllFunds(out retValue)) //Initialize and retrieve code for Datareader goes here
            {

                while (dr.Read())
                {
                    FundInfo fund = new FundInfo();
                    fund.FundId = Convert.ToInt32(dr["fund_id"]);
                    fund.FundDesc = dr["fund_desc"].ToString();
                    fund.FundAmount = Convert.ToSingle(dr["fund_amount"]);
                    fund.ReceivedDate = Convert.ToDateTime(dr["received_date"]);
                    fund.ChangedDate = Convert.ToDateTime(dr["changed_date"]);
                    fund.ChangedBy = Convert.ToInt32(dr["changed_by"]);

                    al.Add(fund);
                }
                //dr.Close();
            }

            FundInfo[] allInfo = new FundInfo[al.Count];
            al.CopyTo(allInfo);
            return allInfo;

        }
        public static FundInfo GetFundById(int fundId)
        {
            int retValue = -1;
            FundInfo fund = new FundInfo();
            //Generated Code for query : dbo.GetAllVendors
            using (SqlDataReader dr = ProjManagementAdmin.GetFundById(fundId, out retValue)) //Initialize and retrieve code for Datareader goes here
            {
                while (dr.Read())
                {

                    fund.FundId = Convert.ToInt32(dr["fund_id"]);
                    fund.FundDesc = dr["fund_desc"].ToString();
                    fund.FundAmount = Convert.ToSingle(dr["fund_amount"]);
                    fund.ReceivedDate = Convert.ToDateTime(dr["received_date"]);
                    fund.ChangedDate = Convert.ToDateTime(dr["changed_date"]);
                    fund.ChangedBy = Convert.ToInt32(dr["changed_by"]);

                }
                //dr.Close();
            }

            return fund;
        }
        public static int SoftDeleteFund(int fundId, bool isOpen)
        {
            int retValue = -1;
            return ProjManagementAdmin.SoftDeleteFund(fundId, isOpen, out retValue);
        }

        public static int UpdateFund(FundInfo fund)
        {
            int retValue = -1;
            return ProjManagementAdmin.UpdateFund(fund, out retValue);
        }

        public static int AddNewFund(FundInfo fund)
        {
            if (fund == null)
                throw new ArgumentNullException("fund");


            int retValue = -1;
            return ProjManagementAdmin.AddNewFund(fund, out retValue);
        }
    }
}
