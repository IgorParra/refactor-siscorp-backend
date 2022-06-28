import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from "typeorm";

export class CreateAccountsPlanTable1656277231296
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "accounts_plan",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{ name: "description", type: "varchar" },
					{
						name: "balance",
						type: "float",
						isNullable: true,
					},
				],
			})
		);

		await queryRunner.addColumn(
			"accounts_plan",
			new TableColumn({
				name: "parent",
				type: "uuid",
				isNullable: true,
			})
		);

		await queryRunner.createForeignKey(
			"accounts_plan",
			new TableForeignKey({
				columnNames: ["parent"],
				referencedColumnNames: ["id"],
				referencedTableName: "accounts_plan",
				onDelete: "CASCADE",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("accounts_plan", "parent");
		await queryRunner.dropColumn("accounts_plan", "parent");
		await queryRunner.dropTable("accounts_plan");
	}
}
