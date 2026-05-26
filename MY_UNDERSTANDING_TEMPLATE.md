# My Understanding

## Submission Links

**Loom Video (must be set to public — anyone with the link):**
[paste your Loom video URL here]

---

## Questions

Answer each question in your own words. There are no trick questions.

The goal is not a perfect answer — it is an honest one. Write as if you are explaining to a friend who has never used Express. Completing this will prepare you for your video walkthrough.

Do not copy from documentation, your code comments, or AI output. If you are unsure about something, write what you do understand and note where the gap is.

---

**1. What does each HTTP method in your API mean — GET, POST, PUT or PATCH, and DELETE? Why do we use different methods instead of just using POST for everything?**

_Your answer:_
GET - ไปดึงข้อมูลที่มีใน DB มาดูรายละเอียด เรียก query มาดูทั้งหมด หรือ จาก find by ID, Filter by Name ก็ได้เเล้วแต่จะดีไซน์ ในที่นี้เราลองให้มีทั้งดึงด้วย name เช่น beef และ ID ของสินค้า

POST - ใส่ข้อมูลใหม่เข้าไปใน DB ในที่นี้คือใส่รายละเอียดสินค้าที่มี id, name, des, quantity, price, category

PUT - update เปลี่ยนแปลงแก้ไขข้อมูลที่อยู่ใน DB โดยใส่ข้อมูลใหม่เข้าไป ในที่นี้แก้ไขข้อมูลโดยผ่านเข้าไปทาง ID

DELETE - ลบข้อมูลในระบบ ในที่นี้ลบด้วย ID

ถ้าใช้ POST ทั้งหมดน่าจะต้องมาเขียน logic ที่เยอะแยะหลายอย่างเกินไป

---

**2. What is `express.json()` and what would happen if you left it out?**

_Your answer:_
express.json() เป็น 1 ใน middleware ที่ใช้แกะกล่องของ front-end ที่ส่งข้อมูล JSON มาใน req.body ที่ express อ่านไม่ออก ถ้าลืมใส่ ค่า res.body จะกลายเป็นกล่องว่าง ระบบเลยเช็คข้อมูลไม่ได้

---

**3. What is the difference between `req.body`, `req.params`, and `req.query`? Give a real example from your API for each one.**

_Your answer:_
req.body ข้อมูล JSON ชุดใหญ่ที่ front-end ส่งมา เช่น ตอนทำ POST /products ดึงค่าพวก name, price, quantity มาสร้างสินค้าชิ้นใหม่

req.params ตัวแปรที่อยู่บนเส้นทาง URL เช่น /produts/:id ดึงค่า req.params.id

req.query คีย์เวิร์ดท้าย URL หลังเครื่องหมาย ? ที่เอา filter ข้อมูลที่จะให้ส่งมา ในที่นี่เช่น beef

---

**4. What are HTTP status codes? List every status code you used in your API and explain why you chose it for that situation.**

_Your answer:_
200 OK : ใช้ตอน GET ข้อมูลสำเร็จ
201 Created : ใช้ตอน POST สร้่างสินค้าใหม่สำเร็จ
400 Bad Request : ใช้ตอน front-end ส่งมาผิด data type, ไม่ครบ, ไม่ตรงตามเงื่อนไข
404 Not Found : ตอนหาสินค้าใน array ไม่เจอ
500 Internal Server Error : catch (error) บางอย่างที่แจ้งเตือน เช่น syntax error

---

**5. What is middleware? Describe what it does in your own words and give one example from your code.**

_Your answer:_
middleware ด่านตรวจกลางทาง ที่คอยตรวจ request ที่จะไป function หลัก ในที่นี้ใช้ 3 ตัวคือ cors() เพื่อเผื่อจะไปต่อ frone-end, express.json() แกะข้อความ JSON ให้อ่่านออก, centralized error handling middleware

---

**6. Why does the order of middleware matter in Express? What could go wrong if it were in the wrong order?**

_Your answer:_
เพราะ express ทำงานไล่จากบนลงล่าง ถ้าสมมติวาง express.json() ไปล่างสุด ก็จะไม่มีคนแกะกล่อง ทำให้หาย req.body ไม่เจอ ส่วนที่เป็นด่านตรวจคัดกรองส่วนกลางเลยต้องวางบนสุดเสมอ

---

**7. Walk through what happens on the server, step by step, when a POST request is sent to `/products`.**

_Your answer:_

1. request วิ่งผ่าน express.json() เพื่อแกะกล่องข้อความเป็น obj
2. เข้าสู่เส้นทาง app.post("/prodicts") หลังบ้านดึงข้อมูลผ่าน req.body
3. validation ตรวจสอบว่า data type ถูกประเภทมั้ย
4. เช็คค่า quantity ถ้าไม่มีให้ค่าเริ่มต้นคือ 1
5. ประกอบร่าง obj ใหม่ เจนไอดี auto ด้วย String(Date.now())
6. สั่งคำสั่ง products.push(newProduct) โยนเข้า array[] แล้วส่งกลับไปบอก front-end

---

**8. What is CRUD? Map each operation to the HTTP method and route you used in your API.**

_Your answer:_

CRUD
C - CREATE -> POST /products
R - READ -> GET /prodocts
U - UPDATE -> PUT /products/:id
D - DELETE /products/:id

---

**9. How does your API respond when something goes wrong — for example, when a product with a given ID does not exist?**

_Your answer:_
ไปเจอใน array จะมีค่าเป็น undefined เข้าเงื่อนไข (!product) ส่ง status กลับไป front-end { success: false, message: "Product not found" } 404 Not Found

---

**10. What was the hardest part of building this API and what did you do to get past it?**

_Your answer:_

คิด error handling ยากที่สุดเพราะนึกไม่ออกว่าต้องมีเคสไหนบ้าง หรือที่พิมพ์มาขาดเคสรองรับ error ตัวไหน

และที่ยากกว่าคือ syntax ที่ต้องใช้
ได้รับความช่วยเหลือจากโค้ดที่ทำในห้องตอนเรียน backend กับคุณนิติ เอามาเขียนเริ่มเองด้วย suggestion ของ ai ใน vs code ที่เป็นทางเลือกให้เลือก สุดท้ายต้องเช็คอีกทีว่า code เป็น system มั้ย ใช้งานได้มั้ย
