const { MulterError } = require("multer");
const TensorException = require("../exceptions/tensorExceptions");

const error = async (err, req, res, next) => {
    if (err instanceof TensorException) {
        res.status(err.status).json({
            status: "fail",
            message: err.message,
        });

        return;
    }

    if (err instanceof MulterError && err.message === "File too large") {
        res.status(413).json({
            status: "fail",
            message:
                "Payload content length greater than maximum allowed: 1000000",
            status: "fail",
        });

        return;
    }

    if (err instanceof MulterError && err.message === "Unexpected field") {
        res.status(400).json({
            status: "fail",
            message: "Property image tidak ada.",
        });

        return;
    }

    console.log(`Error: ${err}`);

    res.status(500).json({
        status: "fail",
        message: "Oops! Something went wrong!",
    });

    return;
};

module.exports = error;