using ProjectManagement.BL;
using ProjectManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectManagement.API
{
    public class ProjectsFundsAtLocationReportController : ApiController
    {
        public HighChartsBarGraphInfo Get()
        {

           

            HighChartsBarGraphInfo ListOfData = new HighChartsBarGraphInfo();
            ListOfData = ReportBl.GetReportProjectFundsAtLocation();
            return ListOfData;
        }
    }
}
