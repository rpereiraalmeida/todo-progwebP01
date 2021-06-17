models = {
    task: require('./task'),
    list: require('./list')

}

module.exports = models

models.task.belongsTo(models.list, { foreignKey: 'list_id' })
models.list.hasMany(models.task, { foreignKey: 'list_id' })