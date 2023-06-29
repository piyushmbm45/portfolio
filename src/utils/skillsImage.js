import bootstrap from '../assets/svg/skills/bootstrap.svg';
import css from '../assets/svg/skills/css.svg';
import docker from '../assets/svg/skills/docker.svg';
import git from '../assets/svg/skills/git.svg';
import go from '../assets/svg/skills/go.svg';
import html from '../assets/svg/skills/html.svg';
import javascript from '../assets/svg/skills/javascript.svg';
import markdown from '../assets/svg/skills/markdown.svg';
import materialui from '../assets/svg/skills/materialui.svg';
import mongoDB from '../assets/svg/skills/mongoDB.svg';
import mysql from '../assets/svg/skills/mysql.svg';
import nodejs from '../assets/svg/skills/nodejs.svg';
import postgresql from '../assets/svg/skills/postgresql.svg';
import react from '../assets/svg/skills/react.svg';
import tailwind from '../assets/svg/skills/tailwind.svg';
import typescript from '../assets/svg/skills/typescript.svg';

export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case 'docker':
      return docker;
    case 'html':
      return html;
    case 'nodejs':
      return nodejs;
    case 'css':
      return css;
    case 'javascript':
      return javascript;
    case 'react':
      return react;
    case 'typescript':
      return typescript;
    case 'bootstrap':
      return bootstrap;
    case 'bulma':
    case 'mongodb':
      return mongoDB;
    case 'mysql':
      return mysql;
    case 'postgresql':
      return postgresql;
    case 'tailwind':
      return tailwind;
    case 'vitejs':
    case 'go':
      return go;
    case 'aws':
    case 'git':
      return git;
    case 'graphql':
    case 'materialui':
      return materialui;
    case 'markdown':
      return markdown;
    default:
      break;
  }
};
