import { FindAttributeOptions, WhereOptions } from 'sequelize';
import { ModelOk, Return } from './Types';
import CustomError from '../Errors/CustomError';

export default class BaseRepository<T> {
  private model: ModelOk<T>;

  constructor(model: ModelOk<T>) {
    this.model = model;
    console.log(model.name);
  }

  public async getAll(options?: FindAttributeOptions): Promise<Return<T>[]> {
    const modelValues = await this.model.findAll({ attributes: options, raw: true });
    return modelValues;
  }

  public async getById(id: WhereOptions, options?: FindAttributeOptions): Promise<Return<T>> {
    const modelValue = await this.model.findOne({ attributes: options, where: id });
    if (!modelValue) throw new CustomError('User doesn\'t exist', 404);
    return modelValue;
  }

  public async update(attributes: T, id: WhereOptions, options?: FindAttributeOptions)
    : Promise<Return<T>> {
    const modelValue = await this.model.findOne({ attributes: options, where: id });
    if (!modelValue) throw new CustomError('User doesn\'t exist', 404);
    modelValue.update(attributes);
    return modelValue;
  }

  public async create(attributes: T): Promise<Return<T>> {
    const modelValue = await this.model.create(attributes);
    return modelValue;
  }

  public async delete(id: WhereOptions): Promise<string> {
    const modelValue = await this.model.destroy({ where: id });
    return `${modelValue} Deleted`;
  }
}
