# SmartTools - Free Online Tools

A comprehensive collection of free online tools for calculations, conversions, text processing, and more.

## Features

- 🧮 **Calculators**: BMI, Age, Loan, Mortgage, Investment, and more
- 🔄 **Converters**: Currency, Temperature, Unit, Timezone, and more
- 🔐 **Generators**: Password, QR Code, Barcode, UUID, and more
- 📝 **Text Tools**: Word Counter, Case Converter, JSON Formatter, and more
- 🛠️ **Utilities**: Image Compressor, PDF Tools, Timers, and more

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: React 19, Tailwind CSS, shadcn/ui
- **Database**: MongoDB
- **Authentication**: JWT for admin sessions
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd smarttools
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env.local` file based on `.env.example`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update the environment variables in `.env.local`:
\`\`\`env
MONGODB_URI=your-mongodb-connection-string
ADMIN_PASSWORD=your-secure-admin-password
JWT_SECRET=your-secret-jwt-key-min-32-chars
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Dashboard

Access the admin dashboard at `/admin/login` to:
- Manage API keys for currency conversion
- Configure Google AdSense ads
- Control ad blocker detection settings

Default admin password is set in your `.env.local` file.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set these in your production environment:
- `MONGODB_URI`: Your MongoDB connection string
- `ADMIN_PASSWORD`: Strong admin password
- `JWT_SECRET`: Secure random string (min 32 characters)
- `NEXT_PUBLIC_SITE_URL`: Your production domain

## Features

### Offline Support
The site includes a service worker for offline caching, allowing users to access previously visited tools without an internet connection.

### Ad Management
- Configure Google AdSense ads from the admin dashboard
- Control ad positions (top, bottom, sidebar, inline)
- Enable/disable ad blocker detection

### SEO Optimized
- Dynamic meta tags for each tool
- Structured data (JSON-LD)
- Sitemap generation
- Optimized for search engines

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.
