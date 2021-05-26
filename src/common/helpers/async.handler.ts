export const asyncHandler = fn =>
    function asyncUtilWrap(...args: any[]) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(err => next(err))
    };

