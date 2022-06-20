import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from "typeorm";

export class CreateStockMovimentsTable1655682605663
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
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
						name: "document",
						type: "varchar",
					},
				],
			})
		);
		await queryRunner.addColumn(
			"stock_moviment",
			new TableColumn({
				name: "product_barcode",
				type: "uuid",
			})
		);
		await queryRunner.createForeignKey(
			"stock",
			new TableForeignKey({
				columnNames: ["product_barcode"],
				referencedColumnNames: ["id"],
				referencedTableName: "stock",
				onDelete: "CASCADE",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("stock_moviment", "product_barcode");
		await queryRunner.dropColumn("stock_moviment", "product_barcode");
		await queryRunner.dropTable("stock_moviment");
	}
}
