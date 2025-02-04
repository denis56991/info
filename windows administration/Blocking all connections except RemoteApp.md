# Блокировка всех подключений кроме RemoteApp

1. Создать например по пути `"C:\script"` скрипт PowerShell с расширением `.ps1` 
</br>  ```например: cheak_admin_user.ps1```

Внутри файла указать следующее </br>

```powershell
$adminGroup = "Администраторы"
$currentUser = $env:USERNAME
$isAdmin = [bool](net localgroup $adminGroup | select-string -simplematch $currentUser)

if ($isAdmin) {
    Write-Host "Пользователь $currentUser является членом группы $adminGroup."
    explorer.exe
} else {
    Write-Host "Пользователь $currentUser не является членом группы $adminGroup."
    logoff.exe
}
```

2. В групповой политике переходим по пути `"Конфигурация компьютера -- Административные шаблоны -- Компоненты Windows -- Службы удаленных рабочих столов -- Узел сеансов удаленных рабочих столов -- Среда удаленных сеансов -- Запускать программу при подключении"`

3. ставим `Включено`

В параметре "путь к программе" указываем `powershell -WindowStyle Hidden -File "C:\script\cheak_admin_user.ps1"` 

4. запускаем CMD от имени Администратора и обновляем политику командой `gpupdate /force`

