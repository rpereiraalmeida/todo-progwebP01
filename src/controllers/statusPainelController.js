const Task = require("../models/task");
const path = require("path");

exports.buildStatusInfos = async () => {
    const tasks = await Task.findAndCountAll()
    let count = {
        completas: 0,
        pendentes: 0,
        atrasadas: 0
    }
    tasks.rows.forEach((task, index) => {
        if (task.date_limit == null) {
            count.pendentes += 1
            return;
        }
        if (task.isDone) {
            count.completas += 1
        } else {
            if (new Date(task.date_limit) < Date.now()) {
                count.atrasadas += 1
            }
            if (new Date(task.date_limit) > Date.now()) {
                count.pendentes += 1
            }
        }

    })
    const percentage = {
        completas: (count.completas * 100) / tasks.count || 0,
        pendentes: (count.pendentes * 100) / tasks.count || 0,
        atrasadas: (count.atrasadas * 100) / tasks.count || 0
    }

    return percentage

}