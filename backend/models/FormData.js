require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

class FormData {
  displayName;
  message;
  userLatitude;
  userLongitude;
  FormData(displayName, message, userLatitude, userLongitude) {
    this.displayName = displayName;
    this.message = message;
    this.userLatitude = userLatitude;
    this.userLongitude = userLongitude;
  }
}

module.exports = FormData;
