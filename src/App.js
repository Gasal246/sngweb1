import React, { Fragment } from "react";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminMealPackage from "./components/KitchenManager/AdminMealPackage";
import AdminWater from "./components/AdminWater/AdminWater";
import Loader from "./components/common/Loader";


const Layout = React.lazy(() => import("./components/Layout")); //Layout

const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard")); //Dashboard

const ClientAdministrator = React.lazy(() => import("./components/Client-Administrator/Client-Administrator")); // Client Administrator

const AdminCoordinator = React.lazy(() => import("./components/Coordinator/AdminCoordinator/AdminCoordinator")); // Admin Administrator

const ClientCoordinator = React.lazy(() => import("./components/Coordinator/ClientCoordinator/ClientCoordinator")); // Client Coordinator

const AdminAccountant = React.lazy(() => import("./components/Accountant/AdminAccountant/AdminAccountant")); // Admin Accountant

const ClientAccountant = React.lazy(() => import("./components/Accountant/ClientAccountant/ClientAccountant")); // Client Accountant

const AdminInvestors = React.lazy(() => import("./components/Investors/AdminInvestors/AdminInvestors")); // Admin Investors
const ClientInvestors = React.lazy(() => import("./components/Investors/ClientInvestors/ClientInvestors")); // Client Investors
const POS = React.lazy(() => import("./components/POS/POS")); // POS
const Camps = React.lazy(() => import("./components/Camps/Camps")); // camps
const Country = React.lazy(() => import("./components/Country/Country"));  //Country
const Posdevicecode = React.lazy(() => import("./components/POS-devicecode/POS-devicecode")); //PosDevicecode
const AdminInternet = React.lazy(() => import("./components/Internet/AdminInternet/AdminInternet"));  //AdminInternet
const ClientInternet = React.lazy(() => import("./components/Internet/ClientInternet/ClientInternet"));  //ClientInternet
const PosClientDeviceCode = React.lazy(() => import("./components/POS-client-devicecode/POS-client-devicecode"));
const AttachDeviceToPOS = React.lazy(() => import("./components/POS-client-devicecode/AttachDeviceToPOS/Attach-device-to-POS"));
const CoordiantorInternet = React.lazy(() => import("./components/Internet/CoordiantorInternet/CoordiantorInternet")); //CoordiantorInternet
const PosCamp = React.lazy(() => import("./components/POS-Camps/Camp"))
const PosFindUser = React.lazy(() => import("./components/POS-Find-User/FindUser"))
const PosOrderInternetPackage = React.lazy(() => import("./components/POS-Order-internet-package/OrderInternetPackage"))
const PosReport = React.lazy(() => import("./components/POS-Report/Report"))
const NationalType = React.lazy(() => import("./components/NationalType/Nationaltype"))
const ClientReport = React.lazy(() => import("./components/reports-client/ClientReports/ClientReport"))
const AccountantReport = React.lazy(() => import("./components/reports-client/AccountantReport/AccountantReport"))
const CordinatorReport = React.lazy(() => import("./components/reports-client/coordinatorReport/coordinatorReports"))
const Camplist = React.lazy(() => import("./components/Client-Camp-Management/Camp-Lists/Camplist"))
const AttchManagement = React.lazy(() => import("./components/Client-Camp-Management/Attach-Management/AttachManagement"))
const AttchedList = React.lazy(() => import("./components/Client-Camp-Management/Attached-List/AttachedList"))
const CampUserList = React.lazy(() => import("./components/Client-Camp-Management/Camp-User-List/CampUserList"))

//kitchen-manager
const KitchenManager = React.lazy(() => import("./components/KitchenManager/Manager/KitchenManager"));  //KitchenManager
const MealItem = React.lazy(() => import("./components/KitchenManager/MealItem/MealItem"));  //MealItem
const MealCategory = React.lazy(() => import("./components/KitchenManager/MealCategory/MealCategory"));  //MealItem
const MealPackage = React.lazy(() => import("./components/KitchenManager/MealPackage/MealPackage"));  //MealPackage
const Mealcombo = React.lazy(() => import("./components/KitchenManager/Mealcombo"));  //Mealcombo

//Store-manager
const StoreManager = React.lazy(() => import("./components/StoreManager/StoreManager"));  //StoreManager
const StoreMealAssigned = React.lazy(() => import("./components/StoreManager/StoreMealAssigned"));  //StoreMealAssigned
const StoreWaterAssigned = React.lazy(() => import("./components/StoreManager/StoreWaterAssigned"));  //StoreWaterAssigned

//plant-manager
const PlantManger = React.lazy(() => import("./components/PlantManger/PlantManger"));  //PlantManger

//water-package
const ClientWaterAssign = React.lazy(() => import("./components/Internet/ClientWaterAssign"));  //ClientWaterAssign


//Widgets
const Widgets = React.lazy(() => import("./components/Widgets/Widgets"));

//pages
const Profile = React.lazy(() => import("./components/pages/Profile/Profile"));
const EditProfile = React.lazy(() => import("./components/pages/EditProfile/EditProfile"));
const AboutCompany = React.lazy(() => import("./components/pages/AboutCompany/AboutCompany"));
const FAQS = React.lazy(() => import("./components/pages/FAQS/FAQS"));
const Terms = React.lazy(() => import("./components/pages/Terms/Terms"));
const UnderConstruction = React.lazy(() => import("./components/pages/UnderConstruction/UnderConstruction"));

//custom Pages
const Login = React.lazy(() => import("./components/CustomPages/Login/Login"));
const ForgotPassword = React.lazy(() => import("./components/CustomPages/ForgotPassword/ForgotPassword"));

