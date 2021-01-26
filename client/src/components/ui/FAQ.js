import React from 'react';
import '../../assests/css/contact.css';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(22),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: '#333',
    display: 'flex',
    padding: '5px',
  },
  description: {
    fontSize: '2rem',
    letterSpacing: '.3px',
    lineHeight: '35px',
    padding: '10px',
    paddingTop: 0,
  },
}));

const FAQ = ({ id, title, description }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();
  return (
    <Accordion
      expanded={expanded === id}
      onChange={handleChange(id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ fontSize: '28px' }} />}
        aria-controls={id}
        id={id}
      >
        <Typography className={classes.title}>
          <i className="fa fa-arrow-circle-right iconStyle"></i> {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography className={classes.description}>{description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FAQ;
