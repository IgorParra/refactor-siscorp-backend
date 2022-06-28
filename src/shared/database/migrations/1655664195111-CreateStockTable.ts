import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from "typeorm";

export class CreateStockTable1655664195111 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
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
						name: "idMoviment",
						type: "varchar",
					},
					{
						name: "documentCode",
						type: "varchar",
					},
					{
						name: "quantity",
						type: "int",
					},
					{
						name: "provider",
						type: "varchar",
					},
					{
						name: "batch",
						type: "varchar",
					},
					{
						name: "validity",
						type: "timestamp",
					},
				],
			})
		);
		await queryRunner.addColumn(
			"stock",
			new TableColumn({
				name: "product_id",
				type: "uuid",
			})
		);
		await queryRunner.createForeignKey(
			"stock",
			new TableForeignKey({
				columnNames: ["product_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "products",
				onDelete: "CASCADE",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("stock", "product_id");
		await queryRunner.dropColumn("stock", "product_id");
		await queryRunner.dropTable("stock");
	}
}
