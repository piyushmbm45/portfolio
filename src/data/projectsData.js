import one from '../assets/svg/projects/one.svg';
import two from '../assets/svg/projects/two.svg';

export const projectsData = [
  {
    id: 1,
    projectName: 'User Authentication',
    projectDesc:
      'Personalized data is key to the success of many online businesses. Thus Authenticating of the users is the first step for such websites. This project implements the user authentication using multiple strategies.',
    tags: ['Ejs', 'Node js', 'MongoDB', 'Bootstrap'],
    code: 'https://github.com/piyushmbm45/passportAuth',
    demo: 'https://passport-auth-app.onrender.com/',
    image: one,
  },
  {
    id: 2,
    projectName: 'The Great Burger',
    projectDesc:
      'Developing a full-stack web application, "The Great Burger", using MERN that allows users to order burger. This Project is highly adaptable by just changing some json data it will convert into food delivery app, Cloth delivery app etc.',
    tags: ['Express', 'Tailwind CSS', 'MongoDb'],
    code: 'https://github.com/piyushmbm45/burgerDelivery-MERN',
    demo: '',
    image: two,
  },
];

// Do not remove any fields.
// Leave it blank instead as shown below

/* 
{
    id: 1,
    projectName: 'Car Pooling System',
    projectDesc: '',
    tags: ['Flutter', 'React'],
    code: '',
    demo: '',
    image: ''
}, 
*/
