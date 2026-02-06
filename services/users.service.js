const { fetchUsers } = require("../models/users.model.js")

exports.retrieveUsers = async () => {
    const usersData = await fetchUsers();
    return usersData;
}