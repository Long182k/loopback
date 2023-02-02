import {Entity, hasMany, model, property} from '@loopback/repository';
import {Address} from './address.model';
import {Car} from './car.model';

@model()
export class CarDealership extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  name: string;

  @property({
    type: Address,
    required: true,
  })
  address: Address;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;


  @hasMany(() => Car, {keyTo: 'carDealershipName'})
  cars: Car[];

  constructor(data?: Partial<CarDealership>) {
    super(data);
  }
}

export interface CarDealershipRelations {
  // describe navigational properties here
}

export type CarDealershipWithRelations = CarDealership & CarDealershipRelations;
















