//Errorpages
const Errorpage400 = React.lazy(() => import("./components/ErrorPages/ErrorPages/400/400"));
const Errorpage401 = React.lazy(() => import("./components/ErrorPages/ErrorPages/401/401"));
const Errorpage403 = React.lazy(() => import("./components/ErrorPages/ErrorPages/403/403"));
const Errorpage500 = React.lazy(() => import("./components/ErrorPages/ErrorPages/500/500"));
const Errorpage503 = React.lazy(() => import("./components/ErrorPages/ErrorPages/503/503"));

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path={`/`} element={<PrivateRoute><Layout /></PrivateRoute>} >
              <Route index element={<Dashboard />} />
              <Route exact path={`/dashboard`} element={<Dashboard />} />
              <Route exact path={`/client-administrator`} element={<ClientAdministrator />} />
              <Route exact path={'/client-pos-device-code'} element={<PosClientDeviceCode />} />
              <Route exact path={'/client-attach-device-pos'} element={<AttachDeviceToPOS />} />
              <Route exact path={`/admin-coordinator`} element={<AdminCoordinator />} />
              <Route exact path={`/client-coordinator`} element={<ClientCoordinator />} />
              <Route exact path={`/pos`} element={<POS />} />
              <Route exact path={`/camps`} element={<Camps />} />
              <Route exact path={`/admin-accountant`} element={<AdminAccountant />} />
              <Route exact path={`/client-accountant`} element={<ClientAccountant />} />
              <Route exact path={`/admin-investors`} element={<AdminInvestors />} />
              <Route exact path={`/Client-investors`} element={<ClientInvestors />} />
              <Route exact path={`/country`} element={<Country />} />
              <Route exact path={`/pos-device-code`} element={<Posdevicecode />} />
              <Route exact path={`/admin-internet-package`} element={<AdminInternet />} />
              <Route exact path={`/client-internet-package`} element={<ClientInternet />} />
              <Route exact path={`/client-water-package`} element={<ClientWaterAssign />} />
              <Route exact path={`/coordinator-internet-package`} element={<CoordiantorInternet />} />
              <Route exact path={`/admin-store-manger`} element={<StoreManager />} />
              <Route exact path={`/store-meal-package`} element={<StoreMealAssigned />} />
              <Route exact path={`/store-water-package`} element={<StoreWaterAssigned />} />
              <Route exact path={`/pos-camp`} element={<PosCamp />} />
              <Route exact path={`/pos-find-user`} element={<PosFindUser />} />
              <Route exact path={`/pos-order-internet-package`} element={<PosOrderInternetPackage />} />
              <Route exact path={`/pos-report`} element={<PosReport />} />
              <Route exact path={`/national-type`} element={<NationalType />} />
              <Route exact path={`/client-report`} element={<ClientReport />} />
              <Route exact path={`/accountant-report`} element={<AccountantReport />} />
              <Route exact path={`/coordinator-report`} element={<CordinatorReport />} />
              <Route exact path={`/camp-list`} element={<Camplist />} />
              <Route exact path={`/attach-management`} element={<AttchManagement />} />
              <Route exact path={`/attached-list`} element={<AttchedList />} />
              <Route exact path={`/camp-user-list`} element={<CampUserList />} />
              {/* water manager routes */}
              <Route exact path={`/admin-water-manger`} element={<AdminWater />} />
              {/* kicthen manager routes */}
              <Route exact path={`/admin-kitchen-manger`} element={<KitchenManager />} />
              <Route exact path={`/admin-kitchen-manger/:id/package`} element={<AdminMealPackage />} />
              <Route exact path={`/meal-item`} element={<MealItem />} />
              <Route exact path={`/meal-category`} element={<MealCategory />} />
              <Route exact path={`/meal-package`} element={<MealPackage />} />
              <Route exact path={`/meal-package/:id/comboitem`} element={<Mealcombo />} />
              {/* plant-manager routes */}
              <Route exact path={`/admin-plant-manger`} element={<PlantManger />} />
              {/* profile route */}
              <Route exact path={`/profile`} element={<Profile />} />
              <Route exact path={`/editProfile`} element={<EditProfile />} />
              <Route exact path={`/pages/aboutCompany`} element={<AboutCompany />} />
              <Route exact path={`/pages/faqs`} element={<FAQS />} />
              <Route exact path={`/pages/terms`} element={<Terms />} />
              <Route exact path={`/widgets`} element={<Widgets />} />
            </Route>
            {/* login routes */}
            <Route exact path={`/pages/underConstruction`} element={<UnderConstruction />} />
            <Route exact path={`/login/super-admin`} element={<Login />} />
            <Route exact path={`/login/administrator`} element={<Login />} />
            <Route exact path={`/login/coordinator`} element={<Login />} />
            <Route exact path={`/login/investor`} element={<Login />} />
            <Route exact path={`/login/accountant`} element={<Login />} />
            <Route exact path={`/login/pos`} element={<Login />} />
            <Route exact path={`/login/kitchen-manager`} element={<Login />} />
            <Route exact path={`/login/store-manager`} element={<Login />} />
            <Route exact path={`/login/plant-manager`} element={<Login />} />
            <Route exact path={`/forgotPassword`} element={<ForgotPassword />} />
            <Route exact path={`/errorpages/errorpage401`} element={<Errorpage401 />} />
            <Route exact path={`/errorpages/errorpage403`} element={<Errorpage403 />} />
            <Route exact path={`/errorpages/errorpage500`} element={<Errorpage500 />} />
            <Route exact path={`/errorpages/errorpage503`} element={<Errorpage503 />} />
            <Route exact path="*" element={<Errorpage400 />} />
          </Routes>
        </React.Suspense>
        <ToastContainer />
      </BrowserRouter>
    </Fragment >
  );
};

export default App;
