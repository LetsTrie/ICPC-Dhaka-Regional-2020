import React from 'react';
import Header from '../ui/Header';
import '../../assests/css/rules.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const committee = [
  {
    name: 'Muhammad Zafar Iqbal',
    affiliation: 'Professor (retd.) SUST',
    role: 'Chief Judge'
  },
  {
    name: 'M. Kaykobad',
    affiliation: 'BRAC University',
    role: 'Judging Advisor'
  },
  {
    name: 'Shahriar Manzoor',
    affiliation: 'Southeast University',
    role: 'Judging Director, Problem-setter'
  },
  {
    name: 'Hasnain Heickal',
    affiliation: 'University of Dhaka',
    role: 'Judging Coordinator, Problem-setter, Alternate Writer, ester'
  },
  {
    name: 'Derek Kisman',
    affiliation: 'Apple',
    role: 'Reviewer, Tester'
  },
  {
    name: 'Md Mahbubul Hasan',
    affiliation: 'Google',
    role: 'Reviewer, Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Raihat Zaman Neloy',
    affiliation: 'Google',
    role: 'Reviewer, Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Sabit Anwar Zahin',
    affiliation: 'Newscred',
    role: 'Reviewer, Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Anindya Das',
    affiliation: 'Singularity',
    role: 'IM Problem-setter, Alternate Writer'
  },
  {
    name: 'Nafis Sadique',
    affiliation: 'Google',
    role: 'Problem-setter, Alternate Writer'
  },
  {
    name: 'Anik Sarker',
    affiliation: 'Google',
    role: 'Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Aminul Haq',
    affiliation: 'Tiger IT',
    role: 'Bangladesh Ltd. Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Saad Muhammed Junayed',
    affiliation: 'PriyoSys Ltd.',
    role: 'Problem-setter'
  },
  {
    name: 'Mohammad Ashraful Islam',
    affiliation: 'Jahangirnagar University',
    role: 'Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Tanmoy Datta',
    affiliation: 'Tiger IT Bangladesh Ltd.',
    role: 'Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Tanveer Muttaqueen',
    affiliation: 'PriyoSys Ltd',
    role: 'Problem-setter, Tester'
  },
  {
    name: 'Shahed Shahriar',
    affiliation: 'Google',
    role: 'Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Tanzir Islam Pial',
    affiliation: 'Stony Brook University',
    role: 'Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Mehdi Rahman',
    affiliation: 'Tiger IT Bangladesh Ltd.',
    role: 'Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Rezwan Mahmud',
    affiliation: 'InterviewKickstart',
    role: 'Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Sourav Sen Tonmoy',
    affiliation: 'Grab',
    role: 'Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Hasin Rayhan Dewan Dhruboo',
    affiliation: 'Tiktok',
    role: 'Problem-setter, Alternate Writer, Tester'
  },
  {
    name: 'Md. Imran Bin Azad',
    affiliation: 'University of Asia Pacific',
    role: 'Logistics Coordinator, Alternate Writer, Tester'
  },
  {
    name: 'Muhammad Ridowan',
    affiliation: 'Tiger IT Bangladesh Ltd.',
    role: 'Alternate Writer, Tester'
  },
  {
    name: 'Bir Bahadur Khatri',
    affiliation: 'Google',
    role: 'Alternate Writer, Tester'
  },
  {
    name: 'Abdullah Al Maruf',
    affiliation: 'University of Missouri',
    role: 'Alternate Writer, Tester'
  },
  {
    name: 'Md Shafiul Islam',
    affiliation: 'Amazon',
    role: 'Alternate Writer, Tester'
  },
  {
    name: 'Shadman Shadab',
    affiliation: 'NewsCred',
    role: 'Alternate Writer, Tester'
  },
  {
    name: 'Farhan Hasin',
    affiliation: 'PriyoSys Ltd.',
    role: 'Alternate Writer, Tester'
  },
  {
    name: 'Monirul Hasan',
    affiliation: 'Zaag Systems Ltd & K M Hasan Co',
    role: 'Judge'
  },
  {
    name: 'Mahafuzur Rahman',
    affiliation: 'CodeMarshal & SureCash',
    role: 'Judge'
  }
]

const table = (classes, committee) => {
  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell style={{fontSize: '20px'}}>SL</TableCell>
          <TableCell style={{fontSize: '20px'}} align="right">Role</TableCell>
          <TableCell style={{fontSize: '20px'}} align="right">Name</TableCell>
          <TableCell style={{fontSize: '20px'}} align="right">Affiliation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {
        committee.map((item, i) => (
          <TableRow>
            <TableCell component="th" scope="row" style={{fontSize: '17px'}}>
             {i+1}
            </TableCell>
            <TableCell style={{fontSize: '17px'}} align="right">{item.role}</TableCell>
            <TableCell style={{fontSize: '17px'}} align="right">{item.name}</TableCell>
            <TableCell style={{fontSize: '17px'}} align="right">{item.affiliation}</TableCell>
          </TableRow>
        ))
      }
      </TableBody>
    </Table>
  </TableContainer>
  )
}

const hStyles = {
  padding: '50px 0',
  textAlign: 'center'
}

const JudgePanel = () => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div className="container" style={{marginTop: '50px'}}>
        <div className="each_gallery__header">
          <h2 style={{fontSize: '2rem'}}>
                    International Collegiate Programming Contest <br/>
                    ICPC Regional contest – Dhaka Site 2020<br/>
                    University of Dhaka, Bangladesh<br/>
                    Judging Panel
          </h2>
        </div>
        <div className="content-wrapper">
          { table(classes, committee) }
        </div>
      </div>
    </div>
  );
};

export default JudgePanel;
