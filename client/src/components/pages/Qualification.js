import React from 'react';
import Header from '../ui/Header';
import '../../assests/css/rules.css';

const Qualification = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="each_gallery__header">
          <h2>ICPC Preliminary Contest 2020</h2>
        </div>
        <div className="content-wrapper">
          <p>
            Thank you for registering for{' '}
            <strong>
              ICPC Dhaka Regional Online Preliminary Contest, 2020 hosted by
              CSE, University of Dhaka
            </strong>
            . Details of the <strong>online preliminary</strong> is given below:
          </p>

          <p>
            Date: 7th April, (Wednesday). Time: 3 PM - 8 PM
            <br />
            Contest Link:{' '}
            <a href="https://algo.codemarshal.org/contests/icpc-dhaka-20-preli">
              https://algo.codemarshal.org/contests/icpc-dhaka-20-preli
            </a>
          </p>

          <p>
            There will also be a <strong>mock session</strong>. The details of
            the mock is given below:
          </p>

          <p>
            Date: 6th April, (Tuesday). Time: 7 PM - 9 PM
            <br />
            Contest Link:{' '}
            <a href="https://algo.codemarshal.org/contests/icpc-dhaka-20-preli-mock">
              https://algo.codemarshal.org/contests/icpc-dhaka-20-preli-mock
            </a>
          </p>

          <p>
            We have created a unique username for your team to attend this
            contest. You MUST use this username to login to the contest arena.
          </p>

          <p>
            Please try to login with the credentials provided via your email
            address.
          </p>

          <p className="cm-btn">
            <a href="https://algo.codemarshal.org/login">CodeMarshal Login</a>
          </p>

          <p>
            If logged successfully, you should be able to see your Team Name on
            the right side of the topbar. In any kind of login issues, contact{' '}
            <a href="mailto:baps.bgd@gmail.com">baps.bgd@gmail.com</a>.
          </p>

          <p>
            <strong>
              You must use the username and password provided here. Your
              personal accounts won't work for the contest.
            </strong>
          </p>

          <p>
            For updates about ICPC please follow the official website:{' '}
            <a href="https://icpcdhaka.cse.du.ac.bd/">
              https://icpcdhaka.cse.du.ac.bd/
            </a>{' '}
            and the facebook page:{' '}
            <a href="https://www.facebook.com/icpcdhaka2020">
              https://www.facebook.com/icpcdhaka2020
            </a>
            . If you want to have updates through email, please subscribe to{' '}
            <a href="https://groups.google.com/g/icpcdhaka-announcements">
              https://groups.google.com/g/icpcdhaka-announcements
            </a>
            .
          </p>

          <p>
            <strong>Rules and Regulations:</strong>

            <ol>
              <li>
                1. It's a team contest. You are not allowed to take help of any
                person other than the contestants of your team.
              </li>
              <li>
                2. You are allowed to use books or online materials during the
                contest. But if more than one team copies from the same source
                code available online and that leads to plagiarism charges, the
                teams will be penalized.
              </li>
              <li>
                3. You cannot use any Q&A site such as stackoverflow or similar
                to ask for help from others.
              </li>
              <li>
                4. You cannot post your solution or give any hint about any
                problem during the contest. Even if you are using any pastebin
                site, it’s your responsibility that it remains private only to
                you and your team members.
              </li>
              <li>
                5. Teams may use multiple computers at the same time. Parallel
                coding, submission etc. are allowed.
              </li>
            </ol>
          </p>

          <p>
            <strong style={{ color: 'red' }}>
              ANY VIOLATION OF THE RULES AND REGULATIONS WILL RESULT IN YOUR
              TEAM'S DISQUALIFICATION.
            </strong>
          </p>

          <p>We hope you have an excellent contest. Happy coding!</p>

          <p>On behalf of the Judging team of ICPC Dhaka Regional, 2020</p>

          <p>
            Shahriar Manzoor
            <br />
            Judging Director, ICPC Dhaka Regional, 2020
            <br />
            President, Bangladesh Association of Problem Setters
            <br />
            Associate Professor, CSE, SEU
          </p>
        </div>
      </div>
    </div>
  );
};

export default Qualification;
