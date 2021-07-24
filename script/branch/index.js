const inquirer = require('inquirer')
const chalk = require('chalk')
const { execFileSync } = require('child_process')
const mode = process.argv[2]
const shouldChange = mode === 'change'

const MESSAGE = {
	input: {
		en: 'Your branch name:',
		jp: 'ブランチ名：',
	},
	errors: {
		input: {
			en: 'Please input branch name!',
			jp: 'ブランチ名入力して下さい。',
		},
		name: {
			en: 'Branch name must be a JIRA ticket number!',
			jp: 'ブランチ名がJIRAで書いてあるチケットナンバ入力して下さい。',
		},
		sameName: {
			en: ` \n New branch name must different with current branch name!`,
			jp: ` \n 現在のブランチ名と別の名を入力しないいけないです。`,
		},
		existed: {
			en: 'Branch you wanna create is existed! Try other branch name!',
			jp: '入力したブランチ名が事前に作成されました。'
		}
	},
	success: {
		en: 'is created successfully!',
		jp: 'が無事に作成されました。',
	},
	isChanged: {
		en: 'is changed to',
		jp: 'から'
	},
	changeSuccess: {
		en: 'successfully!',
		jp: 'に変更されました。'
	}
}

function execCommand(cmd, args) {
	const options = {
		cwd: process.cwd(),
		env: process.env,
		stdio: 'pipe',
		encoding: 'utf-8',
	};

	return execFileSync(cmd, args, options)
}

async function composeBranchName() {
	const { branch: name } = await inquirer.prompt({
		type: 'input',
		name: 'branch',
		message: MESSAGE.input.jp,
		validate: function valiDate(input) {
			if (!input.trim().length) {
				console.log(chalk.red(` ${MESSAGE.errors.input.jp}`))
			} else if (isNaN(Number(input))) {
				console.log(chalk.red(` ${MESSAGE.errors.name.jp}`))
			} else if (shouldChange) {
				const currentBranch = execCommand('git', ['branch', '--show-current']).trim()
				if (currentBranch === `feature/OFFKINTOEC-${input}`) {
					console.log(chalk.red(` \n ${MESSAGE.errors.sameName.jp}`))
				} else {
					return true
				}
			} else {
				return true
			}
		}
	})

	const newBranch = `feature/OFFKINTOEC-${name}`

	// change branch name
	if (shouldChange) {
		const currentBranch = execCommand('git', ['branch', '--show-current']).trim()
		execCommand('git', ['branch', '--move', `${currentBranch}`, newBranch])
		console.log(chalk.green(` ${chalk.bold(currentBranch)} ${MESSAGE.isChanged.jp} ${chalk.bold(newBranch)} ${MESSAGE.changeSuccess.jp}`))
		console.log(execCommand('git', ['branch', '--show-current']))
	} else {
		const existedBranch = execCommand('git', ['branch', '--all', '--list', 'feature/*']).trim().toString().split('\n')
		const isExisted = existedBranch.some(br => br.trim().includes(newBranch))

		if (isExisted) {
			console.log(chalk.red(` ${MESSAGE.errors.existed.jp}`))
		} else {
			execCommand('git', ['checkout', '-b', `${newBranch}`])
			console.log(chalk.green(` ${chalk.bold(newBranch)} ${MESSAGE.success.jp}`))
			console.log(execCommand('git', ['branch', '--show-current']))
		}
	}
}


composeBranchName()