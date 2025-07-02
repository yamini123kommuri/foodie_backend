

/*const app = require('./app');
const PORT = process.env.PORT || 5000;




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/

const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server running:`);
    console.log(`- Local: http://localhost:${PORT}`);
    console.log(`- Network: http://${getLocalIpAddress()}:${PORT}`);
});

// Helper function to get local IP
function getLocalIpAddress() {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'localhost';
}