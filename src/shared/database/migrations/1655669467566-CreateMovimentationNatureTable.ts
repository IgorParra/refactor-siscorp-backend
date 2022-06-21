import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMovimentationNatureTable1655669467566
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "movimentation_nature",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "description",
						type: "varchar",
					},
					{
						name: "isEntry",
						type: "boolean",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("movimentation_nature");
	}
}
