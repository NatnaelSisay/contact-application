"use strict";

// module.exports = function(Owner) {};
module.exports = function(Owner) {
  Owner.beforeRemote("create", (ctx, user, next) => {
    console.log(ctx.args.data);
    next();
  });
};
