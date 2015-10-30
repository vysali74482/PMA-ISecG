using ProjectManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagement.DAL;

namespace ProjectManagement.BL
{
    public class ReportBl
    {
        public static IList<PieUtility> GetReportProjectsFunds()
        {

            IList<PieUtility> listOfPieUtility = new List<PieUtility>();

            
            listOfPieUtility = ReportDal.GetReportProjectsFunds();
            return listOfPieUtility;
        }

        public static HighChartsBarGraphInfo GetReportProjectFundsAtLocation()//crosstab for grade mix
        {

            HighChartsBarGraphInfo data = new HighChartsBarGraphInfo();

            data = ReportDal.GetReportProjectFundsAtLocation();
            return data;
        }

    }
}
