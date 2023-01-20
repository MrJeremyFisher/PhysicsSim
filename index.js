import { parseTex, evaluateTex } from 'C:\\Users\\jerem\\PhysicsSim\\tex-math-parser-main\\src\\index.ts' // ES6 module
console.log('hi')
// Make sure to escape the string!
const escapedTex = String.raw`\begin{bmatrix}1&3\\2&4\end{bmatrix}\begin{bmatrix}-5\\-6\end{bmatrix}+\left|\sqrt{7}-\sqrt{8}\right|^{\frac{9}{10}}\begin{bmatrix}\cos\left(\frac{\pi}{6}\right)\\\sin\left(\frac{\pi}{6}\right)\end{bmatrix}`; // ES6 raw template string
const texAnswer = evaluateTex(escapedTex); 
console.log(texAnswer); 