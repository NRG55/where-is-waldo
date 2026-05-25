# Where's Waldo

[Live Version](https://nrg55-where-is-waldo.netlify.app/) 

The task of this project was to design and implement a fully functional, interactive "Where's Waldo" photo-tagging web application. Players can choose from different maps, race against the clock to find specific characters, and submit their scores to a leaderboard.

This full-stack application was built using the following tech stack:

## Frontend:
- React
- Styling: Tailwind CSS

## Backend:  
- Node.js, Express  
- Database: PostgreSQL, Prisma ORM

## Deployment
- Netlify: Frontend client
- Render: Backend server
- Neon: PostgreSQL database
- Cloudinary: Images storge

## Features:
- Interactive target selection: Click anywhere on the map to trigger a dropdown menu for selecting found characters
- Server-side validation: Securely verifies clicked coordinates against backend target coordinates to prevent client-side cheating
- Active game timer: Monitors and shows the exact time taken to locate all hidden characters
- Leaderboard: Display player completion times categorized by individual maps.
- Responsive layout

## Screenshot

![Public Client Homepage](https://res.cloudinary.com/dlc8atazj/image/upload/v1779693526/where-is-waldo-homepage-screenshot_c09ehw.png)