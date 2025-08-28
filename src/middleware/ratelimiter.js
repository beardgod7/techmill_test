// leakyBucketLimiter.js
export default class LeakyBucketLimiter {
  constructor({ maxTokens = 5, refillRate = 0.1 } = {}) {
    this.buckets = new Map();
    this.MAX_TOKENS = maxTokens;
    this.REFILL_RATE = refillRate;
  }

  middleware() {
    return (req, res, next) => {
      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip ||
        req.connection.remoteAddress ||
        "unknown";

      const now = Date.now() / 1000;
      const bucket = this.buckets.get(ip) || {
        tokens: this.MAX_TOKENS,
        lastRefill: now,
      };

      const timeElapsed = now - bucket.lastRefill;
      const leakedTokens = timeElapsed * this.REFILL_RATE;
      const currentTokens = Math.min(
        this.MAX_TOKENS,
        bucket.tokens + leakedTokens
      );

      if (currentTokens < 1) {
        return res
          .status(429)
          .json({ message: "Too many requests. Try again later." });
      }

      this.buckets.set(ip, {
        tokens: currentTokens - 1,
        lastRefill: now,
      });

      next();
    };
  }
}
