import { GameElements } from './game-elements.js'

let d = GameElements.d // Fieldtypes
let m = GameElements.m // Constructors
let Entities = {
  players: [
    m.player ('hans', 'me', 0, [], []),
    m.player ('paul panther', 'enemy', 0, [], []),
    m.player ('sweet maries', 'enemy', 0, [], []),
    m.player ('dark angel', 'enemy', 0, [], []),
    m.player ('the majestic peace of', 'boss', 0, [], [])
  ] ,
  weapons: [
    m.weapon ('GameElements.weapons.w1', 0),
    m.weapon ('GameElements.weapons.w1', 0),
    m.weapon ('GameElements.weapons.w1', 0),
    m.weapon ('GameElements.weapons.w1', 0),
    m.weapon ('GameElements.weapons.w2', 1),
    m.weapon ('GameElements.weapons.w2', 1),
    m.weapon ('GameElements.weapons.w2', 1),
    m.weapon ('GameElements.weapons.w3', 2),
    m.weapon ('GameElements.weapons.w4', 3),
    m.weapon ('GameElements.weapons.w5', 4),
    m.weapon ('GameElements.weapons.w6', 5),
    m.weapon ('GameElements.weapons.w7', 6)
  ],
  healths: [
    m.health('GameElements.healths.h1', 0),
    m.health('GameElements.healths.h1', 0),
    m.health('GameElements.healths.h1', 0),
    m.health('GameElements.healths.h1', 0),
    m.health('GameElements.healths.h1', 0),
    m.health('GameElements.healths.h1', 0),
    m.health('GameElements.healths.h2', 1),
    m.health('GameElements.healths.h2', 1),
    m.health('GameElements.healths.h2', 1),
    m.health('GameElements.healths.h3', 2),
    m.health('GameElements.healths.h3', 2),
    m.health('GameElements.healths.h3', 2),
    m.health('GameElements.healths.h3', 2),
  ]
}

const Y1 = 0
const X1 = 1
const Y2 = 2
const X2 = 3
const Y  = 4
const X  = 5

let isIn = (c, f) => {
  let a1 = c[X1] <= (f[X1] +1) && f[X1] <= (c[X2] +1)
  let a2 = c[X1] <= (f[X2] +1) && f[X2] <= (c[X2] +1)
  let a3 = c[Y1] <= (f[Y1] +1) && f[Y1] <= (c[Y2] +1)
  let a4 = c[Y1] <= (f[Y2] +1) && f[Y2] <= (c[Y2] +1)
        
  if ((a1 || a2) && (a3 || a4)) {
    return true
  }
  return false
}

let newCoords = (y, x, ey, ex) => {
  let e1 = Math.floor(Math.random()*(ey ? ey : 10) + 2)
  let e2 = Math.floor(Math.random()*(ex ? ex : 10) + 2)

  let ymin, ymax
  let xmin, xmax

  ymin = y - e1
  ymax = y + e1
  if (ymax >= 100) {
    ymax = 99
  }
  if (ymin < 0) {
    ymin = 0
  }

  xmin = x - e2
  xmax = x + e2
  if (xmax >= 100) {
    xmax = 99
  }
  if (xmin < 0) {
    xmin = 0
  }

  return [ymin, xmin, ymax, xmax, y, x]
}

