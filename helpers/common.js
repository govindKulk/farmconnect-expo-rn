const { Dimensions } = require("react-native");

const {width: deviceWidth, height: deviceHeight} = Dimensions.get("window");


export const hp = percentage => (percentage*deviceHeight)/100;
export const wp = percentage => (percentage*deviceWidth)/100;

