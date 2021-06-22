import Router from "@koa/router";
import { KoaContext } from "../interfaces/koaContext";

const router = new Router();

const memo: number[] = [1, 1];

const fastFactorial = (num: number): number => {
  if (num <= memo.length - 1) return memo[num] % (10e9 + 7);

  for (let i = memo.length; i <= num; i++) {
    memo.push(i * memo[i - 1]);
  }

  return memo[num] % (10e9 + 7);
};

const slowFactorial = (num: number): number => {
  if (num === 0) return 1;
  let ans = 1;

  for (let i = 1; i <= num; i++) {
    ans = ans * i;
  }

  return ans % (10e9 + 7);
};

const generateError = (reason: string, message: string, details: any = {}) => {
  return {
    error: {
      reason: reason,
      dateTime: Date.now(),
      message: message,
      details: details,
    },
  };
};

router.get("/api/v1/factorial/:number", (ctx: KoaContext) => {
  const { number } = ctx.params;

  const num = parseInt(number);

  if (isNaN(num) || num > 1e8 || num < 1) {
    ctx.throw(
      400,
      "Invalid number provided",
      generateError("Invalid Number", "Provide valid number")
    );
  }

  ctx.body = {
    data: {
      factorial: {
        value: ctx.query.fast ? fastFactorial(num) : slowFactorial(num),
        timeTaken: 0, // To be filled by the middleware
      },
    },
  };
});

export default router;
