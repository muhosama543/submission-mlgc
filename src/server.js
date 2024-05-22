require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routesAPI = require("./routes/api");
const error = require("./middleware/errorMiddleware");

const app = express();

(async () => {
    app.use(cors());
    app.use(routesAPI);
    app.use(error);

    const PORT = process.env.PORT || 5500;

    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
})();