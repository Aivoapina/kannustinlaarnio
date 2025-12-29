# Server setup notes

## Packages and users

```
adduser <username>
usermod -aG sudo <username>

apt update
apt install postgresql nodejs npm git nginx snapd
```

## Postgre SQL setup

```
su - postgres
psql
CREATE USER username with PASSWORD 'password';
CREATE DATABASE database WITH OWNER = username;

psql -U fr -d winter2026 -a -f db.sql
```

## Certs

```
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot
certbot --nginx
```

