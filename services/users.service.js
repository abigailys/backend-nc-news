const { fetchUsers, fetchUserByUsername } = require("../models/users.model.js")

exports.retrieveUsers = async () => {
    const usersData = await fetchUsers();
    return usersData;
}

exports.retrieveUserByUsername = async (username) => {
    const userData = await fetchUserByUsername(username);
    return userData;
}