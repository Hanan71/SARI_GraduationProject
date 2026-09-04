<table>
  <tr>
    <td valign="middle">
      <h1>SARI: Smart Current&Leakage Defense System ⚡</h1>
    </td>
    <td valign="middle" align="center">
      <img width="220" alt="favicon-removebg-preview" src="https://github.com/user-attachments/assets/9df4e7e7-b50f-4e17-bdab-7781d1597c1c" />
    </td>
  </tr>
</table>



<p align="center">
  <strong>Bachelor's Graduation Project — Shaqra University (جامعة شقراء)</strong><br>
  <em>College of Computing and Information Technology</em>
</p>




<div align="center">
  <table>
    <tr>
      <td align="center" valign="middle">
        <img width="700" alt="IMG_2E642875E58D-1" src="https://github.com/user-attachments/assets/87c12151-75d4-4869-8306-dfaab31a716a" />
      </td>
      <td align="center" valign="middle">
        <img width="320" alt="Screenshot 2026-09-04 at 7 14 09 PM" src="https://github.com/user-attachments/assets/ef2fa214-3749-4096-b06a-0c07229a4ff3" />
      </td>
    </tr>
  </table>
</div>

[![SARI Components](https://img.shields.io/badge/Canva-Components-0A66C2?style=for-the-badge&logo=canva&logoColor=00C4CC&labelColor=FFFFFF&color=0A66C2)](https://canva.link/pq06gbgdikphy8o) 👈 click to Discover SARI Components

---
## Press Picture's For more

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://www.su.edu.sa/ar" target="_blank">
          <img width="180" style="border: 1px solid #d0d7de; border-radius: 6px; padding: 2px;" alt="images" src="https://github.com/user-attachments/assets/ed0f3201-5832-4008-9855-ad736b9240ac" />
        </a>
      </td>
      <td align="center">
        <a href="https://www.moenergy.gov.sa/ar/ministry/about/initiatives/moenergy-incubator/about" target="_blank">
          <img width="180" style="border: 1px solid #d0d7de; border-radius: 6px; padding: 2px;" alt="حاضنة-الطاقة-scaled" src="https://github.com/user-attachments/assets/8c66520b-890b-4589-b063-78d3fff60dae" />
        </a>
      </td>
      <td align="center">
        <a href="https://www.se.com.sa/" target="_blank">
          <img width="180" style="border: 1px solid #d0d7de; border-radius: 6px; padding: 2px;" alt="79706f77-2b27-4c35-b54d-2acd3f38888f" src="https://github.com/user-attachments/assets/e0c68e16-bc3c-487f-8c3d-272b563f7183" />
        </a>
      </td>
      <td align="center">
        <a href="https://www.spa.gov.sa/N2632325" target="_blank">
          <img width="180" style="border: 1px solid #d0d7de; border-radius: 6px; padding: 2px;" alt="sddefault" src="https://github.com/user-attachments/assets/1e74f993-64d2-4201-b077-118ef2987297" />
        </a>
      </td>
    </tr>
  </table>
</div>

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

---
## 📦 Dataset Setup
The project includes large dataset files used by the SARI system. To keep the repository lightweight and manageable, the datasets are archived as compressed .zip files.

* Before running the analytical or training modules, extract the required files inside the attached_assets/ directory:
https://github.com/Hanan71/SARI_GraduationProject/tree/main/Sari-Electrical-Safety/attached_assets

- train_1770243485879.csv.zip

- test_1770243497324.csv.zip

## After extraction, the directory structure should appear as follows:

```text
attached_assets/
├── ....
├── train_1770243485879.csv
└── test_1770243497324.csv
```
---

## 🛠️ Extracting the Dataset
---
## MacOS / Linux:

cd Sari-Electrical-Safety/attached_assets
unzip train_1770243485879.csv.zip
unzip test_1770243497324.csv.zip

## Windows:

1- Navigate to the attached_assets directory in File Explorer.

2- Right-click each .zip file and select Extract All....

⚠️ Important: The application expects uncompressed .csv files during runtime execution. Ensure both archives are fully extracted prior to starting the local server.

---

## 🛠️ Tech Stack & Hardware Components

| Category | Technologies / Components |
| :--- | :--- |
| **Microcontrollers & Hardware** | Arduino R4, ESP Microcontroller, Current & Voltage Sensors, Relays |
| **Firmware & Embedded** | C / C++ (Arduino IDE), ESP API Integration |
| **Smart Prototype** | Scaled Smart Home Model with Automated Circuit Control |
| **Backend & Database** | REST APIs, Cloud Database Integration |
| **Web Interface** | HTML5, CSS3, JavaScript Web Dashboard |
| **Sponsors & Incubation** | Prince Faisal bin Bandar Chair for AI, Riyadh Municipality Showcase, Saudi Electricity Company (SEC) |
| **Institution** | Shaqra University (جامعة شقراء) |

## Click For More

[![University Presentation](https://img.shields.io/badge/Canva-Uni%20Presentation-00C4CC?style=for-the-badge&logo=canva&logoColor=white)](https://canva.link/mg5k9jr52mu1vm8)

<br/>

[![University Poster](https://img.shields.io/badge/Canva-University%20Poster-00C4CC?style=for-the-badge&logo=canva&logoColor=white)](https://canva.link/i0wxatdrodx4elm)

<br/>

[![Emirate of Riyadh Province Poster](https://img.shields.io/badge/Canva-Emirate%20of%20Riyadh%20Poster-00C4CC?style=for-the-badge&logo=canva&logoColor=white)](https://canva.link/gyqxo7stbdqumpo)
