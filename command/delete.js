const templates = require('../templates').project;
const fs = require('fs');
const chalk = require('chalk');
const co = require('co');

function deleteTemplate(name)  {
    co(function *() {
        const hasName = templates.find(item => item['project_name'] === name);
        if(!hasName) {
            console.log(chalk.red(`${name} 模板名称不存在！`));
            process.exit()
        }
        let newTemplates = templates.filter(item => item['project_name'] !== name);
        const jsonObj = {
            project: newTemplates
        };
        fs.writeFile('./templates.json',JSON.stringify(jsonObj),function(err){  //写入同目录下的Data.txt文件
            if(err) throw err;
            console.log(chalk.green('template delete success'));
            process.exit()
        });
    })

}

module.exports = {
    deleteTemplate:deleteTemplate
}