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
    public class SelectedLocationController : ApiController
    {
        public LocationInfo Get(int id)
        {


            LocationInfo loc = new LocationInfo();
            loc = LocationBl.GetLocationById(id);
            return loc;
        }

        public HttpResponseMessage Post(LocationInfo location)
        {

            return LocationBl.UpdateLocation(location);

        }

        public HttpResponseMessage Delete(int id, bool isOpen)
        {

            return ProjectBl.SoftDeleteProject(id, isOpen);

        }
    }
}
