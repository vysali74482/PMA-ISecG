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
    public class BeneficiaryProjLocDal
    {
        public static BeneficiaryProjLocInfo[] GetBeneficiaryAtProjectLocation(int BeneficiaryId)
        {
            ArrayList al = new ArrayList();
            int retValue = -1;
            //Generated Code for query : dbo.GetAllVendors
            using (SqlDataReader dr = ProjManagementAdmin.GetBeneficiaryAtProjectLocation(BeneficiaryId, out retValue)) //Initialize and retrieve code for Datareader goes here
            {

                while (dr.Read())
                {
                    BeneficiaryProjLocInfo b = new BeneficiaryProjLocInfo();
                    b.BeneficiaryId = Convert.ToInt32(dr["beneficiary_id"]);
                    b.BeneficiaryName = dr["beneficiary_name"].ToString();
                    b.BeneficiaryAddress = dr["beneficiary_address"].ToString();
                    b.ProjectLocationId = Convert.ToInt32(dr["project_location_id"]);
                    b.ProjectId = Convert.ToInt32(dr["project_id"]);
                    b.ProjectName = dr["project_name"].ToString();
                   // b.ProjectCode = dr["project_code"].ToString();
                    

                    b.LocationId = Convert.ToInt32(dr["location_id"]);
                    b.LocationName = dr["location_name"].ToString();

                    b.IsActive = Convert.ToBoolean(dr["is_active"]);
                    b.CreatedDate = Convert.ToDateTime(dr["created_date"]);
                    b.ChangedDate = Convert.ToDateTime(dr["changed_date"]);
                    
                    b.ChangedBy = dr["changed_by"].ToString();
                    al.Add(b);
                }
                //dr.Close();
            }

            BeneficiaryProjLocInfo[] allInfo = new BeneficiaryProjLocInfo[al.Count];
            al.CopyTo(allInfo);
            return allInfo;
        }
        public static BeneficiaryProjLocInfo[] GetAllBeneficiaries()
        {
            ArrayList al = new ArrayList();
            int retValue = -1;
            //Generated Code for query : dbo.GetAllVendors
            using (SqlDataReader dr = ProjManagementAdmin.GetAllBeneficiaries(out retValue)) //Initialize and retrieve code for Datareader goes here
            {

                while (dr.Read())
                {
                    BeneficiaryProjLocInfo b = new BeneficiaryProjLocInfo();
                    b.BeneficiaryId = Convert.ToInt32(dr["beneficiary_id"]);
                    b.BeneficiaryName = dr["beneficiary_name"].ToString();
                    b.BeneficiaryAddress = dr["beneficiary_address"].ToString();
                    b.ProjectLocationId = Convert.ToInt32(dr["project_location_id"]);
                    b.ProjectId = Convert.ToInt32(dr["project_id"]);
                   b.ProjectName = dr["project_name"].ToString();
                    // b.ProjectCode = dr["project_code"].ToString();


                    b.LocationId = Convert.ToInt32(dr["location_id"]);
                    b.LocationName = dr["location_name"].ToString();

                    b.IsActive = Convert.ToBoolean(dr["is_active"]);
                    b.CreatedDate = Convert.ToDateTime(dr["created_date"]);
                    b.ChangedDate = Convert.ToDateTime(dr["changed_date"]);
                    b.ChangedBy = dr["changed_by"].ToString();
                    al.Add(b);
                }
                //dr.Close();
            }

            BeneficiaryProjLocInfo[] allInfo = new BeneficiaryProjLocInfo[al.Count];
            al.CopyTo(allInfo);
            return allInfo;
        }
        public static int SoftDeleteBeneficiary(int beneficiaryId, bool isOpen)
        {
            int retValue = -1;
            return ProjManagementAdmin.SoftDeleteBeneficiary(beneficiaryId, isOpen, out retValue);
        }

        public static int UpdateBeneficiary(BeneficiaryProjLocInfo bene)
        {
            int retValue = -1;
            return ProjManagementAdmin.UpdateBeneficiary(bene, out retValue);
        }

        public static int AddNewBeneficiary(BeneficiaryProjLocInfo bene)
        {
            if (bene == null)
                throw new ArgumentNullException("bene");


            int retValue = -1;
            return ProjManagementAdmin.AddNewBeneficiary(bene, out retValue);
        }
    }
}
