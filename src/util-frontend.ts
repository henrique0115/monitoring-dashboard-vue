import * as dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
import timezones from "timezones-list";

dayjs.extend(utc)
dayjs.extend(timezone)

function getTimezoneOffset(timeZone) {
    const now = new Date();
    const tzString = now.toLocaleString("en-US", {
        timeZone,
    });
    const localString = now.toLocaleString("en-US");
    const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
    const offset = diff + now.getTimezoneOffset() / 60;
    return -offset;
}

export function timezoneList() {

    let result = [];

    for (let timezone of timezones) {

        try {
            let display = dayjs().tz(timezone.tzCode).format("Z");

            result.push({
                name: `(UTC${display}) ${timezone.tzCode}`,
                value: timezone.tzCode,
                time: getTimezoneOffset(timezone.tzCode),
            })
        } catch (e) {
            console.error(e.message);
            console.log("Skip this timezone")
        }

    }

    result.sort((a, b) => {
        if (a.time > b.time) {
            return 1;
        }

        if (b.time > a.time) {
            return -1;
        }

        return 0;
    })

    return result;
}
