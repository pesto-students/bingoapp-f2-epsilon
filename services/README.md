<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img src="https://i.imgur.com/XccLpCb.png" alt="Logo" width="350" height="170" >
</p>
This app will provide customers access to movies from the comfort of their homes. The users will be able to view movies based on categories and preferences. Through our platform, users can have a seamless video streaming experience.


Welcome! We hope you enjoy the site as much as we enjoyed making it.
 
  
<!-- TABLE OF CONTENTS -->
<br/>

# Table of Contents

1. [Demo](#demo)
2. [Installation for backend](#installation)
3. [Technology Stack](#technology-stack)
4. [Authors](#authors)
5. [License](#license)

<br/>

# Demo

[Live Demo](http://bingo-app-front.s3-website.ap-south-1.amazonaws.com/)

<br/>

Please Note:

1. We recommend using this app in Google Chrome ignito mode.
2. Use the app on Laptop/desktop only as of now.


<br/>
Test Credentials:

- For User
 	 - Email: pesto@pesto.tech
 	 - Password: pesto@
<br/>

# Installation for backend

1. Clone the repo
    ```
    git clone https://github.com/pesto-students/bingoapp-f2-epsilon.git
    ```
2. Set up the backend server

    ```sh
    cd services/read
    npm install 
    ```
     ```sh
    cd services/stream
    npm install 
    ```
     ```sh
    cd services/write
    npm install 
    ```

3. Set up API gateway
    ```sh
    cd gateway
    npm install
    ```
4. Run the backend server
   ```sh
   npm start
   ```
5. Refer to README.md inside client folder for frontend setup
<br/>
 Note: API gateway and backend server should be start in two different terminals.

<br>

# Technology Stack

We tried to use a completely modern tech stack while testing out some new technologies that we had never used before. This resulted in a fast, performant, and easily-extensible web app that should be fairly future-proof for the coming next several years. We used:

- [React](https://reactjs.org/)
- [Node JS](https://nodejs.org/)
- [Express JS](https://expressjs.com/)
- [Mongo DB](https://mongodb.com/)

For Deployment and CI/CD, we have used the following technologies:

- [Git](https://git-scm.com/)
- [Docker](https://docker.com/)
- [Github](https://github.com/)

<br/>

# Authors

- [Mohammad Bhanpurwala](https://github.com/MohammedBhanpur22)
- [Naga Rajan](https://github.com/naga-RajanR)
- [Kalpajyoti Handique](https://github.com/kalpa-iiits) 

<br/>

# License

This project is developed under PESTO foundation program and can access by only pesto groups.

