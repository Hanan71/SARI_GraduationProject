# SARI: Smart Electrical Current & Leakage Defense System ⚡🛡️

<p align="center">
  <img src="https://github.com/user-attachments/assets/9b398f93-03c9-4628-ac33-dd347b8081b0" alt="SARI Project Mascot / Logo" width="180" style="border: 2px solid #30363d; border-radius: 12px; padding: 10px;" />
</p>

<p align="center">
  <strong>Bachelor's Graduation Project — Shaqra University (جامعة شقراء)</strong><br>
  <em>College of Computing and Information Technology</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Sponsored%20By-Prince%20Faisal%20bin%20Bandar%20Chair%20for%20AI-006C35?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Showcased%20At-Riyadh%20Region%20Municipality-D4AF37?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Incubated%20By-Saudi%20Electricity%20Company%20(SEC)-005696?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-IoT%20%7C%20Embedded%20Systems-00599C?style=for-the-badge&logo=cplusplus" />
  <img src="https://img.shields.io/badge/Web-Frontend%20Dashboard-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/Microcontrollers-Arduino%20Uno%20R4%20%7C%20ESP-00979D?style=for-the-badge&logo=arduino" />
  <img src="https://img.shields.io/badge/Database%20%26%20API-Cloud%20Integration-4E9A06?style=for-the-badge&logo=fastapi" />
</p>

---

## 💡 Overview

**SARI (ساري)** is an intelligent IoT-driven electrical safety and monitoring system engineered to detect electrical leakage, monitor real-time energy flow, and mitigate electrical hazard risks before escalations occur.

Developed as an undergraduate graduation project at **Shaqra University**, SARI integrates dedicated sensory hardware, microcontroller firmware, cloud database synchronization, and an interactive web dashboard connected to a physical smart home prototype to deliver immediate hazard alerts and real-time telemetry.

---

## 🏆 Endorsements, Showcases & Incubation

* **🎖️ Prince Faisal bin Bandar Chair for Artificial Intelligence:** Selected and sponsored under the research chair for applied AI and smart technologies.
* **🏛️ Riyadh Region Municipality Showcase (إمارة منطقة الرياض):** Officially exhibited and presented as an innovative national safety technology solution.
* **⚡ Saudi Electricity Company (SEC) Incubation:** Incubated by the **Saudi Electricity Company (شركة الكهرباء)** to explore practical field applications, grid-to-home safety integration, and future deployment scaling.

---

## 👩‍💻 My Role & Key Contributions

As a lead developer and architect on the project, my responsibilities spanned end-to-end system conception, IoT embedded engineering, system modeling, and full-stack integration:

* **💡 Project Ideation & System Concept:** Formulated the core project vision, safety protocols, use-case specifications, and system problem-solving framework.
* **📐 System Modeling & UML Architecture:** Designed and engineered all foundational **UML architectural diagrams** for the project (including Use Case, Sequence, Class, Component, and Deployment diagrams) to establish the structural blueprint of the system *(excluding the Database schema and Activity diagram)*.
* **🔌 IoT Hardware Prototyping & Embedded Engineering:** Built and calibrated the sensory circuit integration using the **Arduino Uno R4** microcontroller, interfacing current/voltage sensors, and programming micro-level detection logic.
* **🔄 Workflow & System Architecture Design:** Mapped and designed the complete operational workflow—from physical sensor acquisition and edge threshold evaluation to cloud transmission and real-time dashboard triggers.
* **🗄️ Database Architecture & Cloud Integration:** Configured and connected the web platform to a live cloud database to log telemetry, track threshold breaches, and maintain historical audit logs.
* **🌐 Device-to-Platform API Communication:** Built and integrated RESTful APIs linking the physical hardware directly with the web platform for seamless two-way data flow.
* **🏡 Smart Home Model Integration (ESP API):** Interfaced and synchronized the IoT system with a physical scale **Smart Home Model** using an **ESP** microcontroller via custom APIs, enabling real-time automated safety shutdowns and simulated room-by-room telemetry.

---

## ⚙️ System Architecture & Workflow

```text
  [ Physical Circuit / Current Sensors ]
                    │
                    ▼
     [ Arduino Uno R4 Edge Node ]  ──► (Real-Time Differential Threshold Evaluation)
                    │
                    ▼
  [ ESP Microcontroller Node (API) ] ◄──► [ Smart Home Scale Prototype ]
                    │
                    ▼ (REST API / Telemetry Stream)
       [ Cloud Database / Backend ]
                    │
                    ▼
          [ SARI Web Dashboard ]     ──► (Live Telemetry & Instant Safety Alerts)

  ```
1- Sensing Layer: Continuous monitoring of AC current and voltage metrics using dedicated sensor modules.

2- Edge Processing: Microcontroller computes differential thresholds in real-time to detect residual currents/leakages instantly.

3- Smart Home & ESP Link: The ESP microcontroller bridges the SARI hardware to the smart home model via API endpoints to simulate automated isolation of affected circuits.

4- Cloud Database Layer: Streams telemetry, timestamps leakage incidents, and maintains historical data.

5- Web Dashboard: Visualizes live power metrics, displays alert statuses, and enables direct system monitoring.

📦 Dataset Setup
The project includes large dataset files used by the SARI system. To keep the repository lightweight and manageable, the datasets are archived as compressed .zip files.

* Before running the analytical or training modules, extract the required files inside the attached_assets/ directory:

train_1770243485879.csv.zip

test_1770243497324.csv.zip

After extraction, the directory structure should appear as follows:
attached_assets/
├── ....
├── train_1770243485879.csv
└── test_1770243497324.csv

🛠️ Extracting the Dataset
macOS / Linux:

cd Sari-Electrical-Safety/attached_assets
unzip train_1770243485879.csv.zip
unzip test_1770243497324.csv.zip

Windows:

1- Navigate to the attached_assets directory in File Explorer.

2- Right-click each .zip file and select Extract All....

⚠️ Important: The application expects uncompressed .csv files during runtime execution. Ensure both archives are fully extracted prior to starting the local server.


🛠️ Tech Stack & Hardware ComponentsCategoryTechnologies / ComponentsMicrocontrollers & HardwareArduino Uno R4, ESP Microcontroller, Current & Voltage Sensors, RelaysFirmware & EmbeddedC / C++ (Arduino IDE), ESP API IntegrationSmart PrototypeScaled Smart Home Model with Automated Circuit ControlBackend & DatabaseREST APIs, Cloud Database IntegrationWeb InterfaceHTML5, CSS3, JavaScript Web DashboardSponsors & IncubationPrince Faisal bin Bandar Chair for AI, Riyadh Municipality Showcase, Saudi Electricity Company (SEC)Institution


          
