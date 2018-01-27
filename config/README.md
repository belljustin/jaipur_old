# Setting up the proxy server

## 1. Install nginx

```sh
sudo apt install nginx
```

## 2. Add config files

```sh
sudo cp play.belljust.in /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/play.belljust.in /etc/nginx/sites-enabled/play.belljust.in
sudo rm /etc/nginx/sites-enabled/default
```

## 3. Reload nginx

```sh
sudo nginx -s reload
```

# Adding a service for the node application

## 1. Set up nvm

Create user `jaipur`

```sh
useradd -m jaipur
```

Switch to the `jaipur` user, and do the following:

1. `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash` (however, this will immediately run the nvm installer - you probably want to just download the `install.sh` manually, and inspect it before running it)
2. Install the latest stable Node.js version: `nvm install stable`

## 2. Service file

```sh
cp jaipur.service /etc/systemd/system/jaipur.service`:
```

## 3. Enable and start the service

```sh
systemctl enable jaipur
systemctl start jaipur
```

To verify whether your application started successfully (don't forget to `npm install` your dependencies!), run:

```sh
systemctl status jaipur
```
