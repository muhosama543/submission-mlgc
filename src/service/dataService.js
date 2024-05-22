const { Firestore } = require("@google-cloud/firestore");

const db = new Firestore({
    projectId: "submissionmlgc-arman",
});
const predictCollection = db.collection("predictions");

const storeData = async (id, data) => {
    return predictCollection.doc(id).set(data);
};

const historiesData = async () => {
    const querySnapshot = await predictCollection.get();

    const predictions = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        predictions.push({
            id: data.id,
            history: {
                result: data.result,
                createdAt: data.createdAt,
                suggestion: data.suggestion,
                id: data.id,
            },
        });
    });

    return predictions;
};

module.exports = {
    storeData,
    historiesData,
};