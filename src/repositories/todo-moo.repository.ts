import {DefaultCrudRepository} from '@loopback/repository';
import {TodoMoo, TodoMooRelations} from '../models';
import {MySqlTodosOfTheMooDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TodoMooRepository extends DefaultCrudRepository<
  TodoMoo,
  typeof TodoMoo.prototype.id,
  TodoMooRelations
> {
  constructor(
    @inject('datasources.MySqlTodosOfTheMoo') dataSource: MySqlTodosOfTheMooDataSource,
  ) {
    super(TodoMoo, dataSource);
  }
}
