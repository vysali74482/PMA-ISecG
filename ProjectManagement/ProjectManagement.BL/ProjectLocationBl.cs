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
        public static ProjectLocationInfo[] GetProjectsAtLocation(int LocationId)
        {
            ProjectLocationInfo[] projectLocationInfo = ProjectLocationDal.GetProjectsAtLocation(LocationId);
            return projectLocationInfo;

        }

        /*public static int AddNewProjectAtLocation(ProjectInfo project,int LocationId)
        {
            return ProjectLocationDal.AddNewProjectAtLocation(project,LocationId);
        }

        public static HttpResponseMessage SoftDeleteProjectAtLocation(int ProjectLocationId, bool isOpen)
        {
            try
            {
                int val = ProjectLocationDal.SoftDeleteProject(ProjectLocationId, isOpen);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION: " + ex);
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }*/
        
    }
}
