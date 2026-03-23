import React,{ useContext } from 'react';
import Marquee from "react-fast-marquee";

import './Skills.css'

import { ThemeContext } from '../../contexts/ThemeContext';
import { skillsData } from '../../data/skillsData'
import { skillsImage } from '../../utils/skillsImage'
import { motion } from 'framer-motion';

function Skills() {

    const { theme } = useContext(ThemeContext);

    const skillBoxStyle = {
        background: theme.type === 'dark'
            ? 'rgba(255, 255, 255, 0.06)'
            : 'rgba(255, 255, 255, 0.7)',
        boxShadow: `0px 0px 20px ${theme.primary30}`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${theme.primary30}`,
    }

    return (
        <div className="skills" style={{backgroundColor: theme.secondary}}>
            <motion.div className="skillsHeader"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
                <h2 style={{color: theme.primary}}>Skills</h2>
            </motion.div>
            <motion.div className="skillsContainer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="skill--scroll">
                    <Marquee 
                        gradient={false} 
                        speed={80} 
                        pauseOnHover={true}
                        pauseOnClick={true} 
                        delay={0}
                        play={true} 
                        direction="left"
                    >
                        {skillsData.map((skill, id) => (
                            <div className="skill--box" key={id} style={skillBoxStyle}>
                                <img src={skillsImage(skill)} alt={skill} />
                                <h3 style={{color: theme.tertiary}}>
                                    {skill}
                                </h3>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </motion.div>
        </div>
    )
}

export default Skills
