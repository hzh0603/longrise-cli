const prompt = require('co-prompt');
const co = require('co');
const fs = require('fs');
const chalk = require('chalk');

const templates = require('../templates').project;
function addTemplate() {
    co(function *() {

        let projectName = yield  prompt('Project name: ');
        const hasName = templates.find(item => item['project_name'] === projectName);
        if(hasName) {
            console.log(chalk.red(`${projectName} 文件名称已存在！`));
            projectName = yield  prompt('Project name: ');
        }
        let desc = yield  prompt('Project  description: ');
        let url = yield  prompt('Project Git url: ');

        fs.readFile('./templates.json', (err, data) => {
            if(err){throw err;}
            let jsonObj = JSON.parse(data);//获取json文件对象
            jsonObj.project.push({
                project_name: projectName,
                project_des: desc,
                project_git: url
            });
            fs.writeFile('./templates.json',JSON.stringify(jsonObj),function(err){  //写入同目录下的Data.txt文件
                if(err) throw err;
                console.log(chalk.green('template add success'));
                process.exit()
            });
        })
    })
}

module.exports = {
    addTemplate:addTemplate
};