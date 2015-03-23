export const v = vx => e => e.verify(vx)
export const vm = (vx, es) => es.forEach(v(vx))
