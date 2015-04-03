export const v = vx => e => e.verify(e, vx)
export const vm = (vx, es) => es.forEach(v(vx))
