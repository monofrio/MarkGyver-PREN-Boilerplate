const { green, red } = require("chalk");
const { db } = require("./server/db");
const  Campus  = require("./server/db/campus");
const Student = require("./server/db/student");
const hipsum = require('lorem-hipsum')

const loremHipsum = () => hipsum({
    count: 1,
    units: 'paragraphs',
    paragraphLowerBound: 3,
    paragraphUpperBound: 15,
    format: 'plain'
})

const seed = async () => {
  try {
    await db.sync({ force: true });
    // seed your database here!

    const NP = await Campus.create( {
      name: 'SUNY New Paltz',
      imageUrl: 'https://sites.newpaltz.edu/athletics/wp-content/uploads/sites/27/2014/01/New-Paltz-Primary_CLR.jpg',
      address: '1 Hawk Drive New Paltz, NY 12561',
        description: loremHipsum()
    })
   const Purchase = await Campus.create( {
      name: 'SUNY Purchase',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/School_logo_%28State_University_of_New_York_at_Purchase%29.jpg',
      address: '735 Anderson Hill Road Purchase, NY 10577, USA',
       description: loremHipsum()
    })
   const NYU = await Campus.create( {
      name: 'NYU',
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmovement.nyu.edu%2Fcommotion%2FNYU_TORCH_TEXT.png&f=1&nofb=1',
      address: '70 Washington Square South,New York, NY, 10012,',
       description: loremHipsum()
    })

    await Student.create({
      firstName: "Mark",
      lastName: "Onofrio",
      email: "Onofri04@gmail.com",
      imageUrl: "/images/default_student.png",
        gpa: 4,
      campusId: NP.id
    })

     await Student.create({
      firstName: "Lauren",
      lastName: "Martin",
      email: "lauren.martin@gmail.com",
      imageUrl: "/images/default_student.png",
         gpa: 3,
      campusId: NYU.id
    })

    await Student.create({
      firstName: "Bob",
      lastName: "Barker",
      email: "bob.barker@gmail.com",
      imageUrl: "/images/default_student.png",
        gpa: 2,
      campusId: NYU.id
    })

     await Student.create({
      firstName: "Charlie",
      lastName: "Brown",
      email: "Charlie.brown@gmail.com",
      imageUrl: "/images/default_student.png",
         gpa: 4,
      campusId: Purchase.id
    })




  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
