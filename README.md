# Madelocal

An app to connect users to local home-based and small businesses in their area.
People are becoming increasingly conscious of their spending patterns, wanting to support local vendors in their community. Social media platforms such as Instagram have permitted anyone to operate a small business, however, there is currently no easy way of searching for these local home-based businesses.

## Features

- Users can sign up, view local shops within a 10 km radius of the user's current location
- Users can further filter results by category or distance
- Users can leave comments on a shop's message board, or register their own business
- Users can connect with shop owners in real time through the built-in chat feature

## Final Product

### Root

!["Home"](https://github.com/sabiat/made-local/blob/main/docs/Root.png?raw=true)

### Main Page

!["Main Page"](https://github.com/sabiat/made-local/blob/main/client/public/gifs/homepage.gif?raw=true)

### Shop Profile

!["Shop Profile"](https://github.com/sabiat/made-local/blob/main/client/public/gifs/chat.gif?raw=true)

### Chat Functionality

!["Chat Functionality"](https://github.com/sabiat/made-local/blob/main/client/public/gifs/profile.gif?raw=true)

## Getting Started

1. Fork and clone this repository.
2. Install dependencies using the npm install command in both the "client" folder as well as the "server" folder.
3. Start the web server using the npm start command while in the "server" folder. You will also need to start the client by navigating to the "client" folder and running the npm start command there as well. The app will be served at http://localhost:3005.
4. Go to http://localhost:3005 in your browser.

## Dependencies

    - react: ^17.0.1,
    - react-leaflet: ^3.1.0
    - react-router-dom: ^5.2.0
    - axios: ^0.21.1
    - express: ~4.16.1
    - pg: ^8.5.1
    - socket.io: ^4.0.0
    - material-UI
    - haversine-distance: ^1.2.1
    - cookie-parser: ~1.4.4
