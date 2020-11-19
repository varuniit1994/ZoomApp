export const ZOOM_API_KEY = '4BjhXIqASKSQFwA9jLbyzg';

/**
    * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
    * The below generateSignature should be done server side as not to expose your api secret in public
    * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/tutorial/generate-signature
    */
export const ZOOM_API_SECRET = 'EqsVL73Iii7A5RRFMFO0vE09Qr2Rbrnxf6QU';

// export const BASE_URL = "http://localhost:50052";

export const BASE_ZS_URL = process.env.REACT_APP_ZMSIG_HOST

export const DashboardType = {
  USER:0,
  HOST:1,
  ORGANIZATION:2
}

export const BASE_URL = process.env.REACT_APP_BACKEND_HOST
console.log("BASE URL",BASE_URL);
console.log(BASE_URL);