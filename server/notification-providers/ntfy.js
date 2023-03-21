const NotificationProvider = require("./notification-provider");
const axios = require("axios");

class Ntfy extends NotificationProvider {

    name = "ntfy";

    async send(notification, msg, monitorJSON = null, heartbeatJSON = null) {
        let okMsg = "Sent Successfully.";
        try {
            let headers = {};
            if (notification.ntfyAuthenticationMethod === "usernamePassword") {
                headers = {
                    "Authorization": "Basic " + Buffer.from(notification.ntfyusername + ":" + notification.ntfypassword).toString("base64"),
                };
            } else if (notification.ntfyAuthenticationMethod === "accessToken") {
                headers = {
                    "Authorization": "Bearer " + notification.ntfyaccesstoken,
                };
            }
            let data = {
                "topic": notification.ntfytopic,
                "message": msg,
                "priority": notification.ntfyPriority || 4,
                "title": "Uptime-Kuma",
            };

            if (notification.ntfyIcon) {
                data.icon = notification.ntfyIcon;
            }

            await axios.post(`${notification.ntfyserverurl}`, data, { headers: headers });

            return okMsg;

        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
    }
}

module.exports = Ntfy;
