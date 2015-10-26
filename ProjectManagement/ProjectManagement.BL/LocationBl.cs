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
    public class LocationBl
    {
        public static LocationInfo[] GetAllLocations()
        {
            LocationInfo[] locationInfo = LocationDal.GetAllLocations();
            return locationInfo;

        }
        public static int AddNewLocation(LocationInfo location)
        {
            return LocationDal.AddNewLocation(location);
        }
        public static LocationInfo GetLocationById(int LocationId)
        {
            return LocationDal.GetLocationById(LocationId);
        }

        public static HttpResponseMessage SoftDeleteLocation(int locationId, bool isOpen)
        {
            try
            {
                int val = LocationDal.SoftDeleteLocation(locationId, isOpen);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION: " + ex);
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }
        public static HttpResponseMessage UpdateLocation(LocationInfo location)
        {
            try
            {
                int val = LocationDal.UpdateLocation(location);
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