# Welcome to the Robot Machine - By Simon Czerwinski

![screenshot-sc-robot](https://github.com/simonczerwinski/sc-robot-project/assets/20460571/343c4f3c-0733-4cae-9064-f1041ed4ca3d)

## What You'll Find Here

This repository serves as a small robot that takes commands from an input (e.g., F = Forward, R = Right, and L = Left). It can also take commands in Swedish (e.g., G = Gå (Go), H = Höger (Right), and V = Vänster (Left)). An example of an input in English can be "LFRRFFRFRFFF" and in Swedish it can be "GHGHVGGGVVG".

## Technologies

This project is built using the following technologies:

- **Frontend**: I use HTML, CSS, and the JavaScript library React. I also use the UI library Tailwind CSS.

- **State Management**: XState helps me manage complex UI state transitions. It provides a clear way to represent and handle different states in my applications.

- **Test**: I use Cypress to test the frontend (only E2E test is configured).

- **Local storage**: Using Local storage to save name, input command, what room type was used and created date.

## Getting Started

To start this project locally, follow this guide:

Install all dependencies and packages.

```bash
npm install
```

After the installation is done, make sure you are in the project directory, then run:

```bash
npm run start
```

This runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.

To build the app for production to the build folder, use:

```bash
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

To run Cypress tests, make sure the app is running by starting it with:

```bash
npm run start
```

Then, open a new terminal and run the following script:

```bash
npm run cypress:open
```

or

```bash
npx cypress open
```

Choose E2E testing (only E2E testing available now)

## Future goals I plan

- **State management**: Add more state managements and move some functions to separate files

- **Login**: Add a login system.

- **Api**: Add SWR to fetch data and make some more magic.

- **Test**: Add more test cases.

- **More layouts**: I will create more layouts for the robot to choose from.

- **Navbar**: Implement a menu with pages.

- **Zustand**: Maybe implement Zustand to test new state management magic instead of xState.

- **Database**: Implement a Database like MongoDB or SupaBase instead of storing via Local storage.

## Enjoy

I hope you enjoy my project. If you have any questions or feedback, feel free to reach out to me:

- Email: [simon@czerwinski.se](mailto:simon@czerwinski.se)
- LinkedIn: [Simon Czerwinski](https://www.linkedin.com/in/simon-edward-czerwinski-b0b9297a/)
- Portfolio Website (Under development): [simonczerwinski.com](https://www.simonczerwinski.com)

---

Thank you!
