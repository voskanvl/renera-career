const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13].reduce(
    (acc, e, idx) => {
        const current = (idx / 5) | 0;
        console.log("🚀 ~ current:", current);
        console.log(acc);
        if (acc[current]) {
            acc[current].push(e);
        } else {
            acc[current] = [];
            acc[current].push(e);
        }
        return acc;
    },
    [[]],
);

console.log(a);
