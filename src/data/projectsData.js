import one from '../assets/svg/projects/one.svg';
import two from '../assets/svg/projects/two.svg';
import three from '../assets/svg/projects/three.svg';
import four from '../assets/svg/projects/four.svg';
import five from '../assets/svg/projects/five.svg';

export const projectsData = [
  {
    id: 1,
    projectName: 'pg-lens',
    projectDesc:
      'A CLI + API toolkit to analyze and optimize PostgreSQL performance. Detects slow queries, missing indexes, table bloat, and unused indexes with actionable recommendations.',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'CLI'],
    code: 'https://github.com/piyushmbm45/pg-lens',
    demo: 'https://www.npmjs.com/package/pg-lens',
    image: three,
  },
  {
    id: 2,
    projectName: 'User Authentication',
    projectDesc:
      'Full-stack user authentication system implementing multiple Passport.js strategies including local, Google, and Facebook OAuth for secure login workflows.',
    tags: ['Node.js', 'MongoDB', 'Passport.js', 'EJS'],
    code: 'https://github.com/piyushmbm45/passportAuth',
    demo: 'https://passport-auth-app.onrender.com/',
    image: one,
  },
  {
    id: 3,
    projectName: 'The Great Burger',
    projectDesc:
      'A full-stack MERN food delivery app with a highly adaptable architecture — swap JSON config to convert it into any delivery platform.',
    tags: ['React', 'Express', 'MongoDB', 'Tailwind CSS'],
    code: 'https://github.com/piyushmbm45/burgerDelivery-MERN',
    demo: '',
    image: two,
  },
  {
    id: 4,
    projectName: 'Password Generator',
    projectDesc:
      'A React + TypeScript password generator with customizable length, character sets, and strength indicator. Built with Vite and Tailwind CSS.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    code: 'https://github.com/piyushmbm45/password_generator',
    demo: 'https://piyushmbm45.github.io/password_generator/',
    image: four,
  },
  {
    id: 5,
    projectName: 'Node AWS S3',
    projectDesc:
      'A Node.js boilerplate for AWS S3 operations — file upload, download, delete, and bucket management via REST APIs using AWS SDK v3.',
    tags: ['Node.js', 'AWS S3', 'REST API', 'JavaScript'],
    code: 'https://github.com/piyushmbm45/node-aws-s3',
    demo: '',
    image: five,
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
