# 💘 AI Pickup Line Generator

Bikin pickup line lucu, gaul, dan kreatif cuma dengan satu kata!  
Aplikasi ini menggunakan **IBM Watsonx.ai Granite Model** untuk menghasilkan pickup line otomatis berdasarkan tema atau keyword yang dimasukkan user.

---

## 📖 Description
**AI Pickup Line Generator** adalah aplikasi berbasis **Next.js** yang memungkinkan user memasukkan sebuah kata (contoh: *coffee*, *coding*, *pizza*), lalu AI akan menghasilkan pickup line unik dan kocak.  

Cocok untuk hiburan, ice-breaking, atau sekadar iseng cari pickup line kece buat chat 😎.

---

## 🛠️ Technologies Used

### 🔹 Frontend & Backend
- [Next.js (App Router v14/15)](https://nextjs.org/)  
- [React](https://react.dev/)  
- [Node.js (v18+)](https://nodejs.org/)  

### 🔹 AI Platform
- [IBM Watsonx.ai Granite Model](https://www.ibm.com/watsonx/ai)  

### 🔹 Libraries & Tools
- [Axios](https://axios-http.com/) → HTTP request ke Granite API  
- [dotenv](https://www.npmjs.com/package/dotenv) → Simpan API Key & Project ID  
- [TailwindCSS](https://tailwindcss.com/) → Styling UI  
- [Vercel](https://vercel.com/) → Deployment  
- [Postman](https://www.postman.com/) → Testing API  

---

## ✨ Features
- 📝 Input kata/tema → AI generate pickup line lucu & gaul  
- 🎲 Random Mode → generate pickup line random tanpa tema  
- 📋 Copy to Clipboard → langsung copy pickup line hasil AI  
- 🎨 Modern & responsif UI dengan TailwindCSS  
- 🚀 Deployable ke **Vercel** hanya dengan 1 klik  

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/pickup-line-ai.git
cd pickup-line-ai
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env.local` di root project, lalu isi:

```env
IBM_API_KEY=your_ibm_api_key
PROJECT_ID=your_project_id
GRANITE_URL=https://us-south.ml.cloud.ibm.com
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka di browser → [http://localhost:3000](http://localhost:3000)

### 5. Build untuk Production

```bash
npm run build
npm start
```

---

## 🤖 AI Support Explanation

Aplikasi ini menggunakan **Watsonx.ai Granite Model** dari IBM untuk menghasilkan teks.

### 🔹 Flow:

1. User memasukkan keyword (contoh: *coffee*).
2. Next.js API Route (`/api/pickup`) mengirim request ke Granite API.
3. Granite memproses prompt → menghasilkan pickup line unik.
4. Hasil dikirim balik ke frontend → ditampilkan di UI.
5. (Opsional) User bisa **copy** pickup line atau pakai **random mode**.

