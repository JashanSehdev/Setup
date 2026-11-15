import { NotFoundException } from "@nestjs/common";
import { DeepPartial, ObjectLiteral, Repository } from "typeorm";

export class BaseService <T extends ObjectLiteral> {
    constructor(
        protected readonly repository : Repository<T>
    ){}

    async create (data: DeepPartial<T>) : Promise<T> {
        const entity = this.repository.create(data)
        return this.repository.save(entity)
    }

    async findAll () : Promise <T[]> {
        return this.repository.find();
    }

    async findById (id : number) : Promise<T> {
        const entity = await this.repository.findOneBy({
            id,
        } as any)

        if (!entity) {
            throw new NotFoundException('Resource not found');
        }

        return entity
    }


    async update (
        id : number,
        data : DeepPartial<T>
    ) : Promise <T> {
        const entity = await this.findById(id);

        const updated = this.repository.merge(entity, data);

        return this.repository.save(updated);
    }

    async remove (id : number) : Promise<void> {
        const entity = await this.findById(id);

        await this.repository.remove(entity);
    }
}