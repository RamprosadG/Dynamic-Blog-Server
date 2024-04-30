const { allowedOrigins } = require("../config/allowedOrigins");

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Unauthorized."));
    }
  },
};

module.exports = corsOptions;
