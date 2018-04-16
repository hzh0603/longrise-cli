const templates = require("../templates").project

for (index in templates) {

	console.log(`\n     *   ${templates[index].project_name}     ${templates[index].project_des}`)
}



