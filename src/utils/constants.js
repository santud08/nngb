const MASTERDB = {
  TABLES: {
    SUBPROJECT_REGION: "ngs_subproject_detailed_settings_region",
    SUBPROJECT_DETAILED_SETTING: "ngs_subproject_detailed_settings",
    SUBPROJECT_HASHTAGS: "ngs_subproject_hashtag",
    SUBPROJECT_STEPS_DATA: "ngs_subproject_steps_data",
    SUBPROJECT_STEPS: "ngs_subproject_steps",
    INVESTIGATION_METHOD: "ngs_subproject_investigation_method",
    PROJECT: "ngs_project",
    SUB_PROJECT: "ngs_sub_project",
    INDUSTRY_TABLE: "ngs_industry",
    USER_TABLE: "ngs_users",
    EMAIL_TEMPLATE_TABLE: "ngs_email_templates",
    CUSTOMERS_TABLE: "ngs_customers",
    ACCOUNT_TABLE: "ng_accounts",
    ACCOUNT_SUBACCOUNT_TABLE: "ng_sub_accounts",
    EVENT_TABLE: "ngs_events",
    EVENT_USER_TABLE: "ng_event_users",
    ENQUIRY_TABLE: "ngs_enquiry",
    ENQUIRY_REPLY_TABLE: "ngs_enquiry_reply",
    OPINION_TABLE: "ngs_opinions",
    OPINION_ITEM_TABLE: "ngs_opinion_item",
    OPINION_ANSWER_TABLE: "ngs_opinion_answer",
    QUESTION_TABLE: "ngs_opinion_questions",
    OPTION_TABLE: "ngs_opinion_options",
    SUBMITTED_TABLE: "ngs_opinion_submitted",
    CUSTOM_PAGES_TABLE: "ngs_custom_pages",
    USER_ADDITIONAL_INFO_TABLE: "ngs_user_additional_information",
    BANK_ACCOUNT_AUTH: "ngs_bank_account_auth",
    BANK_LIST: "ngs_banks",
    FAQ_TABLE: "ngs_faqs",
    FAQ_CATEGORY_TABLE: "ngs_faq_category",
    ANNOUNCEMENT_TABLE: "ngs_announcements",
    ANNOUNCEMENT_CATEGORY_TABLE: "ngs_announcement_category",
    BONOUS_POINTS: "ngs_biz_ext",
    CASH_HISTORY: "ngs_history_cash",
    USER_HOME_APPLIANCES_TABLE: "ngs_user_home_appliances",
    COMPANY_SETTINGS: "ngs_company_settings",
    INQUIRY_CATEGORY_TABLE: "ngs_inquiry_category",
    INQUIRY_TABLE: "ngs_inquiry",
    SURVEY_REQUEST: "ngs_survey_request",
    SURVEY_METHODS: "ngs_survey_methods",
    SURVEY_REQUEST_FILES: "ngs_survey_request_files",
    HOME_APPLIANCES_TABLE: "ngs_home_appliances",
    SPORTS_TABLE: "ngs_sports",
    HOBBY_TABLE: "ngs_hobby",
    SUBPANEL_TABLE: "ngs_subpanel",
    SUBPANEL_QUESTION_TABLE: "ngs_subpanel_questions",
    SUBPANEL_QUESTION_OPTIONS_TABLE: "ngs_subpanel_questions_options",
    SUBPANEL_USER_JOINED_TABLE: "ngs_subpanel_user_joined",
    SUBPANEL_USER_JOINED_ANSWER_TABLE: "ngs_subpanel_user_joined_answer",
    ADMIN_USER_TABLE: "ngs_mgr_admin",
    E_TICKET_CODE_CATEGORY_TABLE: "ngs_e_ticket_code_category",
    E_TICKET_CODE_TABLE: "ngs_e_ticket_code",
    USER_MENU_TABLE: "ngs_menu_access_control",
    MENU_TABLE: "ngs_menus",
    REGION_TABLE: "ngs_regions",
    DEPARTMENT_TABLE: "ngs_departments",
    IP_ACCESS_MAPPING_TABLE: "ngs_ip_access_mapping",
    TEAM_TABLE: "ngs_team",
    BU_TABLE: "ngs_bu",
    HEADQUARTER_TABLE: "ngs_headquarter",
    CONTACT_PERSONS_TABLE: "ngs_contact_persons",
    CUSTOMER_CONTACT_PERSONS_TABLE: "ngs_customer_contact_persons",
    CUSTOMER_BUSINESS_TABLE: "ngs_business",
    BUSINESS_TABLE: "ngs_business",
    BUSINESS_TYPE_TABLE: "ngs_biz_type",
    BUSINESS_RESTRICTION_REGISTRATION_TABLE: "ngs_business_restriction_registration",
    DUPLICATE_CHECK_METHODS_TABLE: "ngs_dup_checked_methods",
    GUBUN_TABLE: "ngs_gubun",
    BUSINESS_CONVERSION_RESTRICTION_TABLE: "ngs_business_conversion_restrictions",
    BUSINESS_PAYMENTS: "ngs_business_payments",
    // CUSTOMER_BUSINESS_TABLE: "ngs_business",
    BANNER_TABLE: "ngs_banner",
    BANNER_CLICK_COUNT_TABLE: "ngs_banner_views",
    NCASH_EXCHANGE_TABLE: "ngs_ncash_exchange",
    VTBL_PROJECT: "VTBL_PROJECT",
    E_TICKET_ORDER_TABLE: "ngs_e_ticket_order",
  },
};
const SOURCEDB = {
  TABLES: {
    USER_TABLE: "USERS",
  },
};

const consoleColors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m", // Scarlet
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m",
  },
};
const BANK_ID = {
  SOCKET_HOST: "secure.nuguya.com",
  SOCKET_PORT: 80,
  SOCKET_TIMEOUT: 10,
  TARGET_URL: "https://secure.nuguya.com/nuguya/service/realname/sprealnameactconfirm.do",
  TARGET_URL_UTF: "https://secure.nuguya.com/nuguya2/service/realname/sprealnameactconfirm.do",
};

const PAGINATION_LIMIT = 10;
const STATISTICS_SETTINGS = {
  MIN_AGE: 15,
  MAX_AGE: 99,
};

const BTYPE_SETTINGS = {
  SURVEY_BTYPE: 103,
};

const ACCUMULATION_TYPE = {
  WEBHARD_NCASH: "Earn through webhard",
  OTHER_NCASH: "Accumulation other than webhard",
};

export {
  ACCUMULATION_TYPE,
  BANK_ID,
  BTYPE_SETTINGS,
  MASTERDB,
  PAGINATION_LIMIT,
  SOURCEDB,
  STATISTICS_SETTINGS,
  consoleColors
};

