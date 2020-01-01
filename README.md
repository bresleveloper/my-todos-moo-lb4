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

`Connection fails: Error: ER_ACCESS_DENIED_ERROR: Access denied for user ''@'localhost' (using password: NO)` might indicate that the name of the model is not identical to the mysql table name and is solved by `@model({ settings: { strict: false, mysql: { table: 'todos-moo' } } })` decoration in the model, or `sudo`


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

