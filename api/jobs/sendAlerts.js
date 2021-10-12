const asyncForEach = require('../utils/asyncForEach');
const Alert = require('../models/Alert');
const User = require('../models/User');
const os = require('os');
const sendEmail = require('../utils/sendEmail');

const sendAlerts = (host, port) => async () => {
  console.log(`[cron:sendAlerts] Server running a scheduled job`.magenta);
  const alerts = await Alert.find({}).select('+user');
  asyncForEach(alerts, async (alert) => {
    if (!shouldAlert(alert)) return;
    const user = await User.findById(alert.user);
    try {
      await sendEmail({
        email: user.email,
        subject: 'Search Alerts',
        message: getAlertEmailMessage(alert.query, host, port),
      });
    } catch (error) {
      console.log(`${error}`.red);
      console.log(
        `[cron:sendAlerts] couldn't send email alert to user ${user.id}`.red
      );
    }
  });
};

const shouldAlert = async (alert) => {
  var date = new Date();
  switch (alert.frequency) {
    case 'daily':
      return true;
    // on sunday of each week
    case 'weekly':
      return date.getDay() === 0;
    // on 28th of each month
    case 'monthly':
      return date.getDate() === 28;
    default:
      return false;
  }
};

const getAlertEmailMessage = (query, host, port) => {
  const encodedQuery = encodeURI(query);
  const searchUrl = `http://${host}:${port}/api/v1/search/web?query=${encodedQuery}`;
  const message = `
  You are receiving this email because you has requested to receive search alerts
  for "${query}." To see the latest search results, please make a GET request to:
  \n ${searchUrl}`;
  return message;
};

module.exports = sendAlerts;
