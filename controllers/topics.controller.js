const { retrieveTopics } = require("../services/topics.service.js")

exports.getTopics = async (request, response) => {
    const topics = await retrieveTopics()
    response.status(200).send({topics: topics});
}