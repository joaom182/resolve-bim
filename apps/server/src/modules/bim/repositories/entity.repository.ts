import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';
import { SqliteDbService } from 'src/modules/storage/sqlite-db.service';

export interface IDBEntity {
  entityId: number;
  attributeCategory: string;
  attributeName: string;
  attributeValue: string;
  attributeContext: string;
}

@Injectable()
export class EntityRepository {
  constructor(private readonly sqliteDbService: SqliteDbService) {}

  private async initDb(modelDbUrl: string): Promise<Database> {
    return this.sqliteDbService.init(modelDbUrl);
  }

  async getAll(modelDbUrl: string): Promise<IDBEntity[]> {
    const db = await this.initDb(modelDbUrl);
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT entity.entity_id as entityId,
            attr.category as attributeCategory,
            attr."display_name" as attributeName,
            val."value" as attributeValue,
            attr.data_type_context as attributeContext
        FROM _objects_eav as entity
            INNER JOIN _objects_attr as attr ON attr.id = entity.attribute_id
            INNER JOIN _objects_val as val ON val.id = entity.value_id;`,
        (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          return resolve(rows as IDBEntity[]);
        },
      );
    });
  }

  async getById(id: number, modelDbUrl: string): Promise<IDBEntity[]> {
    const db = await this.initDb(modelDbUrl);
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT entity.entity_id as entityId,
            attr.category as attributeCategory,
            attr."display_name" as attributeName,
            val."value" as attributeValue,
            attr.data_type_context as attributeContext
        FROM _objects_eav as entity
            INNER JOIN _objects_attr as attr ON attr.id = entity.attribute_id
            INNER JOIN _objects_val as val ON val.id = entity.value_id
        WHERE entity.entity_id = ${id};`,
        (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          return resolve(rows as IDBEntity[]);
        },
      );
    });
  }
}
