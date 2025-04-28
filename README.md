# Team Name Reveal Game

A fun, Wordle-style game to reveal new team names in a playful and celebratory way. Built with Next.js and deployed on Vercel.

## Features

- 🎮 Wordle-style guessing game
- 🎨 Beautiful, colorful UI with smooth animations
- 🎉 Confetti celebration on success
- 🏆 Multiple team names with mythological themes
- 📱 Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Deployment

The application is designed to be deployed on Vercel. To deploy:

1. Push your code to a GitHub repository
2. Import the repository to Vercel
3. Vercel will automatically detect it's a Next.js app and deploy it

## Customization

### Team Names

To customize team names, edit the `TEAMS` array in `src/types/game.ts`. Each team should have:
- `id`: A unique identifier
- `name`: The team name (in uppercase)
- `hint`: A hint about the mythological reference

### Styling

The application uses Tailwind CSS for styling. You can customize:
- Colors in `src/app/globals.css`
- Animations in the components using Framer Motion
- Layout and spacing in the component files

## License

MIT
