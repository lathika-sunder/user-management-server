const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/roles.json");

const getRoles = (req, res) => {
    try {
        // Read the roles data from roles.json file
        const rolesData = JSON.parse(fs.readFileSync(filePath, "utf8"));

        if (!rolesData || rolesData.length === 0) {
            return res.status(404).json({ message: 'No roles found' });
        }

        // Send the roles data as a JSON response
        res.status(200).json(rolesData);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getRoles
};
