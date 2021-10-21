const User = require('../models/User');

const deleteInactiveUsers = async () => {
  console.log(
    `[cron:deleteInactiveUsers] Server running a scheduled job`.magenta
  );

  try {
    const inactiveUsers = await User.find(
      {
        isActivated: false,
        createdAt: {
          $lt: new Date(
            Date.now() - parseInt(process.env.ACCOUNT_ACTIVIATION_EXPIRE_MS)
          ),
        },
      },
      '_id'
    );
    await User.deleteMany({ _id: { $in: inactiveUsers } });
  } catch (error) {
    console.log(
      `[cron:deleteInactiveUsers] Error while deleting inactive users`.red
    );
    console.log(error);
  }
};

module.exports = deleteInactiveUsers;
