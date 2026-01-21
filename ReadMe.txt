------------------------ 1 -----------------

cd ~/Downloads
mkdir git-basic-practice
cd git-basic-practice

git init
git status

touch File1.txt
echo "Hello git" > File1.txt

git status

git add File1.txt
git status

git commit -m "First commit"

git log

git config --global user.name "Tushar Singh"
git config --global user.email "tushar@gmail.com"

git config --list

--------------- 2 ----------------

# Go to Downloads directory
cd ~/Downloads

# Create project folder
mkdir git-merge-practice

# Enter the folder
cd git-merge-practice

# Initialize git repository
git init

# Create file in main branch
echo "This is main branch code" > File.txt
git add File.txt
git commit -m "Initial commit in main"

# Create feature branch
git branch feature

# Switch to feature branch
git checkout feature

# Feature branch change
echo "This feature branch code" >> File.txt
git add File.txt
git commit -m "Feature branch update"

# Switch back to master branch
git checkout master

# Main branch change
echo "Main branch new change" >> File.txt
git add File.txt
git commit -m "Main branch update"

# Merge feature branch
git merge feature

# If merge conflict occurs, fix File.txt manually then:
git add File.txt
git commit -m "Resolved merge conflict"

# Show merged branches
git branch --merged

# Show unmerged branches
git branch --no-merged

----------------- 3 ---------------

# Go to Downloads folder
cd ~/Downloads

# Create project folder
mkdir git-cherry-pick-practice

# Enter folder
cd git-cherry-pick-practice

# Initialize git repository
git init

# Create .gitignore file
touch .gitignore

# Open .gitignore in nano editor
nano .gitignore

---------------

node_modules/
.env
*.log
*.exe
*.mp4
*.zip
--------------
CTRL + O   → press Enter (save)
CTRL + X   → exit nano
--------------
# Check status
git status

# Create and switch to Feature branch
git checkout -b feature

# Switch back to master
git checkout master

# Create file in master branch
echo "Main branch file" > File.txt
git add File.txt
git commit -m "Main branch commit"

# Switch to feature branch
git checkout feature

# Feature branch change
echo "Feature branch change" >> File.txt
git add File.txt
git commit -m "Feature branch commit"

# View commits
git log --oneline
-----------------
ab1b234 Feature branch commit
98fd112 Main branch commit
------------------
# Switch back to master
git checkout master

# Cherry-pick feature commit
git cherry-pick ab1b234
------------------
git cherry-pick <commit-hash>

-------------------- 5 ----------------

cd ~/Downloads
mkdir UndoRepo
cd UndoRepo

git init

git config --global user.name "Tushar"
git config --global user.email "tushar@gmail.com"

echo "VERSION 1" > File.txt
git add File.txt
git commit -m "First commit"

echo "VERSION 2" >> File.txt
git add File.txt
git commit -m "Second commit"

git log --oneline

git revert <commit-hash>

git log --oneline

git checkout -b feature

echo "Feature line 1" >> File.txt
git add File.txt
git commit -m "Feature commit"

git checkout master

git checkout feature
git rebase master

git log --oneline

git rebase --continue

git rebase --abort

------------------------ 1 -----------------

cd ~/Downloads
mkdir git-basic-practice
cd git-basic-practice

git init
git status

touch File1.txt
echo "Hello git" > File1.txt

git status

git add File1.txt
git status

git commit -m "First commit"

git log

git config --global user.name "Tushar Singh"
git config --global user.email "tushar@gmail.com"

git config --list


-------------------------------- 6 ------------------

cd ~/Downloads
mkdir git-remote-practice
cd git-remote-practice

git init

git add .
git commit -m "Initial commit"

git remote add origin https://github.com/username/repository.git

git push -u origin master

git checkout -b feature

git add .
git commit -m "Added feature file"

git push -u origin feature

git checkout -b dev

git add .
git commit -m "Dev branch work"

git push -u origin dev

---------------- 7 -------------

# go to downloads
cd ~/Downloads

# create repo
mkdir git-practice
cd git-practice
git init

# create file
echo "line1" > File.txt

# commit 1
git add .
git commit -m "C1"

# commit 2
echo "line2" >> File.txt
git add .
git commit -m "C2"

# reset (choose ONLY ONE)
git reset --soft HEAD~1
# OR
git reset --mixed HEAD~1
# OR
git reset --hard HEAD~1

--------------- 8 --------------------

# Go to Downloads folder
cd ~/Downloads

# Create project folder
mkdir advanced-git

# Enter the folder
cd advanced-git

# Initialize git repository
git init

# Configure git user
git config --global user.name "Tushar Singh"
git config --global user.email "tushar@gmail.com"

# Create file and add content
echo "Advanced Git Operation" > File1.txt

# Check status
git status

# Add file to staging
git add File1.txt

# First commit (IMPORTANT — required before stash)
git commit -m "Initial commit"

# Add second line
echo "Second line" >> File1.txt

# Check changes
git status

# Stash changes
git stash

# Verify stash
git stash list

# Apply stash back
git stash apply

# Add and commit again
git add File1.txt
git commit -m "Second commit"

# View commit history
git log --oneline
