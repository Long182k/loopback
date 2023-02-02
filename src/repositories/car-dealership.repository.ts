import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CarDealership, CarDealershipRelations, Car} from '../models';
import {CarRepository} from './car.repository';

export class CarDealershipRepository extends DefaultCrudRepository<
  CarDealership,
  typeof CarDealership.prototype.name,
  CarDealershipRelations
> {

  public readonly cars: HasManyRepositoryFactory<Car, typeof CarDealership.prototype.name>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CarRepository') protected carRepositoryGetter: Getter<CarRepository>,
  ) {
    super(CarDealership, dataSource);
    this.cars = this.createHasManyRepositoryFactoryFor('cars', carRepositoryGetter,);
    this.registerInclusionResolver('cars', this.cars.inclusionResolver);
  }
}
