import React, { useState, useEffect } from 'react';
import ROSLIB from 'roslib';
import RealTimeChart from './RealTimeChart'; // Import the real-time chart component

const LiveGaze = () => {
    const [gazeData, setGazeData] = useState([]);
    const [sceneImage, setSceneImage] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const ros = new ROSLIB.Ros({
            url: 'ws://localhost:9090', // Ensure ROSBridge WebSocket is running here
        });

        // Connection handlers
        ros.on('connection', () => {
            console.log('Connected to ROSBridge WebSocket server.');
            setIsConnected(true);
            setIsLoading(false);
        });

        ros.on('error', (error) => {
            console.error('Error connecting to ROSBridge:', error);
            setIsConnected(false);
            setIsLoading(false);
        });

        ros.on('close', () => {
            console.log('Connection to ROSBridge closed.');
            setIsConnected(false);
        });

        // Gaze data topic
        const gazeTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/tobii/gaze_data',
            messageType: 'std_msgs/Float64MultiArray',
        });

        // Subscribe to gaze data
        gazeTopic.subscribe((message) => {
            const [x, y] = message.data;
            setGazeData((prevData) => [...prevData.slice(-20), { x, y }]); // Keep the last 20 points
        });

        // Scene image topic
        const imageTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/tobii/gaze_coords',
            messageType: 'sensor_msgs/Image',
        });

        // Subscribe to scene image
        imageTopic.subscribe((message) => {
            const base64Image = `data:image/jpeg;base64,${message.data}`; // Assuming base64-encoded image
            setSceneImage(base64Image);
        });

        // Cleanup on component unmount
        return () => {
            gazeTopic.unsubscribe();
            imageTopic.unsubscribe();
            ros.close();
        };
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Live Gaze Data</h1>
            {isLoading ? (
                <p style={{ textAlign: 'center', fontSize: '16px' }}>Loading...</p>
            ) : isConnected ? (
                <>
                    {/* Real-time chart */}
                    <RealTimeChart data={gazeData} />

                    {/* Scene image with overlay */}
                    {sceneImage && (
                        <div style={{ position: 'relative', display: 'inline-block', marginTop: '20px' }}>
                            <img
                                src={sceneImage}
                                alt="Scene"
                                style={{
                                    maxWidth: '100%',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                }}
                            />
                            {gazeData.length > 0 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: `${gazeData[gazeData.length - 1].y * 100}%`,
                                        left: `${gazeData[gazeData.length - 1].x * 100}%`,
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                ></div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <p style={{ textAlign: 'center', color: 'red' }}>Disconnected from ROSBridge.</p>
            )}
        </div>
    );
};

export default LiveGaze;
