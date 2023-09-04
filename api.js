const express = require('express');
const app = express();
const port = 3000;
let students = [
    {
        Id: 1,
        studentid: 100,
        Name: 'shweta jadhav',
        Mobile: 7448137182,
        gender: 'Female',
        address: 'dombivali',
        email: 'shweta.jadhav2310@gmail.com',
        birthday_date: '2000-10-23',
    },
    {
        Id: 2,
        studentid: 101,
        Name: 'akash sir',
        Mobile: 8532146974,
        gender: 'Male',
        address: 'vashi',
        email: 'aksh@gmail.com',
        birthday_date: '1998-2-12'
    },
    {
        Id: 3,
        studentid: 102,
        Name: 'shubham sir',
        Mobile: 5236987410,
        gender: 'Male',
        address: 'vashi',
        email: 'shubham@gmail.com',
        birthday_date: '1999-6-13',
    },
    {
        Id: 4,
        studentid: 103,
        Name: 'ankita khapare',
        Mobile: 1236547890,
        gender: 'Female',
        address: 'ghatkopar',
        email: 'anku10@gmail.com',
        birthday_date: '2002-10-13'
    },
    {
        Id: 5,
        studentid: 104,
        Name: 'tanvi gosavi',
        Mobile: 9987456321,
        gender: 'Female',
        address: 'koparkhairane',
        email: 'tanu@gmail.com',
        birthday_date: '2000-8-25',
    },
]
function add(array,loc) {
    let Location=[];
    for(i=0;i<array.length;i++){
        if(array[i].address===loc){
            Location.push(array[i].Name)
        }
    }
    return Location
}
let locations = ['dombivali', 'vashi', 'koparkhairane', 'ghatkopar'];
let allStudents = {};
locations.forEach(loc => {
    // console.log(loc);
    let Location = add(students, loc);
    let loacted = [];
    Location.forEach(name => {
        // console.log(name);
        let student = students.find(e => e.Name === name);
        // console.log(student);
        loacted.push({
            studentid: student.studentid,
            Name: name,
            charcount: name.length,
        });
    });
    allStudents[loc] = loacted;
});
app.get('/city',(req,res)=>{
    res.send(allStudents);
})
  app.get('/citywise/:location',(req,res)=>{
   let  a=req.params.location
        // res.send(allStudents)
           res.send(allStudents[a]);

});
let obj={
    lessthan21:[],
    lessthan23:[],
    lessthan25:[],
}
 students.forEach(student=>{
        let age=Age(student.birthday_date);
        if(age<21){
            obj.lessthan21.push(student.Name);
        }
        if(age<23 && age==22){
            obj.lessthan23.push(student.Name);
        }
        if(age<=25 && age>=23){
            obj.lessthan25.push(student.Name);
        }
        // console.log(student);
    });
//  console.log(obj);
function Age(birthdate) {
    let parts = birthdate.split('-');
    let Year = parseInt(parts[0]);
    let Month = parseInt(parts[1]);
    let Day = parseInt(parts[2]);
    // console.log(parts[1]);
    
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDay = today.getDate();
    // console.log(currentYear);
    // console.log(typeof (new Date()));
    
    let age = currentYear - Year;
    
    if (currentMonth < Month || (currentMonth===Month && currentDay<Day)) {
        age--;
    }
    
    return age;
}
    app.get('/agewise/:age',(req,res)=>{
        let b=parseInt(req.params.age)
        let match = students.filter(student => {
            let age = Age(student.birthday_date);
            c=(age==b);
            return c;
        });
        res.send(match);
        // if(match===0){
        //   res.send({err:'not found student with this age'})
        // }
    });

    // app.get('/agewise',(req,res)=>{
    //   res.send(obj);
    // });
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
// console.log(allStudents);