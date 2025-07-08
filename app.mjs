import {sum,sub} from "./file.mjs"; //for named export
console.log(sum,sub);
console.log(sum(2,3));
console.log(sub(2,3));

import mult from "./file.mjs"; //for default export
console.log(mult(2,3));


