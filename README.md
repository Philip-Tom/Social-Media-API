# 🌐 Social Network API 🚀

## Introduction 📝

Welcome to our cutting-edge Social Network API! 🎉 Built on MongoDB, this API is designed to power your social networking platform with lightning-fast performance and unmatched flexibility. With seamless integration of user registration, thought sharing, friend management, and more, your social network will reach new heights of engagement! 🚀

## Features ✨

Explore the key features of our API:

- **User Registration:** Allow users to register with unique usernames and emails.
- **Thought Sharing:** Users can share their thoughts and react the thoughts effortlessly.
- **Friend Management:** Enable users to add or remove friends from their network.
- **CRUD Operations:** Full support for Create, Read, Update, and Delete operations.
- **NoSQL Data Storage:** Scalable storage solution for handling large volumes of data.

## Getting Started (Installation) 🛠️


1. **Clone Repository:** `git clone https://github.com/Philip-Tom/Social-Media-API`
2. **Install Dependencies:** `npm install`
3. **Set Up MongoDB:** Configure connection string in `.env` file.
   > follow the `env.Example`
4. **Start Server:** `npm start`

## API Routes 🛣️

Discover the power of our API through its intuitive routes:

### Users

- `GET /api/users`: Retrieve all users
- `GET /api/users/:userId`: Retrieve a single user by ID
- `POST /api/users`: Create a new user
- `PUT /api/users/:userId`: Update a user by ID
- `DELETE /api/users/:userId`: Delete a user by ID

### Friends

- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list

### Thoughts

- `GET /api/thoughts`: Retrieve all thoughts
- `GET /api/thoughts/:thoughtId`: Retrieve a single thought by ID
- `POST /api/thoughts`: Create a new thought
- `PUT /api/thoughts/:thoughtId`: Update a thought by ID
- `DELETE /api/thoughts/:thoughtId`: Delete a thought by ID

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

> Import the `Insomnia_requests.json` JSON file into Insomnia to gain access pre-defined API routes [Insomnia_requests.json](Insomnia_requests.json)
## Walkthrough Video 📹

Dive deeper into the functionalities of our API with our interactive walkthrough video!

https://github.com/Philip-Tom/Social-Media-API/assets/147503829/e14e6f91-8ec5-40da-94a6-40c3ed33fc43


## Made with ❤️

- **Dependencies:** dotenv, express, mongoose

## GitHub URL💻

- **GitHub:** [Philip's GitHub](https://github.com/Philip-Tom)
