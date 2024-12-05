const initialState = {
    isAuthenticated: false,
    token: '',
    _id: '',
    user_id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    role: '',
    image: '',
    clientAdministrator: [],
    waterPackageList: [],
    AdminIntenetList: [],
    AdminStoreList: [],
    countryList: [],
    campsList: [],
    coordinatorList: [],
    accountantList: [],
    posList: [],
    internetList: [],
    storeList: [],
    currency_code: 'AED',
    POSModal:false,
    CampModal:'',
    RechargeModal:'',
    PosDeviceCode:[]
};

export default function (state = initialState, action) {
    
    switch (action.type) {
        case 'AUTHENTICATE': {
            const data = { isAuthenticated: !!action.payload }
            if (action.payload) {
                data.token = action?.payload?.token ? action?.payload?.token : localStorage.getItem('accessToken')
                data._id = action?.payload?.user_data?._id
                data.user_id = action?.payload?.user_data?.id
                data.firstName = action?.payload?.user_data?.firstName ? action?.payload?.user_data?.firstName : ''
                data.lastName = action?.payload?.user_data?.lastName ? action?.payload?.user_data?.lastName : ''
                data.email = action?.payload?.user_data?.email
                data.fullName = action?.payload?.user_data?.full_name ? action?.payload?.user_data?.full_name : action?.payload?.user_data?.name
                data.image = action?.payload?.profileImage ? action?.payload?.profileImage : ''
                data.role = action?.payload?.user_data?.slug
            }
            return { ...state, ...data, user_data: action?.payload?.user_data };
        }
        case 'CLIENTLIST': {
            return { ...state, clientAdministrator: action?.payload };
        }
        case 'WATERPACKGELIST': {
            return { ...state, waterPackageList: action?.payload };
        }
        case 'STORELIST': {
            return { ...state, AdminStoreList: action?.payload };
        }
        case 'ADMININTENETLIST': {
            return { ...state, AdminIntenetList: action?.payload };
        }
        case 'COUNTRYLIST': {
            return { ...state, countryList: action?.payload };
        }
        case 'CAMPSLIST': {
            return { ...state, campsList: action?.payload };
        }
        case 'COORDINATORLIST': {
            return { ...state, coordinatorList: action?.payload };
        }
        case 'ACCOUNTANTLIST': {
            return { ...state, accountantList: action?.payload };
        }
        case 'POSLIST': {
            return { ...state, posList: action?.payload };
        }
        case 'INTERNETLIST': {
            return { ...state, internetList: action?.payload };
        }
        case 'ASSIGNPOS': {
            return { ...state, POSModal: action?.payload };
        }
        case 'ASSIGNCAMP': {
            return { ...state, CampModal: action?.payload };
        }
        case 'SEARCHUSER': {
            return { ...state, RechargeModal: action?.payload };
        }
        case 'POSDEVICECODE': {
            return { ...state, PosDeviceCode: action?.payload };
        }
        default:
            return state;
    }

}