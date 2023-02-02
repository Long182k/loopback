import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CarDealership,
  Car,
} from '../models';
import {CarDealershipRepository} from '../repositories';

export class CarDealershipCarController {
  constructor(
    @repository(CarDealershipRepository) protected carDealershipRepository: CarDealershipRepository,
  ) { }

  @get('/car-dealerships/{id}/cars', {
    responses: {
      '200': {
        description: 'Array of CarDealership has many Car',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Car)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Car>,
  ): Promise<Car[]> {
    return this.carDealershipRepository.cars(id).find(filter);
  }

  @post('/car-dealerships/{id}/cars', {
    responses: {
      '200': {
        description: 'CarDealership model instance',
        content: {'application/json': {schema: getModelSchemaRef(Car)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CarDealership.prototype.name,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Car, {
            title: 'NewCarInCarDealership',
            exclude: ['id'],
            optional: ['carDealershipName']
          }),
        },
      },
    }) car: Omit<Car, 'id'>,
  ): Promise<Car> {
    return this.carDealershipRepository.cars(id).create(car);
  }

  @patch('/car-dealerships/{id}/cars', {
    responses: {
      '200': {
        description: 'CarDealership.Car PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Car, {partial: true}),
        },
      },
    })
    car: Partial<Car>,
    @param.query.object('where', getWhereSchemaFor(Car)) where?: Where<Car>,
  ): Promise<Count> {
    return this.carDealershipRepository.cars(id).patch(car, where);
  }

  @del('/car-dealerships/{id}/cars', {
    responses: {
      '200': {
        description: 'CarDealership.Car DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Car)) where?: Where<Car>,
  ): Promise<Count> {
    return this.carDealershipRepository.cars(id).delete(where);
  }
}
