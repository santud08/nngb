import { config } from "dotenv";
config();

export const envs = {
  env: process.env.NODE_ENV || "dev",
  port: Number(process.env.NODE_PORT) || 4000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DIALECT || "mysql",
  },
  apiKey: process.env.API_KEY || "",
  passwordSalt: Number(process.env.PASSWORD_SALT_ROUND) || 12,
  jwt: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET || "",
      expiry: Number(process.env.ACCESS_TOKEN_EXPIRED) || 3600,
    },
  },
  smtp: {
    email: process.env.SMTP_AUTH_EMAIL,
    password: process.env.SMTP_AUTH_PASSWORD,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 465,
    secure: process.env.SMTP_SECURE == "no" ? false : true,
    fromEmail: process.env.SMTP_FROM_EMAIL,
  },
  aws: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
    region: process.env.S3_REGION || "",
    cdnUrl: process.env.AWS_CDN_URL || "",
  },
  s3: {
    BUCKET_NAME: process.env.S3_BUCKET_NAME || "",
    BUCKET_URL: process.env.S3_BUCKET_URL || "",
  },
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || "ko",
  maxFileUploadSize: process.env.maxFileUploadSize || 20,
  siteUrl: process.env.siteUrl || "",
  adminSiteUrl: process.env.adminSiteUrl || "",
  PROJECT_NAME: process.env.PROJECT_NAME || "",
  DEFAULT_PAGE_LIMIT: process.env.DEFAULT_PAGE_LIMIT || 10,
  db1: {
    host: process.env.DB_HOST1 || "localhost",
    port: process.env.DB_PORT1 || 3306,
    database: process.env.DB_DATABASE1,
    username: process.env.DB_USERNAME1,
    password: process.env.DB_PASSWORD1,
    dialect: process.env.DIALECT1 || "mysql",
  },
  SWAGGER_UI_ACCESS: {
    USER: process.env.SWAGGER_API_USER || "",
    PASSWORD: process.env.SWAGGER_API_PASSWORD || "",
  },
  BANK_ID: {
    BANK_AC_SIDECODE: process.env.BANK_AC_SIDECODE || "",
    BANK_AC_PASSWORD: process.env.BANK_AC_PASSWORD || "",
  },
  ORACLE_CLIENT: {
    WIN32: process.env.ORACLE_CLIENT_WIN || "",
    DARWIN: process.env.ORACLE_CLIENT_DARWIN || "",
    LINUX: process.env.ORACLE_CLIENT_LINUX || "",
  },
  NICE_TOKEN_API: {
    SITE_CODE: process.env.NICE_SITE_CODE || "",
    SITE_PASSWORD: process.env.NICE_SITE_PASSWORD || "",
    MODULE_PATH: process.env.NICE_MODULE_PATH || "",
    RETURN_URL: process.env.NICE_RETURN_URL || "",
    ERROR_URL: process.env.NICE_ERROR_URL || "",
  },
  BIZ_TYPE: {
    REGISTRATION_BIZ_TYPE: process.env.REGISTRATION_BIZ_TYPE || "101",
    REFERAL_BONUS_BIZ_TYPE: process.env.REFERAL_BONUS_BIZ_TYPE || "102",
  },
};
