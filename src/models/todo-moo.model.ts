import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false, mysql: { table: 'todos_moo' } } })
export class TodoMoo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'date',
    required: true,
  })
  created: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  completed: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TodoMoo>) {
    super(data);
  }
}

export interface TodoMooRelations {
  // describe navigational properties here
}

export type TodoMooWithRelations = TodoMoo & TodoMooRelations;
