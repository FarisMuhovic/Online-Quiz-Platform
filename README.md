# Online-Quiz-Platform
An online quiz platform where users can take quizzes across various categories, create their own quizzes, and engage in real-time chat discussions. Administrators can manage and create new quizzes, view analytics, and moderate user interactions and users overall.
## Website Demo
<!-- [Visit My Website](https://quizapp.farismuhovic.online) -->
![Website authentication](https://github.com/FarisMuhovic/Online-Quiz-Platform/blob/main/demoappgifs/auth.gif)

![Dashboard, quiz doing](https://github.com/FarisMuhovic/Online-Quiz-Platform/blob/main/demoappgifs/dash-quiz.gif)

![Quiz and User management](https://github.com/FarisMuhovic/Online-Quiz-Platform/blob/main/demoappgifs/admin.gif)

![Profile, Quiz history](https://github.com/FarisMuhovic/Online-Quiz-Platform/blob/main/demoappgifs/profile-quiz-history.gif)
## Swagger Documentation
![Swagger API Docs](https://github.com/FarisMuhovic/Online-Quiz-Platform/blob/main/demoappgifs/swagger.gif)
<!-- [View API Documentation](https://shark-app-vkogd.ondigitalocean.app/public/v1/docs/) -->
## Local Hosting Guide
If you want to host the website and Swagger documentation locally, follow these steps:
1. **Requirements:**
   - [XAMPP](https://www.apachefriends.org/index.html) or similar local server software based on your operating system.
2. **Steps:**
   - Download and install XAMPP.
   - Start the Apache server from the XAMPP control panel.
   - Place your website files in the `htdocs` directory within the XAMPP installation directory.
   - Access your website locally using a web browser at `http://localhost/your-website-folder`.
# Front-end
Front end is built using the techonlogies listed below, the website itself is a single page application (SPA) in which all content is loaded initially and swapped when user clicks on a link. The website is responsive to both tablet and mobile devices using css media queries and break points. The folder structures includes data folder which holds random fun fact displayed to user. Images folder holds various avatars and banners for quizzes and such. Library folder holds the SPA plugin. Scripts folder holds javascript files for ajax calls and logic for quiz grading and displaying various modals. Stylesheets folder is a group of css filles that hold design for specific view. Utils folder contains some constants that are used through various scripts, modal function which returns a modal based on the type of error and message, and invalid session which checks returns the user to login page.
### Front end is built using:
- HTML5
- CSS3 and Bootstrap5
- Javascript and Jquery
### External libraries used:
- Jquery validation plugin
- Highcharts JS
- Jquery SPA
### Front end project structure
```
└── 📁frontend
    └── 📁data
        └── facts.json
    └── 📁images
        └── 404banner.svg
        └── authbanner.png
        └── 📁avatars
            └── avatar1.svg
            └── avatar2.svg
            └── avatar3.svg
            └── avatar4.svg
            └── avatar5.svg
            └── avatar6.svg
            └── avatar7.svg
            └── avatar8.svg
            └── avatar9.svg
        └── 📁dashboard-banners
            └── leaderboard.png
            └── manageusers.png
            └── profilebanner.png
            └── quizbanner.png
            └── quizhistory.png
            └── settings.png
            └── stats.png
        └── emptybox.svg
        └── favicon.png
        └── 📁quiz-type-banners
            └── geography.svg
            └── history.svg
            └── languages.svg
            └── literature.svg
            └── math.svg
            └── movies.svg
            └── music.svg
            └── science.svg
            └── sport.svg
    └── index.css
    └── index.html
    └── 📁library
        └── 📁spap
            └── app.js
            └── jquery.spapp.min.js
    └── 📁scripts
        └── analyticsFunctions.js
        └── authFunctions.js
        └── dashboardFunctions.js
        └── leaderboardFunctions.js
        └── pageFunctions.js
        └── profileFunctions.js
        └── quizHistoryFunctions.js
        └── quizManagementFunctions.js
        └── quizRender.js
        └── quizReviewFunctions.js
        └── quizSearchFunctions.js
        └── userManagement.js
    └── 📁stylesheets
        └── analytics.css
        └── authentication.css
        └── dashboard.css
        └── leaderboard.css
        └── profile.css
        └── quiz.css
        └── quizHistory.css
        └── quizManagement.css
        └── quizReview.css
        └── quizSearch.css
        └── userManagement.css
    └── 📁utils
        └── constants.js
        └── invalidSession.js
        └── modal.js
    └── 📁views
        └── analytics.html
        └── dashboard.html
        └── error_404.html
        └── leaderboard.html
        └── login.html
        └── profile.html
        └── quiz.html
        └── quizHistory.html
        └── quizManagement.html
        └── quizReview.html
        └── quizSearch.html
        └── register.html
        └── userManagement.html
```
# Backend
The backend is built using PHP with the Flight PHP framework, and a MySQL database. The backend follows a DAO (Data Access Object) pattern to manage database interactions, and it is structured similarly to an MVC (Model-View-Controller) architecture. The DAO pattern separates data access logic from business logic. The dao folder contains data access objects for authentication, quizzes, history, and user management.The routes folder defines the API endpoints for authentication, history, quizzes, and user routes.The services folder implements business logic for authentication, history, quizzes, and user services.The utils folder includes utility functions like authentication middleware.The public folder contains the API documentation generated by Swagger OpenAPI.
# Backend is built using: 
- PHP (Flight PHP framework)
- MySQL
# Authentication
The platform uses JWT for authentication. Upon login, a token is generated and sent to the client, which must include this token in the Authorization header for requests. The app also has 2 roles included, user and admin. Admin has access to routes like deletion of users and quizzes, promotion of user and creating new quizzes.
### Backend project structure
```
└── 📁rest
    └── .htaccess
    └── composer.json
    └── composer.lock
    └── config.php
    └── 📁dao
        └── AuthDao.class.php
        └── BaseDao.class.php
        └── HistoryDao.class.php
        └── QuizDao.class.php
        └── UserDao.class.php
    └── index.php
    └── 📁public
        └── 📁v1
            └── 📁docs
                └── doc_setup.php
                └── index.php
                └── oauth2-redirect.html
                └── swagger-ui-bundle.js
                └── swagger-ui-bundle.js.map
                └── swagger-ui-standalone-preset.js
                └── swagger-ui-standalone-preset.js.map
                └── swagger-ui.css
                └── swagger-ui.css.map
                └── swagger-ui.js
                └── swagger-ui.js.map
                └── swagger.php
    └── 📁routes
        └── authRoutes.php
        └── historyRoutes.php
        └── quizRoutes.php
        └── userRoutes.php
    └── 📁services
        └── AuthService.class.php
        └── HistoryService.class.php
        └── QuizService.class.php
        └── UserService.class.php
    └── 📁utils
        └── authMiddleware.php
        └── however.php
```
# Database
The database is built using SQL, the code for creating and some default data insertion can be found in the database folder, along with the ER diagram in pdf folder and mwb format.Below is the ER diagram.

![ER diagram](database/erdiagram.pdf)


