import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from "typeorm";

export class CreateTransactionsMapTable1656373118848
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "transaction_map",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{ name: "isCredit", type: "boolean" },
					{
						name: "internal_code",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "transaction_name",
						type: "varchar",
						isNullable: true,
					},
				],
			})
		);

		await queryRunner.addColumn(
			"transaction_map",
			new TableColumn({
				name: "accounts_plan_id",
				type: "uuid",
				isNullable: true,
				default: null,
			})
		);

		await queryRunner.createForeignKey(
			"transaction_map",
			new TableForeignKey({
				columnNames: ["accounts_plan_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "accounts_plan",
				onDelete: "CASCADE",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("transaction_map", "accounts_plan_id");
		await queryRunner.dropColumn("transaction_map", "accounts_plan_id");
		await queryRunner.dropTable("transaction_map");
	}
}
