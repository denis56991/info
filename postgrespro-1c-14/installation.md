# installation postgrespro-1c-14

Быстрая установка postgres для 1С

```
cd /tmp
wget https://repo.postgrespro.ru/pg1c-14/keys/pgpro-repo-add.sh --no-check-certificate
chmod +x pgpro-repo-add.sh
sh pgpro-repo-add.sh
apt update
apt-get install postgrespro-1c-14 -y
```
