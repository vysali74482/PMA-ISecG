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
    public class ProjectReportsController : ApiController
    {
        public IList<PieUtility> Get()
        {
         
            IList<PieUtility> listOfPieUtility = new List<PieUtility>();
            listOfPieUtility = ReportBl.GetReportProjectsFunds();

            return listOfPieUtility;
        }
    }
}
