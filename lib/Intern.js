// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern extends Employee{
    super(name, id, email)
    constructor(school){
        this.school = school
    }
    getRole(){
        return Intern
    }

    getSchool(){
        return this.school
    }
}

module.exports = Intern