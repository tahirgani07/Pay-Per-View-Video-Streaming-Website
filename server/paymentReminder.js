const mailer = require("nodemailer");
const cron = require("node-cron");
const User = require("./models/user");
require('dotenv/config');

//// credentials for Mail
var transporter = mailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
});
  
function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function start() {
    // Runs at 10am every day
    cron.schedule("0 0 10 * * *", async function() {
        var users = await User.find({  });
    
        users.forEach(async (user) => {
            if(user.blocked) return;

            const today = new Date();
            const checkingMonth = today.getMonth() + (today.getDate() !== 1);
            
            var billIndex = user.bills.findIndex((cur) => cur.year == today.getFullYear().toString());
            if(billIndex === -1) return;
            var monthIndex = user.bills[billIndex].months.findIndex((cur) => cur.month == checkingMonth.toString());
            if(monthIndex === -1) return;

            const remAmount = user.bills[billIndex].months[monthIndex].totalAmount - user.bills[billIndex].months[monthIndex].totalPaid;

            if(remAmount === 0) return;
            
            const firstDayOfNextMonth = new Date(today.getFullYear(), checkingMonth, 1);

            const remDays = dateDiffInDays(today, firstDayOfNextMonth);

            if((remDays !== 7) && (remDays !== 1) && (remDays !== 0)) return;

            var subject = "", body = "";
            if(remDays !== 0) {
                subject = "StreamMix - Payment Reminder";
                body = `Hello ${user.name}, Please pay your bill within ${remDays} ${remDays == 1 ? "day" : "days"} to avoid account blockage. Thank you.`;
            } else {
                subject = "StreamMix - Blocking account";
                body = `Hello ${user.name}, Your account has been blocked because of pending payment.`;

                user.blocked = true;
                await user.save();
            }

            transporter.sendMail({
                from: process.env.MAIL_USER,
                to: user.email,
                subject: subject,
                text: body,
            }, (err, info) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log("Mail sent: " + info.response);
            });
        });
    }, {
        scheduled: true,
        timezone: "Asia/Kolkata",
    });
}

module.exports = { start };