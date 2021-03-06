# lb4-mvc-todos-moo

what we actually gonna do here is a fullstack app with angular as front and loopback4 as back, for todos!! haha, everybody do that, and now we 3~

# design

* db - mysql, we gonna put somewhere all the sql queries an docs
* back - lb4, we gonna doc how we eventually deploy all that to `my.todos.moo.com`
* front - just a boring ng app

# initial setup

## DB

* well go install mysql, we also use `workbench`
* in workbench click `new schema`, i named it `todos-of-the-moo`, and apply/apply. the script generated and executed is `CREATE SCHEMA ``my_todos_of_the_moo`` DEFAULT CHARACTER SET utf8 ;`
* db-click on the new schema and create a table with columns id, created, title, completed. gen script:

```
CREATE TABLE `my_todos_of_the_moo`.`todos_moo`  (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(145) NOT NULL,
  `created` DATETIME NOT NULL DEFAULT NOW(),
  `completed` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));

INSERT INTO `my_todos_of_the_moo`.`todos_moo`  (`title`)
VALUES ('tast 1'), ('toast with cheese'),
('toast with salami'), ('lafa');
```

## apps
`ng new` and `lb4 app`


# config LB4

if you need to remind yourself howto lb4 goto my [loopback4-tutorial](https://github.com/bresleveloper/loopback4-tutorial)

* `lb4 model`
* `lb4 datasource`
* `lb4 repository`
* `lb4 controller`

test with `npm start`, 1st time do it with `sudo npm start`


#### test connection
`MYSQL_HOST=127.0.0.1 MYSQL_PORT=3306 MYSQL_USER=shuki MYSQL_PASSWORD=2 MYSQL_DATABASE="my_todos_of_the_moo" CI=true npm test`

`Connection fails: Error: ER_ACCESS_DENIED_ERROR: Access denied for user ''@'localhost' (using password: NO)`

solutions:

* from you `database.config.js.json` remove the line with the `url`
* `sudo npm start`
* might indicate that the name of the model is not identical to the mysql table name and is solved by `@model({ settings: { strict: false, mysql: { table: 'todos-moo' } } })` decoration in the model


# angular
in its place

# change base api url

in `index js` add `basePath`
```
const config = {
    rest: {
      basePath: '/todos-moo/api',
      port: +(process.env.PORT || 3000),
```


# into gits

this + [ng](https://github.com/bresleveloper/my-todos-moo-ng)



# create webserver for apps


* install apache in linux - in terminal `sudo apt update` and then `sudo apt install apache2 -y`
* make folder for your website - `sudo mkdir /var/www/my.todos.moo.com`
* permissions
    * `sudo chown -R $USER:$USER /var/www/my.todos.moo.com`
    * `sudo chmod -R 755 /var/www/my.todos.moo.com`
* create test index.html
    * `touch /var/www/my.todos.moo.com/index.html`
    * `xdg-open /var/www/my.todos.moo.com/index.html`
* update your hosts file `sudo xdg-open /etc/hosts`, add `127.0.0.1	my.todos.moo.com`
* create apache2 .conf file for your website
    * `sudo touch /etc/apache2/sites-available/my.todos.moo.conf`
    * `sudo xdg-open /etc/apache2/sites-available/my.todos.moo.conf`

content here
```
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName my.todos.moo.com
    ServerAlias my.todos.moo.com
    DocumentRoot /var/www/my.todos.moo.com
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

* re-configure apache2 with new site
    * `sudo a2ensite my.todos.moo.conf`
    * `sudo systemctl restart apache2`


#### browse to `my.todos.moo.com`


## serve angular

copy ng files to apache dir

`sudo cp -r ~/Desktop/ariel/loopback4/myMvcTodosMoo/ngMvcTodoMoo/dist/ngMvcTodoMoo/. /var/www/my.todos.moo.com/`

to test ng index lets add an h1
`sudo xdg-open /var/www/my.todos.moo.com/index.html`


## serve node api
