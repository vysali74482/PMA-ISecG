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
        [HttpGet]
        public JsonResult<IEnumerable<ProjectLocationInfo>> FetchProjectsAtLocation(int id)
        {

            ProjectLocationInfo[] ListOfProjects = ProjectLocationBl.GetProjectsAtLocation(id);

            var proj = from c in ListOfProjects
                       select c;
            return Json(proj);

        }
        [HttpGet]
        public JsonResult<IEnumerable<ProjectInfo>> FetchInactiveProjectsAtLocation(int id)
        {

            ProjectInfo[] ListOfProjects = ProjectLocationBl.GetInactiveProjectsAtLocation(id);

            var proj = from c in ListOfProjects
                       select c;
            return Json(proj);

        }

        [HttpGet]
        public JsonResult<IEnumerable<ProjectInfo>> FetchActiveProjectsAtLocation(int id)
        {

            ProjectInfo[] ListOfProjects = ProjectLocationBl.GetActiveProjectsAtLocation(id);

            var proj = from c in ListOfProjects
                       select c;
            return Json(proj);

        }
        [HttpDelete]
        public HttpResponseMessage DisableProjectAtLocation(int id, bool isOpen)
        {
            return ProjectLocationBl.SoftDeleteProjectAtLocation(id, isOpen);
        }

        public HttpResponseMessage Post(ProjectLocationInfo ProjLoc)
        {
            return ProjectLocationBl.AddProjectToLocation(ProjLoc);            
        }
    }
}
