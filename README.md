# WildDonut-Sever

---

## API Endpoints

###users:
* POST: api/users - (creates user)
* POST: api/users/:username - (updates user)

###students:
* GET: api/users/students/:username - (get particular student)

###teachers:
* GET: api/users/teachers - (get all teachers)
* GET: api/users/teachers/:username - (get particular teacher)

###bookings:
* GET: api/bookings/students/:username - (get all bookings for a particular student)
* GET: api/bookings/teachers/:username - (get all bookings for a particular teacher)
* POST: api/bookings - (create booking for student and teacher)