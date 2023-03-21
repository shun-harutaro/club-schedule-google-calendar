const { google } = require('googleapis');
const getOAuth2Client = require('./auth');
require('dotenv').config();

const CONVERT_JSON = require('./convertJson');
const SET_PARAM = require("./setParam");

const CALENDAR_ID = process.env.calendarid;

(async () => {
    const OBJ = await CONVERT_JSON.read();
    const items = Object.keys(OBJ).length;

    for (var i = 1; i <= items; i++) {
        const obj = OBJ[i];
        if(obj.activity != true) {
            console.log(`There aren't activity #${i}`);
            continue;
        }
        const params = await SET_PARAM.setParam(obj);
        const auth = await getOAuth2Client(); // 認証クライアント取得

        const calendar = google.calendar({ version: 'v3', auth }); // カレンダーAPI連携用クライアント取得
        await calendar.events.insert({
            auth,
            calendarId: CALENDAR_ID,
            resource: params,
        }).then(res => {
            console.log(`success #${i}`);
        }).catch(err => {
            console.log(`faild #${i+1}`);
            const errData = err.response.data.errors;
            console.log({errData});
        });
    }
    console.log(`${items} items are done`);
})();