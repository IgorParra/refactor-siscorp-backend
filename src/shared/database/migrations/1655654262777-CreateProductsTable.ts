import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductsTable1655654262777 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

		await queryRunner.createTable(
			new Table({
				name: "products",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "barcode",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "brand",
						type: "varchar",
					},
					{
						name: "description",
						type: "varchar",
					},
					{
						name: "complementation",
						type: "varchar",
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
					},
					{
						name: "last_movement",
						type: "timestamp",
						default: "now()",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("products");
	}
}
