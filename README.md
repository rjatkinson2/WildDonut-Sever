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
    curl --data "username=linda&&password=nycccccc" http://localhost:4568/api/users

    ### login
    curl --data "username=linda&&password=nycccccc" http://localhost:4568/api/users/login

    ### update user
    curl --data "username=fred&&firstName=Fred&&lastName=Tee&&location=Walmart&&picture=jj.jpg&&bio=boss&&teacher=true&&experience=none&&skill=eating&&payments=beer&&classes=testClass" http://localhost:4568/api/users/fred

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