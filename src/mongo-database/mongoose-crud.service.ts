import { Document, Model, FilterQuery, QueryOptions } from 'mongoose';

export abstract class MongooseCrudService<TDocument extends Document> {
  constructor(private model: Model<TDocument>) {}

  async create(entity: unknown): Promise<TDocument> {
    return await this.model.create(entity);
  }

  async findById(
    id: unknown,
    projection?: any,
    options?: QueryOptions,
  ): Promise<TDocument> {
    return await this.model.findById(id, projection, options);
  }

  async findOne(
    args?: FilterQuery<TDocument>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<TDocument> {
    return await this.model.findOne(args, projection, options);
  }

  async exists(args?: FilterQuery<TDocument>): Promise<boolean> {
    const exist = await this.model.exists(args);
    return exist ? true : false;
  }

  async findAll(
    args?: FilterQuery<TDocument>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<TDocument[]> {
    return await this.model.find(args, projection, options);
  }

  async update(
    id: unknown,
    entity: any,
    options?: QueryOptions,
  ): Promise<TDocument> {
    return await this.model.findByIdAndUpdate(id, entity, {
      new: true,
      ...options,
    });
  }

  async updateOneWithConditions(
    conditions: FilterQuery<TDocument>,
    entity: any,
  ): Promise<TDocument> {
    return await this.model.findOneAndUpdate(conditions, entity, {
      new: true,
    });
  }

  async delete(id: unknown): Promise<TDocument> {
    return await this.model.findByIdAndDelete(id);
  }

  async aggregate(condition: any): Promise<TDocument[]> {
    return await this.model.aggregate(condition);
  }
}
