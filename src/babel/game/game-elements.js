let GameElements = (
  () => {
    let d = {
      levels: [
        { n: 'Level 1', v: 1 },
        { n: 'Level 2', v: 2 },
        { n: 'Level 3', v: 3 }
      ],
      env: [
        { n: 'wall', v: 1 },
        { n: 'room', v: 2 },
        { n: 'door', v: 3 },
        { n: 'tunnel', v: 4 }
      ],
      weapons: [
        { n: 'w1', v: 1 },
        { n: 'w2', v: 2 },
        { n: 'w3', v: 4 },
        { n: 'w4', v: 8 },
        { n: 'w5', v: 16 },
        { n: 'w6', v: 32 },
        { n: 'w7', v: 64 }
      ],
      healths: [
        { n: 'h1', v: 1 },
        { n: 'h2', v: 2 },
        { n: 'h3', v: 4 },
        { n: 'h4', v: 8 },
      ]
    }

    let m = {
      weapon: (n, i) => {
        let w = d.weapons[i]
        return {
          name: n,
          short: w.n,
          val: w.v,
          pos: [ 0, 0 ]
        }
      },
      health: (n,i) => {
        let h = d.healths[i]
        return {
          name: n,
          short: h.n,
          val: h.v,
          pos: [ 0, 0 ]
        }
      },
      player: (n, s, l, h, w) => {
        return {
          name: n,
          short: s,
          level: l,
          health: h,
          weapons: w,
          pos: [ 0, 0 ]
        }
      }
    }
    return {
      'd': d, 'm': m
    }
  }
)()

export { GameElements }