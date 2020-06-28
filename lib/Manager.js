// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager extends Employee{
    super(name, id, email)
    constructor(officeNumber){
        this.officeNumber = officeNumber
    }

    getRole(){
        return Manager
    }
}

 module.exports = Manager