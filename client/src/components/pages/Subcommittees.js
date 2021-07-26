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

const committees = [
    {
        title: 'Fund-Raising Sub-committee',
        members: [
            'Prof. Dr. Md. Mustafizur Rahman, CSE, DU',
            'Prof. Dr. Hafiz Md. Hasan Babu, CSE, DU',
            'Prof. Dr. Md. Hasanuzzaman, CSE, DU',
            'Prof. Dr. Mamun-or-Rashid, CSE, DU',
            'Prof. Dr. Muhammad Asif Hossain Khan, CSE, DU',
            'Dr. Muhammad Ibrahim, CSE, DU',
        ]
    },
    {
        title: 'Registration Sub-committee',
        members: [
            'Prof. Dr. Saifuddin Md. Tareeq, CSE, DU',
            'Dr. Ismat Rahman, CSE, DU',
            'Md. Mahmudur Rahman, CSE, DU',
           'Md. Ashraful Islam, CSE, DU',
        ]
    },
    {
        title: 'Website Maintenance Sub-committee',
        members: [
            'Dr. Mosarrat Jahan, CSE, DU',
            'Dr. Sarker Tanveer Ahmed Rumee, CSE, DU',
            'Dr. Md. Samiullah, CSE, DU',
            'Dr. Muhammad Ibrahim, CSE, DU',
            'Md. Ashraful Islam, CSE, DU',
            'Hussain Safwan, CSE, DU (Website Developer)',
            'Sakib Khan, CSE, DU (Website Developer)',
        ]
    },
    {
        title: 'Reception Sub-committee',
        members: [
            'Prof. Dr. Suraiya Pervin, CSE, DU',
            'Prof. Dr. Md. Haider Ali, CSE, DU',
            'Prof. Dr. Hafiz Md. Hasan Babu, CSE, DU',
            'Prof. Dr. Md. Hasanuzzaman, CSE, DU',
            'Prof. Dr. Chowdhury Farhan Ahmed, CSE, DU',
            'Prof. Dr. Mamun-or-Rashid, CSE, DU',
            'Prof. Dr. Muhammad Asif Hossain Khan, CSE, DU',
        ]
    },
    {
        title: 'Publicity and Publication Sub-committee',
        members: [
            'Prof. Dr. Md. Rezaul Karim, CSE, DU',
            'Abu Ahmed Ferdaus, CSE, DU',
            'Dr. Muhammad Ibrahim, CSE, DU',
            'Hasnain Heickal, CSE, DU',
        ]
    },
    {
        title: 'System (Hardware/Software) Sub-committee',
        members: [
            'Prof. Dr. Md. Mustafizur Rahman, CSE, DU',
            'Prof. Dr. Shabbir Ahmed, CSE, DU',
            'Prof. Dr. Mamun-or-Rashid, CSE, DU',
            'Prof. Dr. Muhammad Asif Hossain Khan, CSE, DU',
            'Dr. Sarker Tanveer Ahmed Rumee, CSE, DU',
            'Dr. Md. Mosaddek Khan, CSE, DU',
        ]
    },
    {
        title: 'Account Management Sub-committee',
        members: [
            'Abu Ahmed Ferdaus, CSE, DU',
            'Dr. Ismat Rahman, CSE, DU',
            'Dr. Md.Samiullah, CSE, DU',
        ]
    },
    {
        title: 'Venue Management Sub-committee',
        members: [
            'Prof. Dr. Upama Kabir, CSE, DU',
            'Dr. Mosarrat Jahan, CSE, DU',
            'Dr. Ismat Rahman, CSE, DU',
            'Hasnain Heickal, CSE, DU',
        ]
    },
    {
        title: 'Food Management Sub-committee',
        members: [
            'Prof. Dr. Md. Haider Ali, CSE, DU',
            'Prof. Dr. Chowdhury Farhan Ahmed',
        ]
    },
    {
        title: 'Volunteer Management Sub-committee',
        members: [
            'Prof. Dr. Upama Kabir, CSE, DU',
            'Abu Ahmed Ferdaus, CSE, DU',
            'Dr. Ismat Rahman, CSE, DU',
        ]
    },
    {
        title: 'Prize Giving and Celebration Sub-committee',
        members: [
            'Prof. Dr. Hafiz Md. Hasan Babu, CSE, DU',
            'Dr. Sarker Tanveer Ahmed Rumee, CSE, DU',
        ]
    }
]

const hStyles = {
  fontSize: '30px',
  marginTop: '20px'
}

const Subcommittees = () => {
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
                    Sub-Committees
          </h2>
        </div>
        <div className="content-wrapper side" >
          {
            committees.map(com => (
                <>
                <h2 style={hStyles}>{ com.title }</h2>
                {
                    com.members.map((member, i) => <p><strong>{i+1}. { member }</strong></p>)
                }
                </>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Subcommittees;
