import { DefaultState, ParameterizedContext, DefaultContext } from "koa";
import { response_t } from "../types/response";

export interface KoaContext
  extends ParameterizedContext<DefaultState, DefaultContext, response_t> {}
