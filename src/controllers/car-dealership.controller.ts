import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CarDealership} from '../models';
import {CarDealershipRepository} from '../repositories';

export class CarDealershipController {
  constructor(
    @repository(CarDealershipRepository)
    public carDealershipRepository : CarDealershipRepository,
  ) {}

  @post('/dealership')
  @response(200, {
    description: 'CarDealership model instance',
    content: {'application/json': {schema: getModelSchemaRef(CarDealership)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarDealership, {
            title: 'NewCarDealership',
            
          }),
        },
      },
    })
    carDealership: CarDealership,
  ): Promise<CarDealership> {
    return this.carDealershipRepository.create(carDealership);
  }

  @get('/dealership/count')
  @response(200, {
    description: 'CarDealership model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CarDealership) where?: Where<CarDealership>,
  ): Promise<Count> {
    return this.carDealershipRepository.count(where);
  }

  @get('/dealership')
  @response(200, {
    description: 'Array of CarDealership model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CarDealership, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CarDealership) filter?: Filter<CarDealership>,
  ): Promise<CarDealership[]> {
    return this.carDealershipRepository.find(filter);
  }

  @patch('/dealership')
  @response(200, {
    description: 'CarDealership PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarDealership, {partial: true}),
        },
      },
    })
    carDealership: CarDealership,
    @param.where(CarDealership) where?: Where<CarDealership>,
  ): Promise<Count> {
    return this.carDealershipRepository.updateAll(carDealership, where);
  }

  @get('/dealership/{id}')
  @response(200, {
    description: 'CarDealership model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CarDealership, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CarDealership, {exclude: 'where'}) filter?: FilterExcludingWhere<CarDealership>
  ): Promise<CarDealership> {
    return this.carDealershipRepository.findById(id, filter);
  }

  @patch('/dealership/{id}')
  @response(204, {
    description: 'CarDealership PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarDealership, {partial: true}),
        },
      },
    })
    carDealership: CarDealership,
  ): Promise<void> {
    await this.carDealershipRepository.updateById(id, carDealership);
  }

  @put('/dealership/{id}')
  @response(204, {
    description: 'CarDealership PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() carDealership: CarDealership,
  ): Promise<void> {
    await this.carDealershipRepository.replaceById(id, carDealership);
  }

  @del('/dealership/{id}')
  @response(204, {
    description: 'CarDealership DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.carDealershipRepository.deleteById(id);
  }
}
