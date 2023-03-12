# githab

`git --version`

Задать в конфиг пользователя

```
git config --global user.name "Ivan Ivanov"

git config --global user.email zzzz@yyy.xxx
```

проверка текущего:

` git config -l`


содать репо

делаем клон репо:

`git clone git@github.com:denis56991/info.git`

работа с репо

изменения в ветке:

`git status`

добавит новые файлы (изменения) в репо:
`git add` (имя нового файла или добавить все - .)

добавить комент к изменениям:
`git commit -m 'add file test'`

выгрузка в оснавную ветку
`git push`

# branch

в какой ветре работаем:
`git branch`

создать ветку:
`git branch имя`

перейти в ветку:
`git checkout имя`

создать ветку и перейти в неё:
`git checkout -b имя`

залить изменения новой ветки:
`git push --set-upstream origin имя`

# Актуализация данных

чтение всех веток:
`git checkout .`

получение октуальных данных из githab:
`git pull`

история коммитов

`git log --pretty=oneline`


