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
    public class LocationController : ApiController
    {
        // GET api/<controller>
        public JsonResult<IEnumerable<LocationInfo>> Get()
        {

            LocationInfo[] ListOfLocations = LocationBl.GetAllLocations();

            var location = from c in ListOfLocations
                           select c;


            return Json(location);

        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }
        // GET api/<controller>/GetProjectsAtLocation/5
        [HttpGet]
        public JsonResult<IEnumerable<ProjectLocationInfo>> FetchProjectsAtLocation(int locationId)
        {

            ProjectLocationInfo[] ListOfProjects = ProjectLocationBl.GetProjectsAtLocation(locationId);

            var proj = from c in ListOfProjects
                       select c;
            return Json(proj);

        }
        // POST api/<controller>
        public HttpResponseMessage Post(LocationInfo location)
        {
            try
            {
                LocationBl.AddNewLocation(location);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }
    }
}