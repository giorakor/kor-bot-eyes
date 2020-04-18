.PHONY: build

build:
	npm run build
	git add -A
	git commit --amend --no-edit
	git push -f

pull:
	git reset HEAD^ --hard
	git pull
	npm run electron

run:
	npm run electron