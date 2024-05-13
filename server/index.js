const { SERVER_PORT } = require("./src/configs/config");
const app = require("./app");
const PORT = SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
