# Attendance Marking using QRCode

A project that i created for my finlay year. Using QRCode as a medium to mark attendance of a classroom. Students use their smart devices to scan the QRCode and mark their precense.

There were few hickups while coding the application.

The intial project was coded fully in NodeJs. I didn't give much thought on the frontend when i started the project. It was all about testing if it was possible to create such a system. 

![](https://media.giphy.com/media/npAfXd5WrDMCk/giphy.gif)

Wrote all the important functionalites and used [POSTMAN](https://www.getpostman.com/) to test if the functionalities were working perfectly. Eveything was positive.

Creating the frontend part within the backend was fairly easy, but i rain into problems. Getting data from the default view engine in NodeJs was easy. Problem arised when it came to displaying data to the view engine. It became hectic and codes were getting messy. Some of the data could not be displayed as i have planned. 

So i had to find another method to display the data. Came across VueJs, it totally captured my attention. Taught myself VueJs enough to make the project possible.

![](https://media.giphy.com/media/fhAwk4DnqNgw8/giphy.gif)

As there was not a single lecturer in my Uni who knew NodeJS, VueJS and MongoDB. Totally one and half months it took for me to take a grasp on the workflow. 

So, frontend was done. I was able to display the data as i wanted. Vue is so easily customizable and fairly easy to work with. Sending and retrieving data was so easy.

The biggest concern for me to achieve my objectives.

- Eliminate false attendance.
- Secure the QRCode.

![](https://media.giphy.com/media/TPl5N4Ci49ZQY/giphy.gif)

To eliminate false attendance, a single QRCode can be scanned multiple times using a smart device, but it can only log data to the database once per QRCode. Local ip of the device will be saved to the database when the code is scanned. So if the same code is scanned again, an error or more like a warning will be displayed. ![](https://media.giphy.com/media/ZThQqlxY5BXMc/giphy.gif)

Securing the QRCode was the important any other part in the project. As students have become smart, they could have used the previous code and manipulate the data in it and mark attendance for classes they did not attend. A little bit research gave me an idea to encrypt the code. So each generated QRCode is encrypted thus manipulating the QRCode won't do any harm.
![](https://media.giphy.com/media/IxAJUqo5znhwA/giphy.gif)


## Getting Started

Clone the repo.
There will be two folders inside. Backend and Client.

All the modules has to be installed before the application can be used.

### Installing and running

Click on the Backend folder and install all the moduels using npm install.

Next do the same for the client folder.

`````````````````````````````````````
To run the backend npm start bin/www.
`````````````````````````````````````
`````````````````````````````````````
To run the client side npm serve.
`````````````````````````````````````

For the database(MongoDB), you can create a database link using MLAB and connect to the cloud or use local database.

Adjust the enivronment variables according to your system, so that frontend can communicate with the backend.


## Deployment

To try the live version you can deploy the system to Heroku. 
* [Heroku](https://www.heroku.com)

## Built With

* [ExpressJS](https://expressjs.com/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Passport](http://www.passportjs.org/) - Used for security features
* [NodeJs](https://nodejs.org/en/) - For the backend server.
* [VueJs](http://wwhttps://vuejs.org/) - For the frontend server.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
