const asyncForEach = require('../utils/asyncForEach');
const Alert = require('../models/Alert');
const User = require('../models/User');
const qs = require('qs');
const { searchAlertEmailTemplate, sendEmail } = require('../utils/mail');

const sendAlerts = async () => {
  console.log(`[cron:sendAlerts] Server running a scheduled job`.magenta);

  const alerts = await Alert.find({}).select('+user');

  asyncForEach(alerts, async (alert) => {
    if (!shouldAlert(alert)) return;

    try {
      const user = await User.findById(alert.user);
      const searchUrl = `${process.env.SEARCH_WEB_URL}?${qs.stringify({
        query: alert.query,
      })}`;
      const emailTemplate = searchAlertEmailTemplate({
        to: user.email,
        firstName: user.firstName,
        query: alert.query,
        searchUrl: searchUrl,
        alertsUrl: process.env.SEARCH_ALERTS_URL,
      });
      await sendEmail(emailTemplate);
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

module.exports = sendAlerts;
