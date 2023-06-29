import React from 'react';
import { Helmet } from 'react-helmet';

import {
  About,
  Achievement,
  Contacts,
  Education,
  Experience,
  Footer,
  Landing,
  Navbar,
  Projects,
  Services,
  Skills,
} from '../../components';
import { headerData } from '../../data/headerData';

function Main() {
  return (
    <div>
      <Helmet>
        <title>{headerData.name} - Portfolio</title>
      </Helmet>

      <Navbar />
      <Landing />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Achievement />
      <Services />
      <Contacts />
      <Footer />
    </div>
  );
}

export default Main;
