const inputFiledArray = [
    {
        "row_label": "Business Information",
        "rows": [
            {
                "name": "full_name",
                "id": "full_name",
                "label": "Full name",
                "type": "text",
                "placeholder": "Enter full name",
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "business_name",
                "id": "business_name",
                "label": "Business name",
                "type": "text",
                "placeholder": "Enter business name",
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "business_address",
                "id": "business_address",
                "label": "Business address",
                "type": "textarea",
                "placeholder": "Enter business address",
                "class": "col-lg-12 col-md-12 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "email",
                "id": "email",
                "label": "Email address",
                "type": "email",
                "placeholder": "Enter email address",
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "phone",
                "id": "phone",
                "label": "Phone",
                "type": "text",
                "placeholder": "Enter phone",
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "city",
                "id": "city",
                "label": "City",
                "type": "text",
                "placeholder": "Enter city",
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "country",
                "id": "country",
                "label": "Country",
                "type": "text",
                "placeholder": "Enter country",
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "password",
                "id": "password",
                "label": "Password",
                "type": "password",
                "placeholder": "Enter password",
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            }
        ],
    },
    {
        "row_label": "User Management",
        "rows": [
            {
                "name": "no_user",
                "id": "no_user",
                "label": "No of user",
                "type": "number",
                "placeholder": "Enter no of user",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "no_camp",
                "id": "no_camp",
                "label": "No of camp",
                "type": "number",
                "placeholder": "Enter no of camp",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "no_cordinator",
                "id": "no_cordinator",
                "label": "No of cordinator",
                "type": "number",
                "placeholder": "Enter no of cordinator",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "no_pos",
                "id": "no_pos",
                "label": "No of pos",
                "type": "number",
                "placeholder": "Enter no of pos",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "no_kiosk",
                "id": "no_kiosk",
                "label": "No of kiosk",
                "type": "number",
                "placeholder": "Enter no of kiosk",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "no_accountant",
                "id": "no_accountant",
                "label": "No of accountant",
                "type": "number",
                "placeholder": "Enter no of accountant",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true
            },
        ],
    },
    {
        "row_label": "App Services",
        "rows": [
            {
                "name": "is_mess_management",
                "id": "is_mess_management",
                "label": "Mess management",
                "type": "switch",
                "placeholder": null,
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "is_water_management",
                "id": "is_water_management",
                "label": "Water management",
                "type": "switch",
                "placeholder": null,
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "is_internet_management",
                "id": "is_internet_management",
                "label": "Internet management",
                "type": "switch",
                "placeholder": null,
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "is_investor_management",
                "id": "is_investor_management",
                "label": "Investor management",
                "type": "switch",
                "placeholder": null,
                "class": "col-lg-6 col-md-6 col-sm-12 form-group",
                "require": true
            }
        ],
    },
    {
        "row_label": "Subscription Details",
        "rows": [
            {
                "name": "subscription_start",
                "id": "subscription_start",
                "label": "Subscription start",
                "type": "date",
                "placeholder": "Enter subscription start",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "subscription_end",
                "id": "subscription_end",
                "label": "Subscription end",
                "type": "date",
                "placeholder": "Enter subscription end",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "grace_period_days",
                "id": "grace_period_days",
                "label": "Grace period days",
                "type": "number",
                "placeholder": "Enter grace period days",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true
            },
            {
                "name": "payment_type",
                "id": "payment_type",
                "label": "Payment type",
                "type": "select",
                "placeholder": "Enter payment type",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true,
                "optionData": [
                    {
                        "value": "ONE-TIME",
                        "label": "ONE-TIME"
                    },
                    {
                        "value": "SUBSCRIPTION",
                        "label": "SUBSCRIPTION"
                    }
                ]
            },
            {
                "name": "package_rate",
                "id": "package_rate",
                "label": "Package rate",
                "type": "number",
                "placeholder": "Enter package rate",
                "class": "col-lg-4 col-md-4 col-sm-12 form-group",
                "require": true
            },
        ],
    },
];

const clientTableData = [];

export { inputFiledArray, clientTableData };