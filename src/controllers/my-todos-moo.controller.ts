import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TodoMoo} from '../models';
import {TodoMooRepository} from '../repositories';

export class MyTodosMooController {
  constructor(
    @repository(TodoMooRepository)
    public todoMooRepository : TodoMooRepository,
  ) {}

  @post('/my-todos-moo', {
    responses: {
      '200': {
        description: 'TodoMoo model instance',
        content: {'application/json': {schema: getModelSchemaRef(TodoMoo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoMoo, {
            title: 'NewTodoMoo',
            exclude: ['id'],
          }),
        },
      },
    })
    todoMoo: Omit<TodoMoo, 'id'>,
  ): Promise<TodoMoo> {
    return this.todoMooRepository.create(todoMoo);
  }

  @get('/my-todos-moo/count', {
    responses: {
      '200': {
        description: 'TodoMoo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TodoMoo)) where?: Where<TodoMoo>,
  ): Promise<Count> {
    return this.todoMooRepository.count(where);
  }

  @get('/my-todos-moo', {
    responses: {
      '200': {
        description: 'Array of TodoMoo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TodoMoo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TodoMoo)) filter?: Filter<TodoMoo>,
  ): Promise<TodoMoo[]> {
    return this.todoMooRepository.find(filter);
  }

  @patch('/my-todos-moo', {
    responses: {
      '200': {
        description: 'TodoMoo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoMoo, {partial: true}),
        },
      },
    })
    todoMoo: TodoMoo,
    @param.query.object('where', getWhereSchemaFor(TodoMoo)) where?: Where<TodoMoo>,
  ): Promise<Count> {
    return this.todoMooRepository.updateAll(todoMoo, where);
  }

  @get('/my-todos-moo/{id}', {
    responses: {
      '200': {
        description: 'TodoMoo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TodoMoo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(TodoMoo)) filter?: Filter<TodoMoo>
  ): Promise<TodoMoo> {
    return this.todoMooRepository.findById(id, filter);
  }

  @patch('/my-todos-moo/{id}', {
    responses: {
      '204': {
        description: 'TodoMoo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoMoo, {partial: true}),
        },
      },
    })
    todoMoo: TodoMoo,
  ): Promise<void> {
    await this.todoMooRepository.updateById(id, todoMoo);
  }

  @put('/my-todos-moo/{id}', {
    responses: {
      '204': {
        description: 'TodoMoo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todoMoo: TodoMoo,
  ): Promise<void> {
    await this.todoMooRepository.replaceById(id, todoMoo);
  }

  @del('/my-todos-moo/{id}', {
    responses: {
      '204': {
        description: 'TodoMoo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoMooRepository.deleteById(id);
  }
}
