# Imgurify Admin Dashboard

A React-based admin dashboard for managing posts, users, tags, and more.

## Table of Contents

1. [Introduction](#introduction)
2. [Components](#components)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

This project is an admin dashboard built with React for managing various aspects of the Imgurify platform. It includes components for handling user authentication, managing posts and tags, and displaying user information.

## Components

1. **PostLikes**
   - Description: This component displays posts along with their like counts and comments.

2. **Signin**
   - Description: Allows only Admin users to log in using their credentials. It communicates with the server for authentication.

3. **Signup**
   - Description: Provides a user registration form. It sends a POST request to create a new user.

4. **Tag**
   - Description: Manages tags, allowing the creation of new tags and displaying existing ones. It also provides options to edit and delete tags.

5. **UpdatePost**
   - Description: Allows updating a post by sending a PUT request to the server.

6. **UpdateTag**
   - Description: Similar to `UpdatePost`, this component allows updating tag information.

7. **UpdateUsers**
   - Description: Provides a form for updating user information.

8. **Users**
   - Description: Displays a list of users, allowing editing and deleting user information.

9. **UsersWithPosts**
   - Description: Displays users along with their associated posts.

## Installation

To set up the project, follow these steps:

```bash
# Clone the repository
git clone https://github.com/WisdomPandovic/imgurify-Admin.git

# Change to project directory
cd project

# Install dependencies
npm install

Usage
Start the development server:
npm start

Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository
Create a new branch for your feature or fix
Make your changes and commit them
Push the changes to your fork
Submit a pull request

License
This project is licensed under the MIT License - see the LICENSE file for details.
