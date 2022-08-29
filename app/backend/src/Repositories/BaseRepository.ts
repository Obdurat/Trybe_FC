import { FindAttributeOptions, WhereOptions, IncludeOptions, QueryOptions } from 'sequelize';
import { ModelOk, Return, updtAttr } from './Types';
import CustomError from '../Errors/CustomError';

export default class BaseRepository<T> {
  private _model: ModelOk<T>;

  constructor(model: ModelOk<T>) {
    this._model = model;
  }

  public async getAll(
    attrs?: FindAttributeOptions,
    include?: IncludeOptions,
    q?: QueryOptions,
    wereOpts? : WhereOptions,
  )
    : Promise<Return<T>[]> {
    const modelValues = await this._model.findAll({
      where: wereOpts,
      ...include,
      attributes: attrs,
      ...q });
    return modelValues;
  }

  public async getById(id: WhereOptions, options?: FindAttributeOptions): Promise<Return<T>> {
    const modelValue = await this._model.findOne({ attributes: options, where: id });
    if (!modelValue) {
      throw new CustomError(`This ${this._model.tableName} doesn't exist`, 404);
    }
    return modelValue;
  }

  public async update(attributes: updtAttr<T>, id: WhereOptions, options?: FindAttributeOptions)
    : Promise<Return<T>> {
    const modelValue = await this._model.findOne({ attributes: options, where: id });
    if (!modelValue) throw new CustomError(`This ${this._model.tableName} doesn't exist`, 404);
    await modelValue.update(attributes);
    return modelValue;
  }

  public async create(attributes: T): Promise<Return<T>> {
    const modelValue = await this._model.create(attributes);
    return modelValue;
  }

  public async delete(id: WhereOptions): Promise<string> {
    const modelValue = await this._model.destroy({ where: id });
    return `${modelValue} Deleted`;
  }

  public getModel() { return this._model; }
}
