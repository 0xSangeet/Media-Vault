# Media Vault 🎥🔐

A secure personal media vault built using Node.js where users can upload their private videos and stream them — just like on YouTube — but with strict access control. Only the uploader can view their videos, and admins have elevated permissions.

---

## 🚀 Features

- 🔐 User authentication with JWT
- 📁 Upload and store video files
- 📺 Stream videos with chunked partial requests
- 👤 Each user can only access their own videos
- 🛡️ Admin can:
  - View any user's videos
  - Delete videos

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Auth**: JWT (JSON Web Tokens)
- **Frontend**: EJS templating, Tailwind CSS
- **File Handling**: Multer for uploads, Range headers for streaming

---


## ⚙️ Installation

   ```bash
   git clone https://github.com/0xSangeet/Media-Vault
   cd Media-Vault
   npm install
   node index.js
   ```
