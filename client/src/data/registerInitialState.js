export default function (numberOfParticipants) {
  let participantField = {};
  for (let member = 1; member <= numberOfParticipants; member++) {
    participantField = {
      ...participantField,
      [`p${member}Firstname`]: '',
      [`p${member}Lastname`]: '',
      [`p${member}Email`]: '',
      [`p${member}Year`]: '',
      [`p${member}Semester`]: '',
      [`p${member}TshirtSize`]: '',
      [`p${member}Affiliation`]: '',
      [`p${member}Dp`]: null,
    };
  }

  return {
    numberOfParticipants,
    teamName: '',
    university: '',
    password: '',
    confirmPassword: '',
    coachFirstName: '',
    coachLastName: '',
    coachEmail: '',
    coachAffiliation: '',
    coachDesignation: '',
    coachTshirtSize: '',
    coachDp: null,
    ...participantField,
  };
}
