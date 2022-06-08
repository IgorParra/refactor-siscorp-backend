import { verify } from "jsonwebtoken";
import { secret } from "../../../../config/auth.json";

export const EnshureUserIsAuthenticated = (request, response, next) => {
	const {
		headers: { authorization },
	} = request;

	const parts = authorization.split(" ");

	if (!authorization || !(parts.length === 2)) {
		return response.status(401).send({ error: "No token provided" });
	}

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme)) {
		return response.status(401).send({ error: "Token malformatted" });
	}

	verify(token, secret, (err) => {
		if (err) return response.status(401).send({ error: "Token invalid" });

		return next();
	});
};
