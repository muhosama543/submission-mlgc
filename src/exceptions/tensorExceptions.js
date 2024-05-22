class TensorException extends Error {
    constructor() {
        super(`Terjadi kesalahan dalam melakukan prediksi`)
        this.status = 400
        this.name = 'TensorException'
    }
}

module.exports = TensorException;