const express=require('express');
const app=express();
const port=3000;
let students = [
    {
      Id: 1,
      studentid:100,
      Name: 'shweta jadhav',
      Mobile: 7448137182,
      gender: 'Female',
      address: 'dombivali',
      email: 'shweta.jadhav2310@gmail.com',
      birthday_date:2000-10-23,
    },
    {
      Id: 2,
      studentid:101,
      Name: 'akash sir',
      Mobile: 8532146974,
      gender: 'Male',
      address: 'vashi',
      email: 'aksh@gmail.com',
      birthday_date:1998-2-12
    },
    {
      Id: 3,
      studentid:102,
      Name: 'shubham sir',
      Mobile: 5236987410,
      gender: 'Male',
      address: 'vashi',
      email: 'shubham@gmail.com',
      birthday_date:1999-6-13,
    },
    {
      Id: 4,
      studentid:103,
      Name: 'ankita khapare',
      Mobile: 1236547890,
      gender: 'Female',
      address: 'ghatkopar',
      email: 'anku10@gmail.com',
      birthday_date:1999-10-13
    },
    {
      Id: 5,
      studentid:104,
      Name: 'tanvi gosavi',
      Mobile: 9987456321,
      gender: 'Female',
      address: 'koparkhairane',
      email: 'tanu@gmail.com',
      birthday_date:2000-8-23,
    },
    {
      Id: 6,
      studentid:105,
      Name: 'shweta',
      Mobile: 7448137182,
      gender: 'Female',
      address: 'dombivali',
      email: 'shweta.jadhav2310@gmail.com',
      birthday_date:2000-10-23,
    },
  ]
  
  let courses = [
    {
      ID: 1,
      courseID:1,
      courseName:"Full Stack Devolopment",
    },
    {
      ID: 2,
      courseID:2,
      courseName: "web-Designing",
    },
    {
      ID: 3,
      courseID: 3,
      courseName:"python developer",
    }
  ];
  
  let payments = [
    {
      adId:1,
      studentid:100,
      Id: 1,
      courseID:1,
      Paid: 30000,
      date: '5-5-2023',
    },
    {
      adId:1,
      studentid:100,
      Id: 2,
      courseID:1,
      Paid: 10000,
      date:'10-6-2023',
    },
    {
      adId:2,
      studentid:101,
      Id: 3,
      courseID:1,
      Paid: 15000,
      date:'10-5-2023',
    },
    {
      adId:3,
      studentid:102,
      Id: 4,
      courseID:2,
      Paid: 10000,
      date:'20-6-2023',
    },
    {
      adId:4,
      studentid:103,
      Id: 5,
      courseID:3,
      Paid: 8000,
      date:'23-7-2023',
    },
    {
      adId:5,
      studentid:104,
      Id: 6,
      courseID:3,
      Paid: 18000,
      date:'31-7-2023',
    }
  ];
  let addmission = [
    {
      adId:1,
      studentid:100,
      Id: 1,
      courseid: 1,
      course: 'Full stack development',
      fee:50000,
      date:'2023-05-18',
    },
    {
      adId:2,
      studentid:101,
      Id: 2,
      courseid: 1,
      course: 'Full stack development',
      fee:50000,
      date:'2023-05-23'
    },
    {
      adId:3,
      studentid:102,
      Id: 3,
      courseid: 2,
      course: 'python devloper',
      fee:20000,
      date:'2023-06-01'
    },
    {
      adId:4,
      studentid:103,
      Id: 4,
      courseid: 3,
      course: 'web dessigning',
      fee:30000,
      date:'2023-06-20'
    },
    {
      adId:5,
      studentid:104,
      Id: 5,
      courseid: 3,
      course: 'web dessigning',
      fee:30000,
      date:'2023-07-05'
    },
    {
      adId:6,
      studentid:105,
      Id: 6,
      courseid: 1,
      course: 'Full stack development',
      fee:50000,
      date:'2023-05-18',
    },
  
  ];
  function find(studentid) {
    
    let AD = addmission.find(admission => admission.studentid === studentid);
  
    let Payments = payments.filter(payment => payment.studentid === studentid);
    let Paid = Payments.reduce((sum, payment) => sum + payment.Paid, 0);
  
    return AD.fee - Paid;
  }
  let Balances = [];

  for (let i = 0; i < students.length; i++) {
    let balance = find(students[i].studentid);
    Balances.push({ studentId: students[i].studentid,
      name: students[i].Name, 
      pendingBalance: balance });
  }
  
  app.get('/pay', (req, res) => {
    res.json(Balances);
  });
  
app.get('/student/:name', (req, res) => {
    let Find = req.params.name;
    let student = students.find(student => student.Name === Find);
    
    if(!student){
      res.send({messege:'student is not found'});
    }
    let a=find(student.studentid)
    res.send({ studentId: student.studentid,
      name: student.Name, 
      pendingBalance: a });

});
let Amount={};
let Names = ['January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December'
];
payments.forEach(payment => {
  let Parts = payment.date.split('-');
  // let day = parseInt(Parts[0]);
  let index = parseInt(Parts[1]) - 1;
  // let year = parseInt(Parts[2]);
  
  let month = Names[index];
  
  if (!Amount[month]) {
    Amount[month] = 0;
  }

  Amount[month] += payment.Paid;
});
app.get('/amounts', (req, res) => {
  res.json(Amount);
});

let count=[];
addmission.forEach(admission => {
  let studentId = admission.studentid;
  let Date = admission.date;

  let student = students.find(student => student.studentid === studentId);

  if (student) {
    let studentName = student.Name;

    if (!count[Date]) {
      count[Date] = [];
    }

    count[Date].push(studentName);
  }
});
// console.log(count);
app.get('/count', (req, res) => {
  res.json(count);
});
app.get('/result', (req, res) => {
  let result = {};

  // Convert object keys to an array
  let Array = Object.keys(count);
  // console.log(Array);
  Array.forEach(admissionDate => {
    let dateParts = admissionDate.split('-');
    let month = parseInt(dateParts[1]);
    
    if (!result[month]) {
      result[month] = {};
    }
    result[month][admissionDate] = count[admissionDate];
  });

  res.send(result);
});
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });