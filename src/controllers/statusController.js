const Task = require("../models/task");
const path = require("path");
const moment = require('moment')

exports.setStatusCompleteTasks = (completeTasks) => {
    completeTasks.forEach((task, index) => {
        task.setDataValue('status', 'Completa')
        task.setDataValue('statusColor', '#4CAF50')

        completeTasks[index] = task
    })
    return completeTasks
}

exports.setStatusIncompleteTasks = (incompleteTasks) => {
    const dateNow = moment().format('YYYY-MM-DD')
    incompleteTasks.forEach((task, index) => {
        let taskDate = moment(task.date_limit).add(1, 'days').format('YYYY-MM-DD')
        if (task.date_limit == null) {
            task.setDataValue('status', 'Pendente')
            task.setDataValue('statusColor', '#FFEB3B')
            return
        }
        if (moment(taskDate).isSame(dateNow)) {
            task.setDataValue('status', 'Pendente')
            task.setDataValue('statusColor', '#FFEB3B')
            return
        }
        if (moment(taskDate).isAfter(dateNow)) {
            task.setDataValue('status', 'Pendente')
            task.setDataValue('statusColor', '#FFEB3B')
        } else {
            task.setDataValue('status', 'Atrasada')
            task.setDataValue('statusColor', '#F44336')
        }
        incompleteTasks[index] = task
    })
    return incompleteTasks
}

exports.buildStatusInfos = async () => {
    const tasks = await Task.findAndCountAll()
    const dateNow = moment().format('YYYY-MM-DD')
    let count = {
        completas: 0,
        pendentes: 0,
        atrasadas: 0
    }
    tasks.rows.forEach((task, index) => {
        let taskDate = moment(task.date_limit).add(1, 'days').format('YYYY-MM-DD')
        if (task.isDone) {
            count.completas += 1
            return
        }
        if (task.date_limit == null) {
            count.pendentes += 1
            return;
        }
        if (moment(taskDate).isSame(dateNow)) {
            count.pendentes += 1
            return;
        } else {
            if (moment(taskDate).isBefore(dateNow)) {
                count.atrasadas += 1
            } else {
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