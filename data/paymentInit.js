const { v4: uuidv4 } = require('uuid');
const getHostname = require('../utils/getHostname');

module.exports = (req) => {
  const { teamId, teamName, country, institution, coach } = req.query;
  return {
    total_amount: parseInt(process.env.Fee),
    currency: 'BDT',
    tran_id: uuidv4(),
    success_url: `${getHostname(
      req,
      5000
    )}/api/v1/auth/register/payment/IpnListener?teamId=${teamId}&teamName=${teamName}&country=${country}&institution=${institution}&coach=${coach}`,
    fail_url: `${getHostname(
      req,
      5000
    )}/api/v1/auth/register/payment/unsuccessful`,
    cancel_url: `${getHostname(req, 5000)}/api/v1/auth/register/payment/failed`,
    shipping_method: 'Courier',
    product_name: 'contest',
    product_category: 'contestFee',
    product_profile: 'general',
    cus_name: teamName,
    cus_email: 'cust@yahoo.com',
    cus_add1: institution,
    cus_city: 'Dhaka',
    cus_postcode: '1000',
    cus_country: country,
    cus_phone: '01711111111',
    ship_name: coach,
    ship_add1: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
    multi_card_name: 'mastercard',
  };
};
