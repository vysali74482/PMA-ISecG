using ProjectManagement.Model;
using ProjectManagement.SPHelper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.DAL
{
    public class LocationDal
    {
        public static LocationInfo[] GetAllLocations()
        {
            ArrayList al = new ArrayList();

            int retValue = -1;


            //Generated Code for query : dbo.GetAllVendors
            using (SqlDataReader dr = ProjManagementAdmin.GetAllLocations(out retValue)) //Initialize and retrieve code for Datareader goes here
            {

                while (dr.Read())
                {
                    LocationInfo location = new LocationInfo();
                    location.LocationId = Convert.ToInt32(dr["location_id"]);
                    location.LocationName = dr["location_name"].ToString();
                    location.CreatedDate = Convert.ToDateTime(dr["created_date"]);
                    location.ChangedDate = Convert.ToDateTime(dr["changed_date"]);
                    location.ChangedByName = dr["changed_by"].ToString();
                    al.Add(location);
                }
                //dr.Close();
            }

            LocationInfo[] allInfo = new LocationInfo[al.Count];
            al.CopyTo(allInfo);
            return allInfo;
        }

        public static LocationInfo GetLocationById(int locationId)
        {
            int retValue = -1;
            LocationInfo location = new LocationInfo();
            //Generated Code for query : dbo.GetAllVendors
            using (SqlDataReader dr = ProjManagementAdmin.GetLocationById(locationId, out retValue)) //Initialize and retrieve code for Datareader goes here
            {
                while (dr.Read())
                {
                    location.LocationId = Convert.ToInt32(dr["location_id"]);
                    location.LocationName = dr["location_name"].ToString();
                    location.IsActive = Convert.ToBoolean(dr["is_active"]);
                    location.CreatedDate = Convert.ToDateTime(dr["created_date"]);
                    location.ChangedDate = Convert.ToDateTime(dr["changed_date"]);
                    location.ChangedByName = dr["changed_by"].ToString();
                }
                //dr.Close();
            }

            return location;
        }

        public static int SoftDeleteLocation(int locationId, bool isOpen)
        {
            int retValue = -1;
            return ProjManagementAdmin.SoftDeleteLocation(locationId, isOpen, out retValue);
        }

        public static int UpdateLocation(LocationInfo location)
        {
            int retValue = -1;
            return ProjManagementAdmin.UpdateLocation(location, out retValue);
        }

        public static int AddNewLocation(LocationInfo location)
        {
            if (location == null)
                throw new ArgumentNullException("Location is missing");


            int retValue = -1;
            return ProjManagementAdmin.AddNewLocation(location, out retValue);
        }
    }
}
