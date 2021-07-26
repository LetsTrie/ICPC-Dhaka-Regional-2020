const { v4: uuidv4 } = require('uuid');
const getHostname = require('../utils/getHostname');

module.exports = (req, team) => {
  const { _id, Team_Name, Country, University, Coach, Coach_Email } = team;
  console.log({ team });
  const host = getHostname(req, 5000);
  return {
    total_amount: parseInt(process.env.FINAL_CONTEST_FEE),
    currency: 'BDT',
    tran_id: uuidv4(),
    success_url: `${host}/api/v1/auth/register/payment/success`,
    fail_url: `${host}/api/v1/auth/register/payment/unsuccessful`,
    cancel_url: `${host}/api/v1/auth/register/payment/failed`,
    shipping_method: 'NO',
    product_name: 'ICPC Dhaka Regional 2020',
    product_category: 'Preliminary Registration',
    product_profile: 'general',
    cus_name: Team_Name,
    cus_email: Coach_Email,
    cus_add1: University,
    cus_city: 'N/A',
    cus_postcode: 'N/A',
    cus_country: Country,
    cus_phone: 'N/A',
    ship_name: Coach,
    ship_add1: 'N/A',
    ship_city: 'N/A',
    ship_state: 'N/A',
    ship_postcode: 'N/A',
    ship_country: 'N/A',
    value_a: _id,
  };
};
