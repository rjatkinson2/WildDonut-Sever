# WildDonut-Sever

---

# API Endpoints

  ## students:
    * GET: api/users/students/:username - (get particular student)

  ## teachers:
    * GET: api/users/teachers - (get all teachers)
    * GET: api/users/teachers/:username - (get particular teacher)

  ## users:
    * POST: api/users/ - (creates user)
    * POST: api/users/login - (authenticates user)
    * POST: api/users/:username - (updates user)

  ## bookings:
    * GET: api/bookings/students/:username - (get all bookings for a particular student)
    * GET: api/bookings/teachers/:username - (get all bookings for a particular teacher)
    * POST: api/bookings - (create booking for student and teacher)

# example curl commands

  ## user

    ### signup
    curl --data "username=linda&&password=nycccccc" http://localhost:4568/api/users/signup

    ### login
    curl --data "username=linda&&password=nycccccc" http://localhost:4568/api/users/login

    ### update user
    curl --data "username=linda&&firstName=Fred&&lastName=Tee&&location=Walmart&&picture=jj.jpg&&bio=boss&&teacher=true&&experience=none&&skill=singing&&payments=beer" http://localhost:4568/api/users/linda

  ## students
    
    ### get specific student
    curl http://localhost:4568/api/users/students/linda

  ## teachers

    ### get all teachers
    curl http://localhost:4568/api/users/teachers

    ### get specific teacher
    curl http://localhost:4568/api/users/teachers/tony

  ## bookings

    ### get student's bookings
    curl http://localhost:4568/api/bookings/students/jude

    ### get teacher's bookings
    curl http://localhost:4568/api/bookings/students/tony

    ### create booking user
    curl --data "teacherUsername=tony&&studentUsername=linda" http://localhost:4568/api/bookings


# Updated API

## cURL for API testing
* (Basic curl structure) curl --data "" http://localhost:4568/api/

* (Create a class on the teacher) curl -H "Content-Type: application/json" -X POST -d '{"class_name":"pizza pie development","description":"pepporoni and pinneapple","rate":"5","start_time":1428513230110,"end_time":1428513230110,"teacher":"kyle","location":"mojave desert","available":"false"}' http://localhost:4568/api/users/linda/teacher/classes/552566a6738fe0e48fbfcad8


## Authentication
* api/users/login POST - Returns the user object after authentication
* api/users/signup POST - Returns the user object after creating a new user in the database

## Student / Teacher Profile Settings
* /api/users/:username  POST - Updates a user's information (teacher and student)
* /api/users/:username  GET - Returns a data object for a user (teacher and student)

## Student
* /api/users/:username/student/classes/booked GET - Returns all classes a student has booked
* /api/users/:username/student/classes/booked POST - Student clicks “book” on a class

## Teacher
* /api/users/:username/teacher/classes GET - Returns array of classes objects for teacher
* /api/users/:username/teacher/classes/booked GET - Returns all booked classes
* /api/users/:username/teacher/classes/available GET - Returns all classes w/ no signups
* /api/users/:username/teacher/classes/ POST - Teacher creates a new class
* /api/users/:username/teacher/classes/:id POST - Teacher update / modify an existing class
* /api/users/:username/teacher/classes/:id DELETE - Teacher can they delete the class
* /api/users/:username/teacher/classes/:id GET - Returns object with details of a specific class

## Browse
* /api/classes GET - Returns an array of class objects for all classes that are available