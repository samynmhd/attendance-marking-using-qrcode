# Attendance Marking using QRCode

A project that i created for my final year. Using QRCode as a medium to mark attendance of a classroom. Students use their smart devices to scan the QRCode and mark their precense.

There were few hickups while coding the application.

The intial project was coded fully in NodeJs. I didn't give much thought on the frontend when i started the project. It was all about testing if it was possible to create such a system. 

![](https://media.giphy.com/media/npAfXd5WrDMCk/giphy.gif)

Wrote all the important functionalites and used [POSTMAN](https://www.getpostman.com/) to test if the functionalities were working perfectly. Eveything was positive.

Creating the frontend part within the backend was fairly easy, but i ran into problems. Getting data from the default view engine in NodeJs was easy. Problem arised when it came to displaying data to the view engine. It became hectic and codes were getting messy. Some of the data could not be displayed as i have planned. 

So i had to find another method to display the data. Came across VueJs, it totally captured my attention. Taught myself VueJs enough to make the project possible.

![](https://media.giphy.com/media/fhAwk4DnqNgw8/giphy.gif)

Knowledge of NodeJs, VueJs and mongoDB was very limited to my lecturers. Duration of one and half month it took for me to take a grasp on the workflow. 

So, frontend was done. I was able to display the data as i wanted. Vue is so easily customizable and fairly easy to work with. Sending and retrieving data was so easy.

The biggest concern for me to achieve my objectives.

- Eliminate false attendance.
- Secure the QRCode.

![](https://media.giphy.com/media/TPl5N4Ci49ZQY/giphy.gif)

To eliminate false attendance, a single QRCode can be scanned multiple times using a smart device, but it can only log data to the database once per QRCode. Local ip of the device will be saved to the database when the code is scanned. So if the same code is scanned again, an error or more like a warning will be displayed. 

![](https://media.giphy.com/media/1xkufRJ16wyov1o5yZ/giphy.gif)

Securing the QRCode was the important than any other part in the project. As students have become smart, they could have used the previous code and manipulate the data in it and mark attendance for classes they did not attend. A little bit research gave me an idea to encrypt the code. So each generated QRCode is encrypted thus manipulating the QRCode won't do any harm.

![](https://media.giphy.com/media/IxAJUqo5znhwA/giphy.gif)

### Workflow of the system

There are three modules in application.
- Admin
- Lecturer
- Student

The admin user has to be created by the Developer.

Lecturer registeration will be done under the admin, admin will email a link to the lecturer where the lecturer can register for the application.

Students have to browse the link and register them through the registration page provided. After the registration, student has to login to the system with the student ID and the password provided at registration. Next student has to select the subjects for the semester the student registered for. 

Side track for a moment, those subjects that are shown to the students will be added by the admin. Admin will add subjects semester wise and course wise. These subjects will be displayed to the student in their profile. 

The student will only be able to scan the code and mark attendance only after the student has registered and selected the subjects for the semester.

After the student scans the code and marks the attendance, the attended classes will be dsiplayed in the student dashboard.

For displaying the QRCode. Lecturer has to select the subject, an indentifier to distinguish between batches. Generate and display the code to the students. Students have to use a smart device to scan code and mark the attendance.

Lecturer later on can view the students who attended the class and who did not. Lecturer even can print the attendance sheet. 

It was a challenging project, the encouragement from lecturers and friends helped me a lot to complete this project. It became a successful project when my examiner gave me a smile and said "You should change some layouts in here and there". I took it as a positive outcome as all the functionalites worked perfectly and i managed to achieve all the objectives. 


![](https://media.giphy.com/media/13B3a2WWKcEo9O/giphy.gif)



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

## Built With

* [ExpressJS](https://expressjs.com/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Passport](http://www.passportjs.org/) - Used for security features
* [NodeJs](https://nodejs.org/en/) - For the backend server.
* [VueJs](http://wwhttps://vuejs.org/) - For the frontend server.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
