import { ReflectMetadata } from "@nestjs/common";

export const Auth = (bypass: boolean ) => ReflectMetadata('bypass', bypass);