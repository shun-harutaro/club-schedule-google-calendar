const { google } = require('googleapis');
const getOAuth2Client = require('./auth');

const CONVERT_JSON = require('./convertJson');
const SET_PARAM = require("./setParam");

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
            calendarId: '1a9fa76f338b27bbf6dadd20134032028c25c2abb78c3aa1cb61f86af8ba6ca5@group.calendar.google.com',
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