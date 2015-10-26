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
    public class ProjAtLocController : ApiController
    {
        public JsonResult<IEnumerable<ProjectLocationInfo>> Get(int id)
        {

            ProjectLocationInfo[] ListOfProjects = ProjectLocationBl.GetProjectsAtLocation(id);

            var proj = from c in ListOfProjects
                       select c;
            return Json(proj);

        }
    }
}
