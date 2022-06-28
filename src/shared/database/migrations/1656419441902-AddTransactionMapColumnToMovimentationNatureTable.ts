import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from "typeorm";

export class AddTransactionMapColumnToMovimentationNatureTable1656419441902
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			"movimentation_nature",
			new TableColumn({
				name: "transaction_map_item",
				type: "uuid",
				isNullable: true,
				default: null,
			})
		);

		await queryRunner.createForeignKey(
			"movimentation_nature",
			new TableForeignKey({
				columnNames: ["transaction_map_item"],
				referencedColumnNames: ["id"],
				referencedTableName: "transaction_map",
				onDelete: "CASCADE",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(
			"movimentation_nature",
			"transaction_map_item"
		);
		await queryRunner.dropColumn(
			"movimentation_nature",
			"transaction_map_item"
		);
	}
}