let Pitch = {
  field: (() => {

    let pc = 0, pcMax = Entities.players.length
    let wc = 0, wcMax = Entities.weapons.length
    let hc = 0, hcMax = Entities.healths.length
    let y, y1, y2, ym, x, x1, x2, xm, o, title = ''
    let coords

    let f = [
      [], // main data
      [], // shadow
      []  // roompatterns
    ]
    let t = d.env[0].v // default type for now: wall

    for (y = 0; y < 100; y++) { // generate data structure
      f[0].push([])
      f[1].push([])
      for (x = 0; x < 100; x++) {
        f[0][y].push([t, null, null, `p${y},${x}`])
        f[1][y].push([t, null, null, `p${y},${x}`])
      }
    }

    /*
     * Position the combatants, weapons and healths
     * 
     */

    do {
      y = pc === 0 ? 0 : Math.abs(Math.floor(Math.random() * 94 + 3))
      x = pc === 0 ? 0 : Math.abs(Math.floor(Math.random() * 94 + 3))
      if (pc < pcMax) {
        o = Entities.players[pc++]
        t = d.env[1].v
        title = `player ${pc}`
      } else if (wc < wcMax) {
        o = Entities.weapons[wc++]
        t = d.env[1].v
        title = `weapon ${wc}`
      } else if (hc < hcMax) {
        o = Entities.healths[hc++]
        t = d.env[1].v
        title = `healt ${hc}`
      }

      o.pos[0] = y
      o.pos[1] = x
      f[0][y][x][0] = t
      f[0][y][x][1] = o
      f[0][y][x][2] = title
      f[1][y][x][0] = t
      f[1][y][x][1] = o
      f[1][y][x][2] = title

    } while (hc < hcMax)

    /*
     * Provide the rooms for the combatants, weapons and healths
     * 
     */

    pc = 0, wc = 0, hc = 0
    do {
      if (pc < pcMax) {
        o = Entities.players[pc++]
      } else if (wc < wcMax) {
        o = Entities.weapons[wc++]
      } else if (hc < hcMax) {
        o = Entities.healths[hc++]
      }

      y = o.pos[0]
      x = o.pos[1]
      t = d.env[1].v

      coords = newCoords(y, x)

      f[2].push([coords]) // One element per row
            
      y1 = coords[Y1]
      ym = coords[Y2]
      while (y1 <= ym) {
        x1 = coords[X1]
        xm = coords[X2]
        while (x1 <= xm) {
          if (x1 !== x || y1 !== y) {
            f[0][y1][x1][0] = t
            f[1][y1][x1][0] = t
          }
          else {
            //f[0][y1][x1][2] = t//coords // Display
          }
          x1++
        }
        y1++
      }
    } while (hc < hcMax)

    let la = 0, lb
    do {
      f[2] = f[2].reduce(
        (a0, c1) => {
          if (a0.length > 0) {
            let i0 = 0
            let l0 = a0.length
            while (i0 < l0) {
              let a1 = a0[i0]
              let i1 = 0
              let l1 = a1.length
              while (i1 < l1) {
                let a2 = a1[i1]
                let i2 = 0
                let l2 = c1.length
                while (i2 < l2) {
                  let c2 = c1[i2]
                  if (isIn(a2, c2) || isIn(c2, a2)) {
                    a0[i0] = a1.concat(c1)
                    return a0
                  }
                  i2++
                }
                i1++
              }
              i0++
            }
          }
          a0.push(c1)
          return a0
        },
        []
      )
      lb = la
      la = f[2].length
    }
    while (la !== lb)
    
    f[2].sort((a, b) => { return a.length - b.length })

    /*
     * Connect rooms with tunnels
     * 
     */

    la = 0
    f[2].reduce(
      (a, c, i) => {
        if (i === 0) {
          y1 = c[0][Y]
          x1 = c[0][X]
          a.push([])
        }
        else {
          let tmp

          y2 = c[0][Y]
          x2 = c[0][X]
          t = d.env[3].v

          x = x1
          y = y1
          ym = y2
          if (y > ym) {
            tmp = ym
            ym = y
            y = tmp
          }

          while (y <= ym) {
            if (f[0][y][x][0] === d.env[0].v) {
              f[0][y][x][0] = t
              f[0][y][x][1] = null
              f[1][y][x][0] = t
              f[1][y][x][1] = null
            }
            y++
          }

          y = y2
          x = x1
          xm = x2
          if (x > xm) {
            tmp = xm
            xm = x
            x = tmp
          }

          while (x <= xm) {
            if (f[0][y][x][0] === d.env[0].v) {
              f[0][y][x][0] = t
              f[0][y][x][1] = null
              f[1][y][x][0] = t
              f[1][y][x][1] = null
            }
            x++
          }
          
          y1 = y2
          x1 = x2
        }
        return a
      },
      []
    )

    return f
  }
  )()
}

export { Pitch }
export { Entities }
