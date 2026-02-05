const { fetchTopics } = require("../models/topics.model.js")

exports.retrieveTopics = async () => {
    const topicsData = await fetchTopics();
    return topicsData;
}

