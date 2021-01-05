import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createOrder1609879520822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'value',
            type: 'varchar',
          },
          {
            name: 'final_value',
            type: 'varchar',
          },
          {
            name: 'payment_type',
            type: 'varchar',
          },
          {
            name: 'payment_status',
            type: 'enum',
            enum: [
              'processing',
              'awaiting payment',
              'canceled',
              'expired',
              'paid',
            ],
          },
          {
            name: 'sales_type',
            type: 'enum',
            enum: [
              'processing',
              'awaiting payment',
              'canceled',
              'expired',
              'paid',
            ],
          },

          {
            name: 'delivery_point_id',
            type: 'uuid',
          },

          {
            name: 'user_id',
            type: 'uuid',
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'OrderUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'OrderPoint',
            referencedTableName: 'delivery_points',
            referencedColumnNames: ['id'],
            columnNames: ['delivery_point_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
