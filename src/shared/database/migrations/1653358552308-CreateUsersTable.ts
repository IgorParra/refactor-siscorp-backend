import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateUsersTable1653358552308 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
		await queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "email",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "password",
						type: "varchar",
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
					},
					{
						name: "updated_at",
						type: "timestamp",
						default: "now()",
					},
				],
			})
		);
		await queryRunner.createTable(
			new Table({
				name: "product",
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
						type: "varchar"
					},
					{
						name: "complementation",
						type: "varchar"
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
		await queryRunner.createTable(
			new Table({
				name: "stock",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "quantity",
						type: "varchar",
					},
					{
						name: "provider",
						type: "number",
					},
					{
						name: "batch",
						type: "varchar"
					},
					{
						name: "validity",
						type: "timestamp",
					},					
					{
						name: "idMoviment",
						type: "varchar",
					},
				],
			})
		);
		await queryRunner.addColumn(
			"stock",
			new TableColumn({
				name:"product_id",
				type: "uuid",
			})
		);
		await queryRunner.createForeignKey(
			"stock",
			new TableForeignKey({
				columnNames: ["product_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "product",
				onDelete: "CASCADE",
			})
		);

		await queryRunner.createTable(
			new Table({
				name: "stock_moviment",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "idMoviment",
						type: "varchar",
					},
					{
						name: "quantity",
						type: "number",
					},
					{
						name: "documentCode",
						type: "varchar",
					}
				],
			})
		);
		await queryRunner.addColumn(
			"stock_moviment",
			new TableColumn({
				name:"product_in_stock_id",
				type: "uuid",
			})
		);
		await queryRunner.createForeignKey(
			"stock",
			new TableForeignKey({
				columnNames: ["product_in_stock_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "stock",
				onDelete: "CASCADE",
			})
		);

		
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("ALTER TABLE `stock_moviment` DROP FOREIGN KEY `product_in_stock_id`");
		await queryRunner.query("ALTER TABLE `stock_moviment` DROP COLUMN `product_in_stock_id`");
		await queryRunner.dropTable("stock_moviment");

		await queryRunner.query("ALTER TABLE `stock` DROP FOREIGN KEY `product_id`");
		await queryRunner.query("ALTER TABLE `stock` DROP COLUMN `product_id`");
		await queryRunner.dropTable("stock");
	
		await queryRunner.dropTable("product");
		await queryRunner.dropTable("users");


	}

	
}
