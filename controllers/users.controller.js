const { retrieveUsers } = require("../services/users.service.js")

exports.getUsers = async (request, response) => {
    const users = await retrieveUsers();
    response.status(200).send({ users: users });
}