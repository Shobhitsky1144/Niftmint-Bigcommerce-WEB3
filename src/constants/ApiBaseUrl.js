export const API_BASE_URL = "https://api.dev.niftmint.com/api/";
// export const API_BASE_URL = "https://6a78-59-91-116-246.in.ngrok.io/api/";

export const API_ROUTES = {
  AUTH_USER: {
    LOGIN: "brand/auth/signin",
    // SIGNUP: "brand/auth/signup",
    VERIFY_OTP: "brand/auth/verify",
    RESEND_OTP: "brand/auth/generateOtp",
    ABOUT_BUSINESS: "brand/about",
    FORGET_PASSWORD_STEP1: "auth/OtpSentViaEmail",
    FORGET_PASSWORD_STEP2: "auth/fpotpVerify",
    FORGET_PASSWORD_STEP3: "auth/resetPassword",
  },
  NFT: {
    TRANSFER_NFT: "nft/transferNFT",
    GET_NFT: "nft/get?id=",
    CHECK_TRANSFER: "nft/transfer",
    CREATE_NFT: "nft/add",
    GET_ALL_NFT: "brand/viewNfts?id=",
    UPDATE_NFT: "nft/",
    DELETE_NFT: "nft/delete?id=",
    DUPLICATE_NFT: "nft/duplicate",
    CHANGE_NFT_TYPE: "nft/mint",
  },
  COLLECTION: {
    CREATE_COLLECTION: "collection/add",
    GET_ALL_COLLECTION: "brand/viewCollections?id=",
    GET_COLLECTION: "collection/get?id=",
    UPDATE_COLLECTION: "collection/",
    DRAFT: "collection/draft",
    DELETE_COLLECTION: "collection/delete?id=",
    COLLECTION_VISIBLITY: "collection/",
  },
  BIGCOMMERCE: {
    LINKACCOUNT: "brand/linkAccount",
    BIGCO_SIGNIN: "brand/auth/bigcosignin",
    BIGCO_SIGNUP: "brand/auth/bigcosignup",
    VALIDATE_BRAND: "brand/validateBrand?email=dev@niftmint.com",
    GET_CONTEXT: "brand/getcontext?id=",
  },

  USER: {
    brandIdentity: "brand/addBrandIdentity",
  },
};
