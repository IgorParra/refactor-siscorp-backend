import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
					{
						name: "accounts_plan",
						type: "varchar",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("transaction_map");
	}
}
