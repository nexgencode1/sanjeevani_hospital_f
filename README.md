# 🏥 Sanjeevani Hospital - Frontend Application

Modern, responsive React single-page application (SPA) built with **Vite**, **TailwindCSS**, and **Lucide Icons** for **Sanjeevani Multispeciality Hospital & Trauma Center**.

---

## 🌟 Features
- **Modern Healthcare UI**: Premium aesthetics with smooth transitions, Lucide icons, dynamic Hero slider, and responsive layouts.
- **Dynamic Content Management**: Live doctor directory, gallery photo browser, hospital department showcases, and facility highlights.
- **Interactive Patient Portal**: Online appointment booking with instant token generation, contact and feedback forms, emergency call dialer, and WhatsApp direct chat.
- **Secured Admin Panel**: Comprehensive dashboard to manage doctors, view and update appointments, handle inquiries, modify gallery photos, and edit hospital contact/OPD settings.
- **SEO Optimized**: Dynamic meta tags, OpenGraph preview headers, sitemap, and Google schema markup for medical organizations.

---

## 🚀 VPS Deployment Quick Start (Ubuntu / Debian / CentOS with Nginx)

### 1. Local Development
```bash
npm install
npm run dev
```
Runs at `http://localhost:3000`.

### 2. Production Build for VPS
```bash
# 1. Clone repository
git clone https://github.com/nexgencode1/sanjeevani_hospital_f.git
cd sanjeevani_hospital_f

# 2. Install dependencies
npm install

# 3. Configure .env
cp .env.example .env

# Set VITE_API_BASE_URL to /api (if Nginx reverse proxies /api to backend) or your API domain

# 4. Build optimized bundle
npm run build
```
This generates the production bundle in the `dist/` directory.

### 3. Nginx Server Block Configuration (Sample)
```nginx
server {
    listen 80;
    server_name yourhospitaldomain.com www.yourhospitaldomain.com; # Or your VPS IP

    root /var/www/sanjeevani_hospital_f/dist;
    index index.html;

    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy /api requests to backend Node.js server
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Proxy /uploads static files to backend
    location /uploads/ {
        proxy_pass http://127.0.0.1:5000/uploads/;
        proxy_set_header Host $host;
    }

    # Enable Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 4. Enable SSL with Let's Encrypt Certbot
```bash
sudo certbot --nginx -d yourhospitaldomain.com -d www.yourhospitaldomain.com
```

---

## 🔒 License
Proprietary - Sanjeevani Multispeciality Hospital & Trauma Center.
