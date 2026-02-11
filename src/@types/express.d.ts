import { Role } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            user?: {
                username: string;
                role: Role;
            };
        }
    }
}