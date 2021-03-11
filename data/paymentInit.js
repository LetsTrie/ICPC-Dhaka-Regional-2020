const { v4: uuidv4 } = require('uuid');
const getHostname = require('../utils/getHostname');

module.exports = (req, team) => {
  const { _id, Team_Name, Country, University, Coach, Coach_Email } = team;
  const host = getHostname(req, 5000);
  return {
    total_amount: parseInt(process.env.Fee),
    currency: 'BDT',
    tran_id: uuidv4(),
    success_url: `${host}/api/v1/auth/register/payment/IpnListener?teamId=${_id}&teamName=${Team_Name}&country=${Country}&institution=${University}&coach=${Coach}`,
    fail_url: `${host}/api/v1/auth/register/payment/unsuccessful`,
    cancel_url: `${host}/api/v1/auth/register/payment/failed`,
    shipping_method: 'Courier',
    product_name: 'icpc',
    product_category: 'contestFee',
    product_profile: 'general',
    cus_name: Team_Name,
    cus_email: Coach_Email,
    cus_add1: University,
    cus_city: 'Dhaka',
    cus_postcode: '1000',
    cus_country: Country,
    cus_phone: '01711111111',
    ship_name: Coach,
    ship_add1: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
    multi_card_name: 'internetbank',
  };
};
