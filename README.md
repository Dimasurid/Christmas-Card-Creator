# ScriptHub

ScriptHub is a powerful web application designed for discovering, sharing, and managing scripts. Whether you're a developer, system administrator, or automation enthusiast, ScriptHub provides a centralized hub for all your scripting needs.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Script Discovery**: Easily find scripts based on titles, tags, and ratings.
- **Bookmarking**: Save your favorite scripts for quick access later.
- **User Ratings and Reviews**: Share your experiences and rate scripts to help others.
- **Admin Panel**: For administrators to add, edit, and manage scripts.
- **Drag-and-Drop Sorting**: Admins can reorder scripts using a user-friendly drag-and-drop interface.
- **User Profiles**: Complete your profile to enhance your experience and access personalized features.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Firebase (Firestore for database, Authentication)
- **Routing**: React Router
- **State Management**: Context API
- **Drag-and-Drop**: react-beautiful-dnd

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/scripthub.git
   ```

2. Navigate to the project directory:

   ```bash
   cd scripthub
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up Firebase:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your project and copy the Firebase configuration.
   - Create a `.env` file in the root of your project and add your Firebase configuration:

   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **User Registration**: New users can register to create an account.
- **Login**: Existing users can log in to access their profiles and bookmarks.
- **Explore Scripts**: Browse through the available scripts and use the search functionality to find specific ones.
- **Bookmark Scripts**: Save scripts to your bookmarks for easy access.
- **Admin Features**: Admin users can add, edit, and delete scripts, as well as manage user profiles.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request. 

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out to:

- **Minh**: [quangminh29082011@gmail.com](mailto:quangminh29082011@gmail.com)
- **GitHub**: [Dimasurid](https://github.com/Dimasurid)

---

Thank you for checking out ScriptHub! We hope you find it useful for your scripting needs.
