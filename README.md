# Syns Blog

Syns Blod is a blog post application built with Next.js.

## Demo
Check out the live demo: [Syns Blog](https://syns-blog.vercel.app/)

---

## Tech Stack
### Dependencies
- **TypeScript**: `^5`
- **Next.js**: `^13.5.7`
- **React**: `^18.2.0`
- **Ant Design**: `^5.22.3`
- **React Query**: `^5.62.2`
- **Axios**: `^1.7.8`
- **Tailwind CSS**: `^3`
- **ESLint**: `^8`

---

## Prerequisites
- **Node.js**: Version 16 or later.
- **npm**: Version 8 or later.

---

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/racmathafidz/syns-blog.git
cd syns-blog
```

### Install Dependencies
```bash
npm install
```

### Environment Setup
1. Copy ```.env.example``` to ```.env.local.```
2. Configure the necessary environment variables.

### Run Development Server
```bash
npm run dev
```
The app will be available at http://localhost:3000.

## Docker Setup

### Pull Docker Image and Install Dependencies
```bash
make pull-image && make install
```

### Start the Development Environment
```bash
make start
```
The app will be available at http://localhost:3000.

## Support
If you encounter any issues or have questions, feel free to create an issue on GitHub or reach out to the maintainer.
