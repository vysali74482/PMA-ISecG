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
    public class ProjectLocationBl
    {
        public static ProjectLocationInfo[] GetProjectsAtLocation(int id)
        {
            ProjectLocationInfo[] projectLocationInfo = ProjectLocationDal.GetProjectsAtLocation(id);
            return projectLocationInfo;

        }

        public static ProjectInfo[] GetInactiveProjectsAtLocation(int id)
        {
            ProjectInfo[] projectInfo = ProjectLocationDal.GetInactiveProjectsAtLocation(id);
            return projectInfo;

        }

        public static ProjectInfo[] GetActiveProjectsAtLocation(int id)
        {
            ProjectInfo[] projectInfo = ProjectLocationDal.GetActiveProjectsAtLocation(id);
            return projectInfo;

        }
        public static HttpResponseMessage SoftDeleteProjectAtLocation(int  ProjectLocationId, bool isOpen)
        {
            try
            {
                int val = ProjectLocationDal.SoftDeleteProjectAtLocation(ProjectLocationId, isOpen);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION: " + ex);
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }

        public static HttpResponseMessage AddProjectToLocation(ProjectLocationInfo ProjLoc) {
            try
            {
                int val = ProjectLocationDal.AddProjectAtLocation(ProjLoc);
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
