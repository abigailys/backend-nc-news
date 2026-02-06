const { retrieveTopics } = require("../services/topics.service.js")

exports.getTopics = async (request, response, next) => {
    try {
        const topics = await retrieveTopics()
        response.status(200).send({ topics: topics });
    }
    catch (error) {
        next(error);
    };
}