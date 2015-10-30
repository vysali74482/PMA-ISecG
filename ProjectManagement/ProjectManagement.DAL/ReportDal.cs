using ProjectManagement.Model;
using ProjectManagement.SPHelper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.DAL
{
    public class ReportDal
    {
        public static IList<PieUtility> GetReportProjectsFunds() //Parameter list
        {


            int retValue = -1;
            float sum = 0;

            IList<PieUtility> ListOfSourceTypes1 = new List<PieUtility>();
            List<PieUtility> ListOfSourceTypes2 = new List<PieUtility>();
            //List<BarGraphSeriesInfo> standardList = new List<BarGraphSeriesInfo>();

            using (SqlDataReader dr = ProjManagementAdmin.GetAllProjects(out retValue)) //Initialize and retrieve code for Datareader goes here
            {

                while (dr.Read())
                {
                    PieUtility ru = new PieUtility();
                    ru.name = dr["project_name"].ToString(); ;
                    ru.y = 0;
                    ListOfSourceTypes1.Add(ru);
                }
                //dr.Close();
            }


            using (SqlDataReader dr = ProjManagementAdmin.GetReportProjectsFunds(out retValue)) //Initialize and retrieve code for Datareader goes here
            {

                while (dr.Read())
                {
                    PieUtility ru = new PieUtility();
                    ru.name = dr["project_name"].ToString();
                    ru.y = Convert.ToInt32(dr["amount"]);
                    ListOfSourceTypes2.Add(ru);
                    sum += ru.y;
                }
                //dr.Close();
            }

            foreach (PieUtility ru2 in ListOfSourceTypes2)
            {
                foreach (PieUtility ru1 in ListOfSourceTypes1)
                {
                    if (ru1.name == ru2.name)
                    {
                        ru1.y = (ru2.y * 100) / sum;
                    }
                }
            }

            return ListOfSourceTypes1;
        }
    

    public static HighChartsBarGraphInfo GetReportProjectFundsAtLocation() //Parameter list
    {
        int retValue = -1;
     

            IList<string> projects = new List<string>();
            IList<string> locations = new List<string>();
            IList<BarGraphSeriesInfo> series = new List<BarGraphSeriesInfo>();
        HighChartsBarGraphInfo result = new HighChartsBarGraphInfo();
           result.categories = new List<string>();
            IList<ReportData> data = new List<ReportData>();
        using (SqlDataReader dr = ProjManagementAdmin.GetAllLocations(out retValue)) //Initialize and retrieve code for Datareader goes here
        {

            while (dr.Read())
            {
                string locationName = dr["location_name"].ToString();
                locations.Add(locationName);

            }
       
            //dr.Close();
        }
        using (SqlDataReader dr = ProjManagementAdmin.GetAllProjects(out retValue)) //Initialize and retrieve code for Datareader goes here
        {

            while (dr.Read())
            {
               
                string projectName = dr["project_name"].ToString();
                    projects.Add(projectName);

            }

            //dr.Close();
        }
        using (SqlDataReader dr = ProjManagementAdmin.GetReportProjectsFunds(out retValue)) //Initialize and retrieve code for Datareader goes here
        {

            while (dr.Read())
            {
                    ReportData d = new ReportData();
                    d.LocationName = dr["location_name"].ToString();
                    d.ProjectName = dr["project_name"].ToString();
                    d.FundAmount = Convert.ToInt32(dr["amount"]);
                    data.Add(d);                 

            }
           
        }
            result.series = new List<BarGraphSeriesInfo>();
            foreach (string l in locations)
            {
                               
                
                BarGraphSeriesInfo b = new BarGraphSeriesInfo();
                b.data = new List<int>();
                b.name = l;
                foreach (string p in projects)
                {
                    bool flag = false;
                                        
                    for(int i =0;i<data.Count;i++)
                    {
                        if(data[i].ProjectName.Equals(p)&& data[i].LocationName.Equals(l))
                        {
                            b.data.Add(data[i].FundAmount);
                            flag = true;                           
                        }
                    }
                    if(flag==false)
                    {
                        b.data.Add(0);
                    }

                    }
                result.series.Add(b);
                }
            result.categories = projects;
            return result;
            }
        
}
}