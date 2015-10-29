using ProjectManagement.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.SPHelper
{
    public class ProjManagementAdmin
    {
        private static readonly string PROJMGMT_CONN_STRING;

        #region Stored Procedure Constants
        private const string PROC_GETALLPROJECTS = "dbo.GetAllProjects";
        private const string PROC_GETALLLOCATIONS = "dbo.GetAllLocations";
        private const string PROC_GETALLUSERS = "dbo.GetAllUsers";
        private const string PROC_GETALLPROJECTLEADS = "dbo.GetAllProjectLeads";
        private const string PROC_GETALLFUNDS = "dbo.GetAllFunds";

        private const string PROC_ADDNEWPROJECT = "dbo.AddNewProject";
        private const string PROC_GETPROJECTBYID = "dbo.GetProjectById";
        private const string PROC_SOFTDELETEPROJECT = "dbo.SoftDeleteProject";
        private const string PROC_UPDATEPROJECT = "dbo.UpdateProject";

        private const string PROC_ADDNEWLOCATION = "dbo.AddNewLocation";
        private const string PROC_GETLOCATIONBYID = "dbo.GetLocationById";
        private const string PROC_SOFTDELETELOCATION = "dbo.SoftDeleteLocation";
        private const string PROC_UPDATELOCATION = "dbo.UpdateLocation";

        #endregion

        #region SqlParameter Constants
        private const string PARAM_RETURN = "@return";

        private const string PARAM_CHANGEDBY = "@changed_by";
        private const string PARAM_PROJECT_CREATEDDATE = "@changed_by";
        private const string PARAM_PROJECT_CHANGEDDATE = "@changed_date";
        private const string PARAM_PROJECT_IS_ACTIVE = "@is_active";

        private const string PARAM_PROJECT_ID = "@project_id";
        private const string PARAM_PROJECT_NAME = "@project_name";
        private const string PARAM_PROJECT_CODE = "@project_code";
        private const string PARAM_PROJECT_LEAD_NAME = "@project_lead_name";
        private const string PARAM_PROJECT_LEAD_ID = "@project_lead_id";

        private const string PARAM_LOCATION_ID = "@location_id";
        private const string PARAM_LOCATION_NAME = "@location_name";
        private const string PARAM_LOCATION_CHANGEDBY_ID = "@changed_by";
        private const string PARAM_LOCATION_CHANGEDBY_NAME = "@changed_by";
        private const string PARAM_LOCATION_CREATEDDATE = "@created_date";
        private const string PARAM_LOCATION_CHANGEDDATE = "@changed_date";
        private const string PARAM_LOCATION_IS_ACTIVE = "@is_active";

        private const string PARAM_USER_CHANGEDBY = "@changed_by";
        private const string PARAM_USER_CREATEDDATE = "@created_by";
        private const string PARAM_USER_CHANGEDDATE = "@changed_date";
        private const string PARAM_USER_NAME = "@user_name";
        private const string PARAM_USER_ID = "@user_id";
        private const string PARAM_USER_EMAIL = "@user_email";
        private const string PARAM_ROLE_ID = "@role_id";
        private const string PARAM_PASSWORD = "@password";
        private const string PARAM_FIRST_NAME = "@first_name";
        private const string PARAM_LAST_NAME = "@last_name";
        private const string PARAM_USER_IS_ACTIVE = "@is_active";
        //private const string PARAM_IS_ACTIVE = "@is_active";
        //private const string PARAM_CREATEDDATE = "@created_date";

        private const string PARAM_FUND_CHANGEDBY = "@changed_by";
        private const string PARAM_FUND_RECEIVEDDATE = "@received_date";
        private const string PARAM_FUND_CHANGEDDATE = "@changed_date";
        private const string PARAM_FUND_DESC = "@fund_desc";
        private const string PARAM_FUND_ID = "@fund_id";
        private const string PARAM_FUND_AMOUNT = "@fund_amount";
        private const string PARAM_FUND_IS_ACTIVE = "@is_active";
     

        #endregion

        public static SqlDataReader GetAllProjects(out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetGetAllProjectsParams();
            dr = ExecuteReader(PROC_GETALLPROJECTS, parms, out retValue);

            return dr;
        }

        private static SqlParameter[] GetGetAllProjectsParams()
        {
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_GETALLPROJECTS);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)

                            };

                sqlParms[0].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_GETALLPROJECTS, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = -1;
            return sqlParms;
        }

        public static SqlDataReader GetAllLocations(out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetAllLocationsParams();
            dr = ExecuteReader(PROC_GETALLLOCATIONS, parms, out retValue);

            return dr;
        }

        private static SqlParameter[] GetAllLocationsParams()
        {
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_GETALLLOCATIONS);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)

                            };

                sqlParms[0].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_GETALLLOCATIONS, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = -1;
            return sqlParms;
        }

        #region AddNewProject
        public static int AddNewProject(ProjectInfo project, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetAddProjectParams(project);
            return ExecuteNonQuery(PROC_ADDNEWPROJECT, parms, out retValue);
        }

        private static SqlParameter[] GetAddProjectParams(ProjectInfo project)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_ADDNEWPROJECT);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int),
                                new SqlParameter(PARAM_PROJECT_NAME, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_PROJECT_CODE, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_PROJECT_LEAD_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_CHANGEDBY, SqlDbType.NVarChar, 50)

                            };

                sqlParms[0].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_ADDNEWPROJECT, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = -1;
            sqlParms[1].Value = project.ProjectName;
            sqlParms[2].Value = project.ProjectCode;
            sqlParms[3].Value = project.ProjectLeadId;
            sqlParms[4].Value = "vysali";

            return sqlParms;
        }
        #endregion

        #region GetProjectById
        public static SqlDataReader GetProjectById(int projectId, out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetProjectByIdParams(projectId);
            dr = ExecuteReader(PROC_GETPROJECTBYID, parms, out retValue);

            return dr;
        }

        private static SqlParameter[] GetProjectByIdParams(int projectId)
        {
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_GETPROJECTBYID);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_PROJECT_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[1].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_GETPROJECTBYID, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = projectId;
            sqlParms[1].Value = -1;
            return sqlParms;
        }
        #endregion

        #region SoftDeleteProject

        public static int SoftDeleteProject(int projectId, bool isOpen, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetSoftDeleteProjectParams(projectId, isOpen);
            return ExecuteNonQuery(PROC_SOFTDELETEPROJECT, parms, out retValue);
        }

        private static SqlParameter[] GetSoftDeleteProjectParams(int projectId, bool isOpen)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_SOFTDELETEPROJECT);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_PROJECT_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_PROJECT_IS_ACTIVE,SqlDbType.Bit),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[2].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_SOFTDELETEPROJECT, sqlParms);
            }

            //Assigning values to parameter

            sqlParms[0].Value = projectId;
            sqlParms[1].Value = Convert.ToByte(isOpen);
            sqlParms[2].Value = -1;
            return sqlParms;
        }
        #endregion

        #region UpdateProject

        public static int UpdateProject(ProjectInfo project, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetUpdateProjectParams(project);
            return ExecuteNonQuery(PROC_UPDATEPROJECT, parms, out retValue);
        }

        private static SqlParameter[] GetUpdateProjectParams(ProjectInfo project)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_UPDATEPROJECT);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_PROJECT_ID,SqlDbType.Int),
                                new SqlParameter(PARAM_PROJECT_NAME, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_PROJECT_CODE, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_PROJECT_LEAD_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_CHANGEDBY, SqlDbType.Int),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)

                            };

                sqlParms[5].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_UPDATEPROJECT, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = project.ProjectId;
            sqlParms[1].Value = project.ProjectName;
            sqlParms[2].Value = project.ProjectCode;
            sqlParms[3].Value = project.ProjectLeadId;
            //sqlParms[4].Value = project.ChangedById;
            sqlParms[4].Value = 1;
            sqlParms[5].Value = -1;
            return sqlParms;
        }
        #endregion

        #region Authentication
        public static SqlDataReader AuthenticateUser(string userName, string password, out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_AUTHENTICATEUSER);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_USER_NAME, SqlDbType.VarChar),
                                new SqlParameter(PARAM_PASSWORD, SqlDbType.VarChar),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[2].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_AUTHENTICATEUSER, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = userName;
            sqlParms[1].Value = password;
            sqlParms[2].Value = -1;

            dr = ExecuteReader(PROC_AUTHENTICATEUSER, sqlParms, out retValue);

            return dr;
        }

        public static int RegisterAccount(AccountInfo account, out int retValue)
        {
            retValue = -1;
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_REGISTERUSER);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_USER_NAME, SqlDbType.VarChar),
                                new SqlParameter(PARAM_PASSWORD, SqlDbType.VarChar),
                                 new SqlParameter(PARAM_FIRST_NAME, SqlDbType.VarChar),
                                  new SqlParameter(PARAM_LAST_NAME, SqlDbType.VarChar),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[4].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_REGISTERUSER, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = account.UserName;
            sqlParms[1].Value = account.Password;
            sqlParms[2].Value = account.FirstName;
            sqlParms[3].Value = account.LastName;
            sqlParms[4].Value = -1;
            return ExecuteNonQuery(PROC_REGISTERUSER, sqlParms, out retValue);
        }
        #endregion

        static ProjManagementAdmin()
        {
            PROJMGMT_CONN_STRING = ConfigurationManager.ConnectionStrings["ProjectManagementConnectionString"].ConnectionString;
        }

        #region SQL Methods

        private static void ThrowIfNullParams(string spName, SqlParameter[] parms)
        {
            if (parms == null)
                throw new ArgumentException("Couldn't build the parameters for procedure:" + spName);
        }
        private static SqlDataReader ExecuteReader(string spName, SqlParameter[] parms, out int retValue)
        {
            ThrowIfNullParams(spName, parms);
            retValue = -1;
            return SQLHelper.ExecuteReader(PROJMGMT_CONN_STRING, CommandType.StoredProcedure, spName, out retValue, parms);
        }

        private static int ExecuteNonQuery(string spName, SqlParameter[] parms, out int retValue)
        {
            ThrowIfNullParams(spName, parms);
            retValue = -1;
            return SQLHelper.ExecuteNonQuery(PROJMGMT_CONN_STRING, CommandType.StoredProcedure, spName, out retValue, parms);
        }
        #endregion

        public static SqlDataReader GetAllUsers(out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetAllUsersParams();
            dr = ExecuteReader(PROC_GETALLUSERS, parms, out retValue);

            return dr;
        }

        public static SqlDataReader GetAllProjectLeads(out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetAllUsersParams();
            dr = ExecuteReader(PROC_GETALLPROJECTLEADS, parms, out retValue);

            return dr;
        }

        private static SqlParameter[] GetAllUsersParams()
        {
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_GETALLUSERS);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)

                            };

                sqlParms[0].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_GETALLUSERS, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = -1;
            return sqlParms;
        }

        public static SqlDataReader GetAllFunds(out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetAllFundsParams();
            dr = ExecuteReader(PROC_GETALLFUNDS, parms, out retValue);

            return dr;
        }

        private static SqlParameter[] GetAllFundsParams()
        {
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_GETALLFUNDS);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)

                            };

                sqlParms[0].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_GETALLFUNDS, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = -1;
            return sqlParms;
        }

        private const string PROC_GETUSERBYID = "dbo.GetUserById";
        private const string PROC_ADDNEWUSER = "dbo.AddNewUser";
        private const string PROC_SOFTDELETEUSER = "dbo.SoftDeleteUser";
        private const string PROC_UPDATEUSER = "dbo.UpdateUser";

        private const string PROC_GETFUNDBYID = "dbo.GetFundById";
        private const string PROC_ADDNEWFUND = "dbo.AddNewFund";
        private const string PROC_SOFTDELETEFUND = "dbo.SoftDeleteFund";
        private const string PROC_UPDATEFUND = "dbo.UpdateFund";

        private const string PROC_AUTHENTICATEUSER = "dbo.AuthenticateUser";
        private const string PROC_REGISTERUSER = "dbo.RegisterUser";

        #region GetUserById
        public static SqlDataReader GetUserById(int userId, out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetUserByIdParams(userId);
            dr = ExecuteReader(PROC_GETUSERBYID, parms, out retValue);

            return dr;
        }

        private static SqlParameter[] GetUserByIdParams(int userId)
        {
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_GETUSERBYID);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_USER_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[1].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_GETUSERBYID, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = userId;
            sqlParms[1].Value = -1;
            return sqlParms;
        }
        #endregion
        #region GetFundById
        public static SqlDataReader GetFundById(int fundId, out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetFundByIdParams(fundId);
            dr = ExecuteReader(PROC_GETFUNDBYID, parms, out retValue);

            return dr;
        }

        private static SqlParameter[] GetFundByIdParams(int fundId)
        {
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_GETFUNDBYID);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_FUND_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[1].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_GETFUNDBYID, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = fundId;
            sqlParms[1].Value = -1;
            return sqlParms;
        }
        #endregion

        #region AddNewUser
        public static int AddNewUser(UserInfo user, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetAddUserParams(user);
            return ExecuteNonQuery(PROC_ADDNEWUSER, parms, out retValue);
        }

        private static SqlParameter[] GetAddUserParams(UserInfo user)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_ADDNEWUSER);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int),
                                new SqlParameter(PARAM_USER_NAME, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_USER_EMAIL, SqlDbType.NVarChar, 100),
                               new SqlParameter(PARAM_CHANGEDBY, SqlDbType.NVarChar, 100)

                            };

                sqlParms[0].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_ADDNEWUSER, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = -1;
            sqlParms[1].Value = user.UserName;
            sqlParms[2].Value = user.UserEmail;
            sqlParms[3].Value = "sanyam";

            return sqlParms;
        }
        #endregion

        #region AddNewFund
        public static int AddNewFund(FundInfo fund, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetAddFundParams(fund);
            return ExecuteNonQuery(PROC_ADDNEWFUND, parms, out retValue);
        }

        private static SqlParameter[] GetAddFundParams(FundInfo fund)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_ADDNEWFUND);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int),
                                new SqlParameter(PARAM_FUND_DESC, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_FUND_AMOUNT, SqlDbType.Float),
                              new SqlParameter(PARAM_CHANGEDBY, SqlDbType.NVarChar, 50)

                            };

                sqlParms[0].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_ADDNEWFUND, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = -1;
            sqlParms[1].Value = fund.FundDesc;
            sqlParms[2].Value = fund.FundAmount;
            sqlParms[3].Value = "vysali";

            return sqlParms;
        }
        #endregion

        #region SoftDeleteUser

        public static int SoftDeleteUser(int userId, bool isOpen, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetSoftDeleteUserParams(userId, isOpen);
            return ExecuteNonQuery(PROC_SOFTDELETEUSER, parms, out retValue);
        }

        private static SqlParameter[] GetSoftDeleteUserParams(int userId, bool isOpen)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_SOFTDELETEUSER);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_USER_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_USER_IS_ACTIVE,SqlDbType.Bit),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[2].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_SOFTDELETEUSER, sqlParms);
            }

            //Assigning values to parameter

            sqlParms[0].Value = userId;
            sqlParms[1].Value = Convert.ToByte(isOpen);
            sqlParms[2].Value = -1;
            return sqlParms;
        }
        #endregion

        #region SoftDeleteFund

        public static int SoftDeleteFund(int fundId, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetSoftDeleteFundParams(fundId);
            return ExecuteNonQuery(PROC_SOFTDELETEFUND, parms, out retValue);
        }

        private static SqlParameter[] GetSoftDeleteFundParams(int fundId)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_SOFTDELETEFUND);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_FUND_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[1].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_SOFTDELETEFUND, sqlParms);
            }

            //Assigning values to parameter

            sqlParms[0].Value = fundId;
            sqlParms[1].Value = -1;
            return sqlParms;
        }
        #endregion

        #region UpdateUsers

        public static int UpdateUser(UserInfo user, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetUpdateUserParams(user);
            return ExecuteNonQuery(PROC_UPDATEUSER, parms, out retValue);
        }

        private static SqlParameter[] GetUpdateUserParams(UserInfo user)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_UPDATEUSER);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_USER_ID,SqlDbType.Int),
                                new SqlParameter(PARAM_USER_NAME, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_USER_EMAIL, SqlDbType.NVarChar, 100),
                                //new SqlParameter(PARAM_CHANGEDBY, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)

                            };

                sqlParms[3].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_UPDATEUSER, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = user.UserId;
            sqlParms[1].Value = user.UserName;
            sqlParms[2].Value = user.UserEmail;
            //sqlParms[4].Value = "sanyam";
            sqlParms[3].Value = -1;
            return sqlParms;
        }
        #endregion

        #region UpdateFunds

        public static int UpdateFund(FundInfo fund, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetUpdateFundParams(fund);
            return ExecuteNonQuery(PROC_UPDATEFUND, parms, out retValue);
        }

        private static SqlParameter[] GetUpdateFundParams(FundInfo fund)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_UPDATEFUND);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_FUND_ID,SqlDbType.Int),
                                new SqlParameter(PARAM_FUND_DESC, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_FUND_AMOUNT, SqlDbType.Float),
                               // new SqlParameter(PARAM_CHANGEDBY, SqlDbType.Int),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)

                            };

                sqlParms[3].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_UPDATEFUND, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = fund.FundId;
            sqlParms[1].Value = fund.FundDesc;
            sqlParms[2].Value = fund.FundAmount;
            //sqlParms[3].Value = 1;
            sqlParms[3].Value = -1;
            return sqlParms;
        }
        #endregion


        #region AddNewLocation
        public static int AddNewLocation(LocationInfo location, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetAddLocationParams(location);
            return ExecuteNonQuery(PROC_ADDNEWLOCATION, parms, out retValue);
        }

        private static SqlParameter[] GetAddLocationParams(LocationInfo location)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_ADDNEWLOCATION);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int),
                                new SqlParameter(PARAM_LOCATION_NAME, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_LOCATION_CHANGEDBY_ID, SqlDbType.Int, 100)
                            };

                sqlParms[0].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_ADDNEWLOCATION, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = -1;
            sqlParms[1].Value = location.LocationName;
            // sqlParms[2].Value = location.ChangedById;
            sqlParms[2].Value = 1;

            return sqlParms;
        }
        #endregion

        #region GetLocationById
        public static SqlDataReader GetLocationById(int locationId, out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetLocationByIdParams(locationId);
            dr = ExecuteReader(PROC_GETLOCATIONBYID, parms, out retValue);

            return dr;
        }

        private static SqlParameter[] GetLocationByIdParams(int locationId)
        {
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_GETLOCATIONBYID);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_LOCATION_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[1].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_GETLOCATIONBYID, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = locationId;
            sqlParms[1].Value = -1;
            return sqlParms;
        }
        #endregion

        #region SoftDeleteLocation

        public static int SoftDeleteLocation(int locationId, bool isOpen, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetSoftDeleteLocationParams(locationId, isOpen);
            return ExecuteNonQuery(PROC_SOFTDELETELOCATION, parms, out retValue);
        }

        private static SqlParameter[] GetSoftDeleteLocationParams(int locationId, bool isOpen)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_SOFTDELETELOCATION);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_LOCATION_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_LOCATION_IS_ACTIVE,SqlDbType.Bit),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[2].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_SOFTDELETELOCATION, sqlParms);
            }

            //Assigning values to parameter

            sqlParms[0].Value = locationId;
            sqlParms[1].Value = Convert.ToByte(isOpen);
            sqlParms[2].Value = -1;
            return sqlParms;
        }
        #endregion

        #region UpdateLocation

        public static int UpdateLocation(LocationInfo location, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetUpdateLocationParams(location);
            return ExecuteNonQuery(PROC_UPDATELOCATION, parms, out retValue);
        }

        private static SqlParameter[] GetUpdateLocationParams(LocationInfo location)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_UPDATELOCATION);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_LOCATION_ID,SqlDbType.Int),
                                new SqlParameter(PARAM_LOCATION_NAME, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_CHANGEDBY, SqlDbType.NVarChar, 100),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)

                            };

                sqlParms[5].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_UPDATELOCATION, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = location.LocationId;
            sqlParms[1].Value = location.LocationName;
            sqlParms[4].Value = "anjani";
            sqlParms[5].Value = -1;
            return sqlParms;
        }
        #endregion
        #region ProjectLocation
        private const string PROC_GETPROJECTSATLOCATION = "dbo.GetProjectsAtLocation";

        public static SqlDataReader GetProjectsAtLocation(int LocationId, out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetProjectsAtLocationParams(LocationId);
            dr = ExecuteReader(PROC_GETPROJECTSATLOCATION, parms, out retValue);

            return dr;
        }

        private static SqlParameter[] GetProjectsAtLocationParams(int locationId)
        {
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_GETPROJECTSATLOCATION);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_LOCATION_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[1].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_GETPROJECTSATLOCATION, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = locationId;
            sqlParms[1].Value = -1;
            return sqlParms;
        }

        private const string PROC_GETINACTIVEPROJECTSATLOCATION = "dbo.GetInactiveProjectsAtLocation";

        public static SqlDataReader GetInactiveProjectsAtLocation(int LocationId, out int retValue)
        {
            retValue = -1;
            SqlDataReader dr = null;
            SqlParameter[] parms = GetInactiveProjectsAtLocationParams(LocationId);
            dr = ExecuteReader(PROC_GETINACTIVEPROJECTSATLOCATION, parms, out retValue);

            return dr;
        }

        private static SqlParameter[] GetInactiveProjectsAtLocationParams(int locationId)
        {
            SqlParameter[] sqlParms = SQLHelper.GetCachedParameters(PROC_GETINACTIVEPROJECTSATLOCATION);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_LOCATION_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[1].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_GETINACTIVEPROJECTSATLOCATION, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = locationId;
            sqlParms[1].Value = -1;
            return sqlParms;
        }

        private const string PROC_SOFTDELETEPROJECTATLOC = "dbo.DeleteProjectLocation";
        private const string PARAM_PROJECT_LOCATION_ID = "@project_location_id";
        public static int SoftDeleteProjectAtLocation(int ProjectLocationId, bool isOpen, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetSoftDeleteProjectAtLocationParams(ProjectLocationId, isOpen);
            return ExecuteNonQuery(PROC_SOFTDELETEPROJECTATLOC, parms, out retValue);
        }

        private static SqlParameter[] GetSoftDeleteProjectAtLocationParams(int ProjectLocationId, bool isOpen)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_SOFTDELETEPROJECTATLOC);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_PROJECT_LOCATION_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_PROJECT_IS_ACTIVE,SqlDbType.Bit),
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int)
                            };

                sqlParms[2].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_SOFTDELETEPROJECTATLOC, sqlParms);
            }

            //Assigning values to parameter

            sqlParms[0].Value = ProjectLocationId;
            sqlParms[1].Value = Convert.ToByte(isOpen);
            sqlParms[2].Value = -1;
            return sqlParms;
        }

        private const string PROC_ADDPROJECTATLOC = "dbo.AddProjectAtLocation";

        public static int AddProjectAtLocation(ProjectLocationInfo ProjLoc, out int retValue)
        {
            retValue = -1;
            SqlParameter[] parms = GetAddProjectAtLocationParams(ProjLoc);
            return ExecuteNonQuery(PROC_ADDPROJECTATLOC, parms, out retValue);
        }

        private static SqlParameter[] GetAddProjectAtLocationParams(ProjectLocationInfo ProjLoc)
        {
            SqlParameter[] sqlParms = new SqlParameter[100];
            sqlParms = SQLHelper.GetCachedParameters(PROC_ADDPROJECTATLOC);
            if (sqlParms == null)
            {
                sqlParms = new SqlParameter[]
                            {
                                new SqlParameter(PARAM_RETURN, SqlDbType.Int),
                                new SqlParameter(PARAM_PROJECT_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_LOCATION_ID, SqlDbType.Int),
                                new SqlParameter(PARAM_CHANGEDBY, SqlDbType.NVarChar, 50)

                            };

                sqlParms[0].Direction = ParameterDirection.ReturnValue;
                SQLHelper.CacheParameters(PROC_ADDNEWPROJECT, sqlParms);
            }

            //Assigning values to parameter
            sqlParms[0].Value = -1;
            sqlParms[1].Value = ProjLoc.ProjectId;
            sqlParms[2].Value = ProjLoc.LocationId;
            sqlParms[3].Value = "vysali";
            return sqlParms;
        }
        #endregion
    }
}
