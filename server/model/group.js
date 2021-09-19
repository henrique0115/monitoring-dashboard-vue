const { BeanModel } = require("redbean-node/dist/bean-model");
const { R } = require("redbean-node");

class Group extends BeanModel {

    async toPublicJSON() {

        let monitorBeanList = R.convertToBeans("monitor", await R.getAll(`
            SELECT * FROM monitor, monitor_group
            WHERE monitor.id = monitor_group.monitor_id
            AND group_id = ?
        `, [
            this.id,
        ]));

        console.log(monitorBeanList);

        let monitorList = [];

        for (let bean of monitorBeanList) {
            monitorList.push(await bean.toPublicJSON());
        }

        return {
            id: this.id,
            name: this.name,
            weight: this.weight,
            monitorList,
        };
    }
}

module.exports = Group;
