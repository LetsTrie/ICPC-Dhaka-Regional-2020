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
    role: 'Chief Patron',
    name: 'Professor Dr. Md. Akhtaruzzaman',
    affiliation: 'Vice Chancellor, University of Dhaka'
  },
  {
    role: 'Patron',
    name: 'Professor Dr. C J Hwang ',
    affiliation: 'ICPC Asia Contests Director'
  },
  {
    role: 'Chair',
    name: 'Professor Dr. Mustafizur Rahman',
    affiliation: 'CSE, University of Dhaka'
  },
  {
    role: 'Co-chair',
    name: 'Professor Dr. Saifuddin Md. Tareeq',
    affiliation: 'CSE, University of Dhaka'
  },
  {
    role: 'Member',
    name: 'Professor M. Kaykobad ',
    affiliation: 'CSE, BRAC University (Ex-Professor, CSE, BUET)'
  },
  {
    role: 'Member',
    name: 'Professor Mohammad Abdullah Al Mumin',
    affiliation: 'Head, CSE, Shahjalal University of Science and Technology'
  },
  {
    role: 'Member',
    name: 'Professor Dr. A. K. M. Ashikur Rahman',
    affiliation: 'Head, CSE, Bangladesh University of Engineering and Technology'
  },
  {
    role: 'Member',
    name: 'Professor Dr. Liton Jude Rozario',
    affiliation: 'Chairman, CSE, Jahangir Nagar University'
  },
  {
    role: 'Member',
    name: 'Professor Abu Raihan Mostofa Kamal',
    affiliation: 'Head, CSE, Islamic University of Technology'
  },
  {
    role: 'Member',
    name: 'Dr. Mohammad Rezaul Bari',
    affiliation: 'Chair, ECE, North South University'
  },
  {
    role: 'Member',
    name: 'Dr. Taskeed Jabid',
    affiliation: 'Chairperson, CSE, East West University'
  },
  {
    role: 'Member',
    name: 'Sadia Hamid Kazi',
    affiliation: 'Head, CSE, BRAC University'
  },
  {
    role: 'Member',
    name: 'Shahriar Manzoor',
    affiliation: 'Chairman, CSE, South East University'
  },
  {
    role: 'Member',
    name: 'Dr. Md. Mahbub Chowdhury Mishu',
    affiliation: 'Head, CS, American International University Bangladesh'
  },
  {
    role: 'Member',
    name: 'Professor Dr. Touhid Bhuiyan',
    affiliation: 'Head, CSE, Daffodil International University'
  },
  {
    role: 'Member',
    name: 'Parthapratim Deb',
    affiliation: 'Executive Director, BCC'
  },
  {
    role: 'Member',
    name: 'Engr. Mohammad',
    affiliation: 'Director (Training), BCC'
  },

  // key admin positions

  {
    role: 'Regional Contest Director',
    name: 'Professor Dr. Md Mustafizur Rahman ',
    affiliation: 'CSE, University of Dhaka'
  },
  {
    role: 'Associate Regional Contest Director',
    name: 'Professor Dr. Abul Lais M.S. Haque ',
    affiliation: 'CS, Presidency University'
  },
  {
    role: 'Judging Advisor',
    name: 'Professor M. Kaykobad ',
    affiliation: 'CSE, BRAC University (Ex-Professor, CSE, BUET)'
  },
  {
    role: 'Chief Judge',
    name: 'Professor Dr. Muhammed Zafar Iqbal',
    affiliation: 'CSE, Shahjalal University of Science and Technology'
  },
  {
    role: 'Judging Director',
    name: 'Shahriar Manzoor',
    affiliation: 'CSE, Southeast University'
  },
  {
    role: 'Judging Coordinator',
    name: 'Hasnain Heickal ',
    affiliation: 'CSE, University of Dhaka'
  },
]

const table = (classes, committee) => {
  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>SL</TableCell>
          <TableCell align="right">Role</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Affiliation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {
        committee.map((item, i) => (
          <TableRow>
            <TableCell component="th" scope="row">
             {i+1}
            </TableCell>
            <TableCell align="right">{item.role}</TableCell>
            <TableCell align="right">{item.name}</TableCell>
            <TableCell align="right">{item.affiliation}</TableCell>
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

const SteeringCommittee = () => {
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
                    Steering Committee
          </h2>
        </div>
        <div className="content-wrapper">
          { table(classes, committee.slice(0, 16)) }
          <h2 style={hStyles}>Key Administrative Positions</h2>
          { table(classes, committee.slice(17, committee.length)) }
        </div>
      </div>
    </div>
  );
};

export default SteeringCommittee;
