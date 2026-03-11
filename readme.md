# 1. Initialize the Backend Project

First create a clean project.

```bash
mkdir notes-api
cd notes-api
npm init -y
```

Install core dependencies:

```bash
npm install express dotenv cors
```

For development:

```bash
npm install --save-dev nodemon
```

Your **package.json** should have scripts like:

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

Production servers run `node`, development runs `nodemon`.

---

# 2. Production-Level Folder Structure

Most beginners dump everything in one file. Don't do that.

Use a layered structure.

```
notes-api
│
├── src
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   └── notesController.js
│   │
│   ├── models
│   │   └── noteModel.js
│   │
│   ├── routes
│   │   └── notesRoutes.js
│   │
│   ├── middlewares
│   │   └── errorMiddleware.js
│   │
│   ├── services
│   │   └── notesService.js
│   │
│   ├── utils
│   │   └── logger.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

Now understand **why this exists**.

---

# 3. server.js (Entry Point)

This file **starts the server**.

```javascript
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

Its job is only:

* start server
* connect DB
* boot app

Nothing else.

---

# 4. app.js (Express Configuration)

This is where you configure express.

```javascript
const express = require('express');
const cors = require('cors');

const notesRoutes = require('./routes/notesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRoutes);

module.exports = app;
```

Responsibilities:

* middleware
* route mounting
* request parsing

---

# 5. Routes Folder

Routes define **API paths**.

`routes/notesRoutes.js`

```javascript
const express = require('express');
const router = express.Router();

const {
  getNotes,
  createNote
} = require('../controllers/notesController');

router.get('/', getNotes);
router.post('/', createNote);

module.exports = router;
```

Routes should be **thin**.

They only map endpoints.

---

# 6. Controllers

Controllers handle **request + response**.

`controllers/notesController.js`

```javascript
exports.getNotes = (req, res) => {
    res.json({ message: "Fetch all notes" });
};

exports.createNote = (req, res) => {
    const { title, content } = req.body;

    res.json({
        message: "Note created",
        title,
        content
    });
};
```

Controllers:

* read request
* call service layer
* send response

---

# 7. Services (Important for Production)

Most tutorials skip this. That's why their code becomes garbage later.

Service layer contains **business logic**.

Example:

```
services/
    notesService.js
```

Example:

```javascript
exports.createNoteService = async (data) => {
    // business logic
};
```

Controller → Service → Database

---

# 8. Models

Models represent **database schema**.

Example with MongoDB:

```
models/noteModel.js
```

Example:

```javascript
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('Note', noteSchema);
```

---

# 9. Config Folder

Used for things like:

```
config/
    db.js
```

Database connection lives here.

Never inside controllers.

---

# 10. Middlewares

Used for:

* authentication
* logging
* error handling

Example:

```
middlewares/errorMiddleware.js
```

---

# 11. Environment Variables

`.env`

```
PORT=5000
DB_URL=mongodb://localhost:27017/notes
JWT_SECRET=supersecret
```

Never hardcode secrets.

---

# 12. The Flow of a Production API

A request flows like this:

```
Client Request
     ↓
Routes
     ↓
Controller
     ↓
Service Layer
     ↓
Model / Database
     ↓
Response
```

This separation is **critical in production systems**.

---
