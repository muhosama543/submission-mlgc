const tf = require("@tensorflow/tfjs-node")
const TensorException = require("../exceptions/tensorExceptions")

const checkCancer = async (model, image) => {
    try {
        const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()

        const prediction = model.predict(tensor)
        const score = await prediction.data()
        const predictionResult = score[0]

        if (predictionResult <= 0.5) {
            return false
        }

        return true
    } catch (error) {
        throw new TensorException()
    }
}

module.exports = checkCancer;