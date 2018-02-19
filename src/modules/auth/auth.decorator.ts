import { ReflectMetadata } from "@nestjs/common";

export const Auth = (require: boolean ) => ReflectMetadata('bypass', require);