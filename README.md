# Alumni-Social
Alumni Social is a web application designed to enhance connections within alumni communities. It provides a platform for organizing events, sharing job opportunities, and facilitating communication among alumni.

## Overview
This project provides comprehensive social networking features specifically tailored for alumni communities, enabling seamless connections and engagement.

## Key Features

- **Create Events:** Easily organize and manage alumni events.
- **Post Jobs:** Share career opportunities tailored for alumni.
- **Publish Newsletters:** Keep the community informed with regular updates.
- **Auto-Delete Notices:** Efficiently manage time-sensitive announcements.
- **Bulk Import Alumni:** Streamline onboarding with Excel sheet integration.
- **Powerful Search:** Find alumni using filters like name, year, and location.
- **Email Targeting:** Send emails to targeted alumni groups.
- **Analytics Dashboard:** Visualize engagement with intuitive graphs.
- **Real-Time Chat Rooms:** Foster dynamic conversations among alumni.
- **Fundraising:** Enable crowdfunding for various initiatives.
- **Add Faculties:** Connect with current and former faculty members.
- **Verify Alumni:** Maintain trust with a verification process.
- **Support Tickets:** Address alumni needs with efficient support.

## Getting Started
<!-- Screenshot -->
![Alumni Social Screenshot](Frontend/src/assets/img/screenshots.jpg)
<!-- Screenshot -->
### Prerequisites
* [Node.js](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com/download-center/community)
* [Git](https://git-scm.com/downloads)
### Installation
1. Clone the repo
```sh
git clone https://github.com/Voyager-Onishem/Alumni-Social.git
```
1.2 Change directory
```sh   
cd Alumni-Social
```
1.3 create a .env file and add the following(can use .env.example as a reference)
```sh
PORT=3000
PORT= 8080
DB_NAME=
GMAIL =
GMAILPASS=
MONGODB_URI = mongodb+srv://<username>:<password>@cluster0.9mnlyjk.mongodb.net/?retryWrites=true&w=majority
CORS_ORIGIN =*
JWT_SECRET=
JWT_COOKIE_EXPIRES_IN = 30
JWT_EXPIRES_IN = 30m

```

2. Install NPM packages
```sh
npm install
```
3. Run the app
3.1 For Frontend
```sh
npm run dev
```

3.2 For Backend
```sh
npm start 
```

## Built With
* [Node.js](https://nodejs.org/en/download/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/download-center/community)
* [Mongoose](https://mongoosejs.com/)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details




