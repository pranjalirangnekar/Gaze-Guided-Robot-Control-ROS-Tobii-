const checkConnection = (req, res) => {
    // Placeholder for actual ROS-Tobii connection check logic
    res.json({ status: 'connected', message: 'Tobii-ROS connection is active.' });
};

const liveFeed = (req, res) => {
    // Placeholder for live feed
    res.json({ data: 'Live feed data here' });
};

module.exports = { checkConnection, liveFeed };
