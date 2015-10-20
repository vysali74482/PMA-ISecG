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
    public class ProjectLocationDal
    {
        public static ProjectLocationInfo[] GetProjectsAtLocation(int LocationId)
        {
            ArrayList al = new ArrayList();
            int retValue = -1;
            //Generated Code for query : dbo.GetAllVendors
            using (SqlDataReader dr = ProjManagementAdmin.GetProjectsAtLocation(LocationId,out retValue)) //Initialize and retrieve code for Datareader goes here
            {

                while (dr.Read())
                {
                    ProjectLocationInfo proj_loc = new ProjectLocationInfo();

                    proj_loc.ProjectLocationId = Convert.ToInt32(dr["project_location_id"]);
                    proj_loc.ProjectId = Convert.ToInt32(dr["project_id"]);
                    proj_loc.ProjectName = dr["project_name"].ToString();
                    proj_loc.ProjectCode = dr["project_code"].ToString();
                    proj_loc.ProjectLeadId = Convert.ToInt32(dr["project_lead_id"]);
                    proj_loc.ProjectLeadName = dr["project_lead_name"].ToString();

                    proj_loc.LocationId = Convert.ToInt32(dr["location_id"]);
                    proj_loc.LocationName = dr["location_name"].ToString();

                    proj_loc.IsActive = Convert.ToBoolean(dr["is_active"]);
                    proj_loc.CreatedDate = Convert.ToDateTime(dr["created_date"]);
                    proj_loc.ChangedDate = Convert.ToDateTime(dr["changed_date"]);
                    proj_loc.ChangedById = Convert.ToInt32(dr["changed_by"]);
                    proj_loc.ChangedByName = dr["changed_by_name"].ToString();

                    al.Add(proj_loc);
                }
                //dr.Close();
            }

            ProjectLocationInfo[] allInfo = new ProjectLocationInfo[al.Count];
            al.CopyTo(allInfo);
            return allInfo;
        }
    }
}
