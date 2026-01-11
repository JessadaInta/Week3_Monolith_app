# ADR-001: [Title of Architecture Decision]

**Date:** [2026-01-11]
**Status:** Accepted
**Deciders:** [เจษฎา อินตา]

---

## Context

### Background
[ทางผู้จัดทำมีความต้องการพัฒนาระบบจองห้องประชุมออนไลน์เพื่อแก้ปัญหาการจองซ้ำซ้อน ลดขั้นตอนการจองแบบเดิม และเพิ่มความสะดวกให้ผู้ใช้งาน]

### Problem Statement
[การจองห้องประชุมที่ไม่เป็นระเบียบ มีการจองห้องซ้ำ ไม่มีการแจ้งเตือนก่อนการได้ใช้ห้องประชุม]

### Key Drivers
- **Functional:**
  - [ผู้ใช้สามารถดูปฏิทินและจองห้องประชุมได้]
  - [ระบบรองรับการจองซ้ำ]
- **Quality Attributes:**
  - [Maintainability: ระบบต้องแก้ไขและดูแลรักษาได้ง่าย]
  - [Scalability: ระบบต้องรองรับการขยายตัวในอนาคต]
- **Constraints:**
  - [ระบบต้องเป็น Web-App]
  - [ต้องเชื่อมต่อ Email และ LINE API]

---

## Decision

We will use **[Layered Architecture]**.

### Components
- [Presentation Layer]: [ส่วนติดต่อผู้ใช้สำหรับการดูปฏิทินและจองห้องประชุม]
- [Application Layer]: [จัดการ API และควบคุมการทำงานของระบบ]
- [Business Logic Layer]: [ประมวลผลกฎการจองและการจองซ้ำ]
- [Data Access Layer]: [ติดต่อและจัดการข้อมูลในฐานข้อมูล]
- [Notification Layered]: [ส่งแจ้งเตือนผ่าน Email และ LINE]

### Technologies
- Frontend: [React]
- Backend: [Node.js (Express)]
- Database: [MySQL]
- Others: [LINE API, SMTP Email]

### Architectural Patterns
- [Layered Architecture]
- [MVC]

---

## Rationale

### Why this decision?
[1. โครงสร้างระบบชัดเจน แยกหน้าที่ตาม Layer
2. ง่ายต่อการบำรุงรักษาและปรับปรุงระบบ
3. รองรับการเพิ่มฟีเจอร์ในอนาคตได้ดีกว่า Monolith
4. ลดผลกระทบเมื่อมีการเปลี่ยนแปลงเฉพาะบางส่วน]

### Alternatives Considered
1. **[Monolith Architecture]**
   - Pros: พัฒนาเร็ว โครงสร้างไม่ซับซ้อน
   - Cons: ในระยะยาวดูแลยาก
   - Why not chosen: ไม่เหมาะกับการขยายระบบในอนาคต

2. **[Microservices Architecture]**
   - Pros: ขยายระบบได้ดีมาก มีการแบ่งเข้าไปทำในแต่ละระบบทำให้อิสระเยอะ
   - Cons: ซับซ้อนกว่า Monolith และ Layered มาก
   - Why not chosen: ไม่มีความเหมาะสมกับระบบ

---

## Consequences

### Positive (ข้อดี)
- ✅ [โค้ดเป็นระเบียบและเข้าใจง่าย]
- ✅ [ดูแลรักษาและแก้ไขได้สะดวก]
- ✅ [รองรับการขยายระบบในอนาคต]

### Negative (ข้อเสีย)
- ❌ [มี Overhead จากการเรียกผ่านหลาย Layer] → Mitigation: [ออกแบบ Layer ให้เรียบง่ายและลดการเรียกที่ไม่จำเป็น]
- ❌ [ใช้เวลาออกแบบมากกว่า Monolith] → Mitigation: [ใช้ Template และโครงสร้างมาตรฐาน]

### Risks
- ⚠️ [ครงสร้างซับซ้อนเกินความจำเป็น]
  - Impact: [Medium]
  - Probability: [Low]
  - Mitigation: [ควบคุมจำนวน Layer และขอบเขตความรับผิดชอบให้ชัดเจน]

### Trade-offs
- [Trade-off 1: Maintainability vs Performance]
- [Trade-off 2: Simplicity vs Scalability]

---

## Compliance

### Constraints Met
- ✅ [Web-App]: [พัฒนาเป็นระบบเว็บ]
- ✅ [External Integration]: [เชื่อมต่อ Email และ LINE API]

### Quality Attributes Addressed
- ✅ [Maintainability]: [แยก Layer ชัดเจน]
- ✅ [Scalability]: [สามารถเพิ่มฟีเจอร์หรือปรับปรุงระบบได้ง่าย]

---

## Notes

### Assumptions
- [ผู้ใช้เข้าถึงระบบผ่าน Web Browser]
- [จำนวนผู้ใช้งานอยู่ในระดับเล็กถึงกลาง]

### Future Considerations
- [อาจพิจารณาแยก Notification เป็น Service เฉพาะ]
- [รองรับ Mobile Application ในอนาคต]

### References
- [Software Architecture in Practice]
- [Clean Architecture – Robert C. Martin]
