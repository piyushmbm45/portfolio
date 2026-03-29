import React, { useContext, useState } from 'react';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';
import { makeStyles } from '@material-ui/core/styles';
import {
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaBloggerB,
  FaRedditAlien,
  FaStackOverflow,
  FaCodepen,
  FaInstagram,
  FaGitlab,
  FaMediumM,
} from 'react-icons/fa';
import { AiOutlineSend, AiOutlineCheckCircle } from 'react-icons/ai';
import { FiPhone, FiAtSign } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { ThemeContext } from '../../contexts/ThemeContext';

import { socialsData } from '../../data/socialsData';
import { contactsData } from '../../data/contactsData';
import './Contacts.css';

const profanityList = [
  'fuck', 'shit', 'ass', 'bitch', 'damn', 'crap', 'dick', 'bastard',
  'asshole', 'bullshit', 'cunt', 'piss', 'slut', 'whore', 'idiot',
  'stupid', 'dumb', 'moron', 'retard', 'nigger', 'faggot',
];

const sanitizeText = (text) => {
  const words = text.split(/(\s+)/);
  return words.map((word) => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
    if (profanityList.some((bad) => clean.includes(bad))) {
      return '*'.repeat(word.length);
    }
    return word;
  }).join('');
};

function Contacts() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const { theme } = useContext(ThemeContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const useStyles = makeStyles((t) => ({
    input: {
      border: `4px solid ${theme.primary80}`,
      backgroundColor: `${theme.secondary}`,
      color: `${theme.tertiary}`,
      fontFamily: 'var(--primaryFont)',
      fontWeight: 500,
      transition: 'border 0.2s ease-in-out',
      '&:focus': {
        border: `4px solid ${theme.primary600}`,
      },
    },
    message: {
      border: `4px solid ${theme.primary80}`,
      backgroundColor: `${theme.secondary}`,
      color: `${theme.tertiary}`,
      fontFamily: 'var(--primaryFont)',
      fontWeight: 500,
      transition: 'border 0.2s ease-in-out',
      '&:focus': {
        border: `4px solid ${theme.primary600}`,
      },
    },
    label: {
      backgroundColor: `${theme.secondary}`,
      color: `${theme.primary}`,
      fontFamily: 'var(--primaryFont)',
      fontWeight: 600,
      fontSize: '0.9rem',
      padding: '0 5px',
      transform: 'translate(25px,50%)',
      display: 'inline-flex',
    },
    socialIcon: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '21px',
      backgroundColor: theme.primary,
      color: theme.secondary,
      transition: '250ms ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
        color: theme.secondary,
        backgroundColor: theme.tertiary,
      },
    },
    detailsIcon: {
      backgroundColor: theme.primary,
      color: theme.secondary,
      borderRadius: '50%',
      width: '45px',
      height: '45px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '23px',
      transition: '250ms ease-in-out',
      flexShrink: 0,
      '&:hover': {
        transform: 'scale(1.1)',
        color: theme.secondary,
        backgroundColor: theme.tertiary,
      },
    },
    submitBtn: {
      backgroundColor: theme.primary,
      color: theme.secondary,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.08) translateY(-2px)',
        color: theme.secondary,
        backgroundColor: theme.tertiary,
        boxShadow: `0 0 20px ${theme.primary50}, 0 0 40px ${theme.primary30}`,
      },
    },
  }));

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const handleContactForm = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !message.trim()) {
      setErrMsg('All fields are required');
      setOpen(true);
      return;
    }

    if (trimmedName.length < 2) {
      setErrMsg('Name must be at least 2 characters');
      setOpen(true);
      return;
    }

    if (trimmedName.length > 100) {
      setErrMsg('Name must be under 100 characters');
      setOpen(true);
      return;
    }

    if (/^\d+$/.test(trimmedName)) {
      setErrMsg('Name cannot be all numbers');
      setOpen(true);
      return;
    }

    if (!/[a-zA-Z]/.test(trimmedName)) {
      setErrMsg('Name must contain at least one letter');
      setOpen(true);
      return;
    }

    if (/[<>{}[\]\\/]/.test(trimmedName)) {
      setErrMsg('Name contains invalid characters');
      setOpen(true);
      return;
    }

    if (!isEmail(trimmedEmail)) {
      setErrMsg('Invalid email address');
      setOpen(true);
      return;
    }

    if (trimmedEmail.length > 254) {
      setErrMsg('Email address is too long');
      setOpen(true);
      return;
    }

    const emailDomain = trimmedEmail.split('@')[1];
    if (!emailDomain || !emailDomain.includes('.')) {
      setErrMsg('Invalid email domain');
      setOpen(true);
      return;
    }

    if (message.trim().length < 50) {
      setErrMsg(`Message too short (${message.trim().length}/50 characters minimum)`);
      setOpen(true);
      return;
    }

    if (message.trim().length > 500) {
      setErrMsg('Message too long (500 characters maximum)');
      setOpen(true);
      return;
    }

    const cleanName = sanitizeText(trimmedName);
    const cleanMessage = sanitizeText(message.trim());

    setLoading(true);

    try {
      const res = await axios.post('https://api.web3forms.com/submit', {
        access_key: contactsData.web3formsKey,
        name: cleanName,
        email: trimmedEmail,
        message: cleanMessage,
        subject: `New message from ${cleanName} via Portfolio`,
      });

      if (res.data.success) {
        setSuccess(true);
        setErrMsg('');
        setName('');
        setEmail('');
        setMessage('');
        setOpen(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setErrMsg('Something went wrong. Please try again.');
        setOpen(true);
      }
    } catch (err) {
      setErrMsg('Failed to send. Please try again later.');
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="contacts" id="contacts" style={{ backgroundColor: theme.secondary }}>
      <div className="contacts--container">
        <h1 style={{ color: theme.primary }}>Contacts</h1>
        <div className="contacts-body">
          <motion.div
            className="contacts-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleContactForm}>
              <div className="input-container">
                <label htmlFor="Name" className={classes.label}>
                  Name <span style={{ color: '#f44336' }}>*</span>
                </label>
                <input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    if (e.target.value.length <= 100) setName(e.target.value);
                  }}
                  type="text"
                  name="Name"
                  required
                  minLength={2}
                  maxLength={100}
                  className={`form-input ${classes.input}`}
                />
              </div>
              <div className="input-container">
                <label htmlFor="Email" className={classes.label}>
                  Email <span style={{ color: '#f44336' }}>*</span>
                </label>
                <input
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="Email"
                  required
                  className={`form-input ${classes.input}`}
                />
              </div>
              <div className="input-container">
                <label htmlFor="Message" className={classes.label}>
                  Message <span style={{ color: '#f44336' }}>*</span>
                </label>
                <textarea
                  placeholder="Type your message (min 50 characters)..."
                  value={message}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) setMessage(e.target.value);
                  }}
                  name="Message"
                  required
                  minLength={50}
                  maxLength={500}
                  className={`form-message ${classes.message}`}
                />
                <span
                  className="char-counter"
                  style={{
                    color: message.length < 50 ? theme.tertiary50 : message.length > 450 ? '#f44336' : theme.tertiary50,
                  }}
                >
                  {message.length}/500 {message.length < 50 && `(${50 - message.length} more needed)`}
                </span>
              </div>

              <div className="submit-btn">
                <button type="submit" className={classes.submitBtn} disabled={loading}>
                  <p>{loading ? 'Sending...' : success ? 'Sent!' : 'Send'}</p>
                  <div className="submit-icon">
                    <AiOutlineSend
                      className="send-icon"
                      style={{
                        display: success ? 'none' : 'inline-flex',
                      }}
                    />
                    <AiOutlineCheckCircle
                      className="success-icon"
                      style={{
                        display: !success ? 'none' : 'inline-flex',
                      }}
                    />
                  </div>
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            className="contacts-details"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {contactsData.email && (
              <a href={`mailto:${contactsData.email}`} className="personal-details">
                <div className={classes.detailsIcon}>
                  <FiAtSign />
                </div>
                <p style={{ color: theme.tertiary }}>{contactsData.email}</p>
              </a>
            )}
            {contactsData.phone && (
              <a href={`tel:${contactsData.phone}`} className="personal-details">
                <div className={classes.detailsIcon}>
                  <FiPhone />
                </div>
                <p style={{ color: theme.tertiary }}>{contactsData.phone}</p>
              </a>
            )}
            {contactsData.address && (
              <div className="personal-details">
                <div className={classes.detailsIcon}>
                  <HiOutlineLocationMarker />
                </div>
                <p style={{ color: theme.tertiary }}>{contactsData.address}</p>
              </div>
            )}

            <div className="socialmedia-icons">
              {socialsData.twitter && (
                <a
                  href={socialsData.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaTwitter aria-label="Twitter" />
                </a>
              )}
              {socialsData.github && (
                <a
                  href={socialsData.github}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaGithub aria-label="GitHub" />
                </a>
              )}
              {socialsData.linkedIn && (
                <a
                  href={socialsData.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaLinkedinIn aria-label="LinkedIn" />
                </a>
              )}
              {socialsData.instagram && (
                <a
                  href={socialsData.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaInstagram aria-label="Instagram" />
                </a>
              )}
              {socialsData.medium && (
                <a
                  href={socialsData.medium}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaMediumM aria-label="Medium" />
                </a>
              )}
              {socialsData.blogger && (
                <a
                  href={socialsData.blogger}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaBloggerB aria-label="Blogger" />
                </a>
              )}
              {socialsData.youtube && (
                <a
                  href={socialsData.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaYoutube aria-label="YouTube" />
                </a>
              )}
              {socialsData.reddit && (
                <a
                  href={socialsData.reddit}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaRedditAlien aria-label="Reddit" />
                </a>
              )}
              {socialsData.stackOverflow && (
                <a
                  href={socialsData.stackOverflow}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaStackOverflow aria-label="Stack Overflow" />
                </a>
              )}
              {socialsData.codepen && (
                <a
                  href={socialsData.codepen}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaCodepen aria-label="CodePen" />
                </a>
              )}
              {socialsData.gitlab && (
                <a
                  href={socialsData.gitlab}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaGitlab aria-label="GitLab" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <img src={theme.contactsimg} alt="contacts" className="contacts--img" />
    </div>

    {/* Error Snackbar — outside contacts div to avoid stacking context issues */}
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open && !success}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <SnackbarContent
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        style={{
          backgroundColor: '#f44336',
          color: '#fff',
          fontFamily: 'var(--primaryFont)',
        }}
        message={errMsg}
      />
    </Snackbar>

    {/* Success Snackbar */}
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open && success}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <SnackbarContent
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        style={{
          backgroundColor: '#4caf50',
          color: '#fff',
          fontFamily: 'var(--primaryFont)',
          fontWeight: 500,
        }}
        message="Message sent! I'll get back to you soon."
      />
    </Snackbar>
    </>
  );
}

export default Contacts;
