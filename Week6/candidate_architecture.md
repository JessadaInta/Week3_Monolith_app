## Candidate Architecture 1: [Monolith]

### Overview
[Monolith เป็นการรวมทุกฟังก์ชั่นไว้ในแอปเดียว ทำให้พัฒนา และติดตั้งได้ง่าย ซึ่งระบบที่จะทำมีขนาดกลางและทีมงานน้อย จึงมีความเหมาะสมกับระบบจองห้องประชุมนี้ ]

### Components
- [User Management]
- [Room & Calendar Management]
- [Booking & Recurring Booking]
- [Notification (Email/LINE)]
- [Authentication]

### Technology Stack
- Frontend: [HTML, CSS, JavaScript]
- Backend: [Node.js]
- Database: [MySQL]
- Others: [LINE Notify API, Email Service]

### Architectural Patterns
- [MVC]
- [Client–Server]

### Diagram
[<img width="741" height="521" alt="Monolith drawio" src="https://github.com/user-attachments/assets/a6e86ab4-cf19-49ea-8e93-2e1a1430876c" />]

### Pros & Cons
**Pros:**
- ✅ [พัฒนาและดูแลรักษาง่าย]
- ✅ [ติดตั้งและจัดการระบบไม่ซับซ้อน]

**Cons:**
- ❌ [การขายระบบทำ]
- ❌ [หากมีส่วนใดๆ ล่ม อาจพังทั้งระบบ]

---

## Candidate Architecture 2: [Layered]
### Overview
[Layered แยกโครงสร้างระบบออกเป็นชั้นตามหน้าที่ ช่วยให้โค้ดเป็นระเบียบ ดูแลและปรับปรุงได้ง่าย เหมาะกับระบบที่อาจขยายในอนาคต]

### Components
- [Presentation Layer (UI)]
- [Application Layer]
- [Business Logic Layer]
- [Data Layer]
- [Notification Service]

### Technology Stack
- Frontend: [React]
- Backend: [Node.js]
- Database: [MySQL]
- Others: [LINE API, SMTP Email]

### Architectural Patterns
- [Layered Architecture]
- [MVC]

### Diagram
[<img width="721" height="621" alt="Layered drawio" src="https://github.com/user-attachments/assets/2e30b6f4-381a-423d-a517-ac0d8be62e20" />]

### Pros & Cons
**Pros:**
- ✅ [โครงสร้างชัดเจน แยกหน้าที่เป็นสัดส่วน]
- ✅ [แก้ไขหรือขยายบางส่วนได้ง่าย]

**Cons:**
- ❌ [ซับซ้อนกว่า Monolith]
- ❌ [อาจมี Overhead ในการเรียกใช้งานระหว่าง Layer]

---
