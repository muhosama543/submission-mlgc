const { v4: uuidv4 } = require("uuid");

const checkCancer = require("../service/inferencesService");
const loadModel = require("../service/modelsService");
const { historiesData, storeData } = require("../service/dataService");

const predict = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new Error("Invalid request. File is missing!");
        }

        const image = req.file.buffer;
        const model = await loadModel();

        const isCancer = await checkCancer(model, image);
        const id = uuidv4();

        let data = {};
        const createdAt = new Date().toISOString();

        if (isCancer) {
            data = {
                id,
                result: "Cancer",
                suggestion: "Tolong segera periksa ke dokter!",
                createdAt,
            };
        } else {
            const id = uuidv4();
            data = {
                id,
                result: "Non-cancer",
                suggestion: "Tidak usah khawatir, karena ini bukan cancer!",
                createdAt,
            };
        }

        await storeData(id, data);

        res.status(201).json({
            status: "success",
            message: "Model is predicted successfully",
            data,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getPredictHistories = async (req, res, next) => {
    const data = await historiesData();

    res.status(200).json({
        status: "success",
        data,
    });
};

module.exports = {
    predict,
    getPredictHistories,
};