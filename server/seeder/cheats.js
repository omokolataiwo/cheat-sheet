const cheats = [{
  category: 'Install GIT',
  description: 'Install git on macOS with Homebrew',
  line: 'brew install git',
  keywords: ['install', 'macos', 'homebrew']
},
{
  category: 'Install GIT',
  description: 'Install git on Debian-based linux',
  line: 'sudo apt-get install git',
  keywords: ['install', 'apt-get', 'debian', 'linux']
},
{
  category: 'Install GIT',
  description: 'Install git on Windows with Chocolatey',
  line: 'choco install git',
  keywords: ['install', 'windows', 'choco']
},
{
  category: 'Configuration',
  line: 'git config --global user.name [name]',
  description: 'Sets the name you want attached to your commit transaction',
  keywords: ['configuration', 'name', 'email', 'user']
},
{
  category: 'Configuration',
  line: 'git config --global user.email [email address]',
  description: 'Sets the email you want atached to your commit transactions',
  keywords: ['configuration', 'name', 'email', 'user']
},
{
  category: 'Configuration',
  line: 'git config --global color.ui auto',
  description: 'Enables helpful colorization of command line output',
  keywords: ['configuration', 'color', 'ui', 'customization']
},
{
  category: 'Create Repositories',
  line: 'git init [project-name]',
  description: 'Creates a new local repository with the specified name',
  keywords: ['new', 'project', 'create']
},
{
  category: 'Create Repositories',
  line: 'git clone [url]',
  description: 'Downloads a project and its entire version history',
  keywords: ['download', 'remote', 'clone', 'checkout']
},
{
  category: 'Make Changes',
  line: 'git status',
  description: 'Lists all new or modified files to be commited',
  keywords: ['change', 'modifications', 'commit']
},
{
  category: 'Make Changes',
  line: 'git diff',
  description: 'Shows file differences not yet staged',
  keywords: ['modifications', 'changes', 'diff']
},
{
  category: 'Make Changes',
  line: 'git add [file]',
  description: 'Add the specified file to the staging area',
  keywords: []
},
{
  category: 'Make Changes',
  line: 'git diff --staged',
  description: 'Shows file differences between staging and the last file version',
  keywords: ['modifications']
},
{
  category: 'Make Changes',
  line: 'git reset [file]',
  description: 'Unstages the file, but preserve its contents',
  keywords: []
},
{
  category: 'Make Changes',
  line: 'git commit -m [descriptive message]',
  description: 'Records staged snapshots in version history',
  keywords: []
},
{
  category: 'Branches',
  line: 'git branch',
  description: 'Lists all local branches in the current repository',
  keywords: []
},
{
  category: 'Branches',
  line: 'git branch [branch-name]',
  description: 'Creates a branch',
  keywords: []
},
{
  category: 'Branches',
  line: 'git merge [branch-name]',
  description: 'Merges the specified branch’s history into the current branch',
  keywords: []
},
{
  category: 'Branches',
  line: 'git checkout [branch-name]',
  description: 'Switches to the specified branch',
  keywords: []
},
{
  category: 'Branches',
  line: 'git checkout -b [branch-name]',
  description: 'Creates a branch and switch to it',
  keywords: []
},
{
  category: 'Branches',
  line: 'git checkout -m [new-branch-name]',
  description: 'Rename branch',
  keywords: []
},
{
  category: 'Branches',
  line: 'git branch -d [branch-name]',
  description: 'Deletes the specified branch, locally',
  keywords: []
},
{
  category: 'Moving and removing files',
  line: 'git rm [file]',
  description: 'Deletes the file from the working directory and stages the deletion',
  keywords: []
},
{
  category: 'Moving and removing files',
  line: 'git rm --cached [file]',
  description: 'Removes the file from version control but preserves the file locally',
  keywords: []
},
{
  category: 'Moving and removing files',
  line: 'git mv [from] [to]',
  description: 'Renames the file',
  keywords: []
},
{
  category: 'Stashing',
  line: 'git stash',
  description: 'Temporarily stores all modified tracked files',
  keywords: []
},
{
  category: 'Stashing',
  line: 'git stash pop',
  description: 'Restores the most last stashed files and deletes the stashed changeset',
  keywords: []
},
{
  category: 'Stashing',
  line: 'git stash list',
  description: 'Lists all stashed changesets',
  keywords: []
},
{
  category: 'Stashing',
  line: 'git stash drop',
  description: 'Deletes the last stashed changeset',
  keywords: []
},
{
  category: 'History and diff',
  line: 'git log',
  description: 'Lists version history for the current branch',
  keywords: []
},
{
  category: 'History and diff',
  line: 'git log --follow [file]',
  description: 'Lists version history for a file, including renames',
  keywords: []
},
{
  category: 'History and diff',
  line: 'git diff [first-branch]...[second-branch]',
  description: 'Shows content differences between two branches',
  keywords: []
},
{
  category: 'History and diff',
  line: 'git show [commit]',
  description: 'Shows changes of the specified commit',
  keywords: []
},
{
  category: 'Cancel and redo stuffs',
  line: 'git reset [commit]',
  description: 'Undoes all commits afer [commit], preserving changes locally',
  keywords: []
},
{
  category: 'Cancel and redo stuffs',
  line: 'git reset --hard [commit]',
  description: 'Discards all history and changes back to the specified commit',
  keywords: []
},
{
  category: 'Cancel and redo stuffs',
  line: 'git reset –hard HEAD',
  description: 'Discards all local changes in the working directory',
  keywords: []
},
{
  category: 'Synchronization and remote repositories',
  line: 'git push [alias] [branch]',
  description: 'Pushes all local changesets to the remote repository',
  keywords: []
},
{
  category: 'Synchronization and remote repositories',
  line: 'git pull',
  description: 'Downloads new remote history and incorporate changes',
  keywords: []
},
{
  category: 'Synchronization and remote repositories',
  line: 'git remote -v',
  description: 'Shows the name of remote repositories',
  keywords: []
},
{
  category: 'Synchronization and remote repositories',
  line: 'git fetch',
  description: 'Get the latest changes from the origin but not merge',
  keywords: []
},
{
  category: 'Synchronization and remote repositories',
  line: 'git remote rm [remote repo name]',
  description: 'Removes the remote repository',
  keywords: []
},
{
  category: 'Tagging',
  line: 'git tag',
  description: 'Lists tags',
  keywords: ['tag', 'version', 'release']
},
{
  category: 'Tagging',
  line: 'git tag -l "[pattern]"',
  description: 'Lists tags with specified pattern',
  keywords: ['tag', 'version', 'release', 'pattern']
},
{
  category: 'Tagging',
  line: 'git tag -a [version] -m [message]',
  description: 'Create annotated tag',
  keywords: ['tag', 'version', 'release', 'annotate']
},
{
  category: 'Tagging',
  line: 'git tag [version]',
  description: 'Create a lightweight tag',
  keywords: ['tag', 'version', 'release', 'lightweight']
},
{
  category: 'Tagging',
  line: 'git tag -a [version] [commit]',
  description: 'Tagging a commit',
  keywords: ['tag', 'version', 'release', 'later']
},
{
  category: 'Tagging',
  line: 'git push [alias] [version]',
  description: 'Sharing a tag',
  keywords: ['tag', 'version', 'release', 'later']
},
{
  category: 'Tagging',
  line: 'git checkout [version]',
  description: 'Checkout tags',
  keywords: ['tag', 'version', 'release']
},
{
  category: 'Cancel and redo stuffs',
  line: 'git commit --amend',
  description: 'Change the commit message',
  keywords: ['undo', 'message', 'commit']
}
];
export default cheats;
