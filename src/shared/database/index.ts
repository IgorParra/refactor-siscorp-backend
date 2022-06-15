import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../modules/user/entities/User";
import { Product } from "../../modules/product/entity/Product";
import { Stock } from "../../modules/stock/entity/Stock";
import { Stock_moviment } from "../../modules/stock/entity/StockMoviment";


export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5434,
	username: "postgres",
	password: "sisCorpPG16734",
	database: "postgres",
	entities: [User,Product,Stock,Stock_moviment],
	migrations: ["src/database/migrations/*.ts"],
	synchronize: true,
	logging: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
	.then(() => {
		console.log("Banco de dados conectado!");
	})
	.catch((error) => console.log(error));
