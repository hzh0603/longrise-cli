const templates = require('../templates').project;
const prompt = require('co-prompt');
const exec = require('child_process').exec;
const chalk = require('chalk');
const co = require('co');

 function template(template)  {    
		co(function *() {
		    let gitUrl = "";
		       for (index in templates) {
		       		if(templates[index].project_name == template){
		       			gitUrl = templates[index].project_git;
		       			break 
		       		}
		       }
		       if(!gitUrl) {
		       		console.log(`没有相应模板，请重新使用 longrise ls 查看所用模板，或者联系huzh@longrise.om.cn`);
		       		return null
		       }
		       let projectName = yield  prompt('Project name: ');
		       let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout master`;
		       console.log(chalk.white('\n Start generating...'));
		       exec(cmdStr, (error, stdout, stderr) => {
		      	if (error) {
		        	console.log(error);
		        	process.exit()
		      }
		      console.log(chalk.green('\n √ Generation completed!'));
		      console.log(`\n cd ${projectName} && npm install \n`);
		      process.exit()
		    })
		})
   
}

module.exports = {
	template:template
}