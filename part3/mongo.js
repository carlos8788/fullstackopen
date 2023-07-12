const mongoose = require('mongoose')

const argvSys = () => {
    if (process.argv.length < 5) {
        // console.log('Please provide all arguments: node mongo.js <password> <person> <number-phone>')
        const person = connectMongo(process.argv[2])
        getPerson(person)
        
        

    } else {
        const [, , password, name, phone] = process.argv;
        const person = connectMongo(password)
        createPerson(name, phone, person)
        
    }
}



const connectMongo = (pass) => {
    const url = `mongodb+srv://carlos8788:${pass}@fullstackopen.7rvc4cy.mongodb.net/persons?retryWrites=true&w=majority`
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: Number,
    })

    const Person = mongoose.model('Person', personSchema)
    return Person
}

const createPerson = (name, number, Person) => {
    const person = new Person({
        name,
        number
    })

    person.save()
        .then(result => console.log('person saved!'))
        .then(() =>
            Person.find({})
                .then(result => {
                    result.forEach(person => console.log(person))
                    mongoose.connection.close()
                })
                
        )
        
}

const getPerson = (Person) => {
    Person.find()
    .then(result => {
        console.log('phonebook:');
        result.map(pers => {
            console.log(`${pers.name} ${pers.number}`)
        })
        mongoose.connection.close()
    })
    
        
}

module.exports = connectMongo
