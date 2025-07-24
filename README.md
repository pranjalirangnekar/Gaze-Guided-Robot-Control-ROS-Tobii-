# Gaze-Guided Robot Control (ROS & Tobii)

<img width="1155" height="735" alt="image" src="https://github.com/user-attachments/assets/24b0e2b9-f8a4-42d0-81ab-4f6991367835" />


## 🔗 Table of Contents
1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
3. [My Contributions](#my-contributions)  
4. [System Architecture](#system-architecture)  
5. [Prerequisites](#prerequisites)  
6. [Installation & Setup](#installation--setup)  
7. [Launching the System](#launching-the-system)  
8. [API Reference](#api-reference)  
9. [Performance & Evaluation](#performance--evaluation)  
10. [Future Directions](#future-directions)  
11. [License](#license)  

---

## 🎯 Project Overview
**Gaze-Guided Robot Control** streams live gaze data from Tobii Pro Glasses 3 into a ROS Noetic ecosystem, letting operators point and “click” in 3D by simply looking. Demonstrates end-to-end hardware–software integration, a robust Python-based ROS API, and a React GUI for real-time visualization.

---

## ✨ Key Features
- **Custom ROS Nodes & API**  
  - Publishes normalized gaze coordinates (`/gaze/coords`)  
  - Streams scene images (`/gaze/scene`)  
  - Modular Python interfaces for easy subscription and remapping  
- **ROSBridge / WebSocket Integration**  
  - Exposes ROS topics over a secure WebSocket  
  - Language-agnostic clients via `roslibjs`  
- **Hardware Integration**  
  - Native SDK connectivity to Tobii Pro Glasses 3 (`g3pylib`)  
  - Synchronized 60 Hz gaze + video streaming  
- **Interactive React GUI**  
  - Live overlay of gaze points on camera feed  
  - Heatmaps & fixation charts powered by `chart.js`  

---

## 💼 My Contributions
- **ROS Development**  
  - Architected and wrote all Python nodes  
  - Crafted ROS `launch` files to coordinate drivers, bridge, GUI  
- **API Design**  
  - Defined clear topic/message conventions  
  - Documented sample payloads and usage patterns  
- **Front-End Engineering**  
  - Built a responsive React app using `roslibjs` + `chart.js`  
  - Styled precise CSS overlays for gaze mapping  
- **Performance Testing**  
  - Measured round-trip latency (avg. 25 ms)  
  - Validated ≥ 95 % mapping accuracy on a 5 × 5 grid  
  - Stress-tested at sustained 60 Hz for 30 min with zero packet loss  

---

## 🏗 System Architecture
```

Tobii Pro Glasses 3
↓ USB/Wi-Fi
Tobii SDK (g3pylib)
↓
Custom ROS Node (Python)
↓ ROS Topic
ROSBridge/WebSocket Server
↓
React GUI Client (Browser)

````

---

## 📋 Prerequisites
- **OS**: Ubuntu 22.04 LTS  
- **ROS**: Noetic Ninjemys  
- **Python**: ≥ 3.8  
- **Node.js & npm**: ≥ 16.x  
- **Tobii SDK**: `g3pylib` (from Tobii Pro Glasses 3)  

---

## ⚙️ Installation & Setup

1. **Clone the Repo**  
   ```bash
   git clone https://github.com/pranjalirangnekar/Gaze-Guided-Robot-Control-ROS-Tobii-.git
   cd Gaze-Guided-Robot-Control-ROS-Tobii-
````

2. **Install ROS Dependencies**

   ```bash
   sudo apt update
   sudo apt install \
     ros-noetic-rosbridge-server \
     ros-noetic-roscpp \
     ros-noetic-rospy
   pip3 install g3pylib rospy
   ```

3. **Install Front-End Dependencies**

   ```bash
   cd gui
   npm install
   cd ..
   ```

4. **Build the Workspace**

   ```bash
   mkdir -p gaze_ws/src
   cd gaze_ws
   ln -s ../../src gaze_integration
   catkin_make
   source devel/setup.bash
   ```

---

## ▶️ Launching the System

```bash
roslaunch gaze_integration full_system.launch
```

This single command will:

* Start the Tobii data node
* Publish scene images
* Launch ROSBridge
* Serve the React GUI

Then open your browser at **`http://localhost:3000`**.

---

## 📖 API Reference

| Topic             | Message Type                 | Description                          |
| ----------------- | ---------------------------- | ------------------------------------ |
| `/gaze/coords`    | `geometry_msgs/PointStamped` | Normalized X,Y gaze coordinates      |
| `/gaze/scene`     | `sensor_msgs/Image`          | Live video frame from glasses        |
| `/gaze/fixations` | `std_msgs/Float32MultiArray` | Durations and positions of fixations |

---

## 📈 Performance & Evaluation

* **Latency**: 25 ± 5 ms (SDK → ROS → GUI)
* **Accuracy**: ≥ 95 % on 5 × 5 calibration grid
* **Stability**: 60 Hz sustained for 30 min, zero dropouts

> Detailed logs & charts in `docs/performance/`

---

## 🚀 Future Directions

* **Manipulator Control**: Map gaze to robot waypoints
* **Shared Autonomy**: Blend gaze control with obstacle avoidance
* **Multi-User Support**: Aggregate streams for collaborative tasks


