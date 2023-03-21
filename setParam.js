/* This file make request */
'use strict';
// @see https://developers.google.com/calendar/api/guides/create-events?hl=ja#node.js
const params = {
    summary: null,
    location: '',
    description: '',
    start: {
        dateTime: null,
        timeZone: 'Asia/Tokyo',
    },
    end: {
        dateTime: null,
        timeZone: 'Asia/Tokyo',
    },
    colorId: 6, // orange
};

// "hh:mm～hh:mm" のフォーマットを[ms, ms] に変換
const divideTimeMs = (stringTime) => {
    const [start, end] = stringTime.split('～');
    const [startH, startM] = start.split(':');
    const startMs = (startH * 3600 + startM * 60) * 1000; 
    const [endH, endM] = end.split(':');
    const endMs = (endH * 3600 + endM * 60) * 1000;
    return [startMs, endMs];
}

// unixtime into iso8601
const dateMake = (date, startMs, endMs) => {
    const timeDiffJST = 9 * 60 * 60 * 1000; // JST to UTC
    const isoStrStart = new Date(date*1000 + startMs - timeDiffJST).toISOString();
    const isoStrEnd = new Date(date*1000 + endMs - timeDiffJST).toISOString();
    return [isoStrStart, isoStrEnd];
}

exports.setParam = (obj) => {
    const [startMs, endMs] = divideTimeMs(obj.time)
    let start, end;
    if (isNaN(startMs + endMs)) {
        console.log("Time couldn't convert to Number");
        start = end = new Date (obj.date*1000).toISOString();
        //atr.all_day = true;
    } else {
        [start, end] = dateMake(obj.date ,startMs, endMs);
        //atr.all_day = false;
    }
    params.start.dateTime = start;
    params.end.dateTime = end;
    params.summary = "部活";
    params.location = obj.location;
    params.description = `- 活動可能場所：${obj.detail}
- 備考：${obj.remark}`;
    return params;
}