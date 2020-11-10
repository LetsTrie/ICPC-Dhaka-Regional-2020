const validate = data => {
  let error = false
  let msg = 'Your team has successfully been registered'
  const { teamInfo, membersInfo } = data 

  const check = str => {
    return str == '' || str == null || str == undefined
  }

  if (check(teamInfo.teamName)) {
    error = true
    msg = 'Enter the name of the team'
  } else if (check(teamInfo.coachFirstName)) {
    error = true
    msg = 'Enter the name of the coach'
  } else if (check(teamInfo.coachLastName)) {
    error = true
    msg = 'Enter the name of the coach'
  } else if (check(teamInfo.university)) {
    error = true
    msg = 'Enter the name of the university'
  } else if (check(teamInfo.email) || !/\S+@\S+\.\S+/.test(teamInfo.email)) {
    error = true
    msg = 'Incorrect email address'
  } else if (membersInfo.length < 2) {
    error = true
    msg = 'At least 2 members required to form a team'
  }else {
    for (let member of membersInfo) {
      if (check(member.memberFirstName)) {
        error = true
        msg = 'Enter the first name for each member'
      } else if (check(member.memberLastName)) {
        error = true
        msg = 'Enter the first name for each member'
      } else if (check(member.memberYear)) {
        error = true
        msg = 'Enter the current year for each member'
      } else if (check(member.memberSemester)) {
        error = true
        msg = 'Enter the current semester for each member'
      } else if (check(member.memberEmail) || !/\S+@\S+\.\S+/.test(member.memberEmail)) {
        error = true
        msg = 'Enter the email address for each member'
      } else if (check(member.tshirtSize)) {
        error = true
        msg = 'Enter the tshirt size for each member'
      } else if (check(member.image)) {
        error = true
        msg = 'Upload a display image for each member'
      }
    }
  }

  return {
    error,
    msg
  }

}

export default validate