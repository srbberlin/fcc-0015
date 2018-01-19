import { GameElements } from './game-elements.js'

var d = GameElements.d
var m = GameElements.m
var data = {
  players: [
    m.player ('', 'me', 0, [], []),
    m.player ('', 'enemy', 0, [], []),
    m.player ('', 'enemy', 0, [], []),
    m.player ('', 'enemy', 0, [], []),
    m.player ('', 'boss', 0, [], [])
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
  ],
  data: [
    [82,  0, 92,  5],
    [38, 20, 42, 40],
    [38, 20, 42, 40],
    [39, 18, 45, 38],
    [28, 43, 46, 65],
    [14, 60, 28, 66],
    [ 3, 32, 11, 48],
    [ 0,  7, 18, 13],
    [38, 63, 60, 71],
    [60, 68, 10, 14],
    [38, 32, 48, 38],
    [10, 44, 20, 62],
    [35, 22, 47, 26],
    [ 4,  4, 22, 18],
    [72, 66, 88, 84],
    [26, 87, 48, 99],
    [42, 68, 46, 90],
    [62, 18, 68, 22],
    [86, 70, 99, 78],
    [57, 54, 69, 62],
    [14, 20, 30, 38],
    [ 4, 79, 10, 85],
    [79, 94, 89, 99],
    [60, 42, 70, 48],
    [14,  1, 22,  9],
    [57, 56, 67, 60],
    [66,  0, 76, 12],
    [62, 87, 76, 99],
    [13, 38, 29, 46],
    [93,  4, 99, 10],
    [14,  8, 22, 24],
  ]
}

var NewGame = {
  field: (() => {

    let pc = 0, wc = 0, hc = 0
    let pcMax = data.players.length
    let wcMax = data.weapons.length
    let hcMax = data.healths.length
    let y, x, o
    let e1, e2

    let f = [[],[],[]] // main data, shadow, roompatterns
    let t = d.env[0].v // default type for now
    for (y = 0; y < 100; y++) { // generate data structure
      f[0].push([])
      f[1].push([])
      for (x = 0; x < 100; x++) {
        f[0][y].push([t, null])
        f[1][y].push([t, null])
      }
    }

    do {
      y = Math.abs(Math.floor(Math.random() * 100))
      x = Math.abs(Math.floor(Math.random() * 100))
      if (pc < pcMax) {
        o = data.players[pc++]
        t = d.env[1].v
      } else if (wc < wcMax) {
        o = data.weapons[wc++]
        t = d.env[1].v
      } else if (hc < hcMax) {
        o = data.healths[hc++]
        t = d.env[1].v
      }
      o.pos[0] = y
      o.pos[1] = x
      f[0][y][x][0] = t
      f[0][y][x][1] = o
      f[1][y][x][0] = t
      f[1][y][x][1] = o
    } while (hc < hcMax)

    pc = 0, wc = 0, hc = 0
    do {
      if (pc < pcMax) {
        o = data.players[pc++]
      } else if (wc < wcMax) {
        o = data.weapons[wc++]
      } else if (hc < hcMax) {
        o = data.healths[hc++]
      }

      y = o.pos[0]
      x = o.pos[1]
      t = d.env[1].v

      e1 = Math.floor(Math.random()*10 + 2)
      e2 = Math.floor(Math.random()*10 + 2)

      let ymin, y1, ymax
      let xmin, x1, xmax

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

      f[2].push([ymin, xmin, ymax, xmax])
            
      y1 = ymin
      while (y1 <= ymax) {
        x1 = xmin
        while (x1 <= xmax) {
          if (x1 !== x || y1 !== y) {
            f[0][y1][x1][2]
            f[0][y1][x1][0] = t
            f[1][y1][x1][0] = t
          }
          else {
            f[0][y1][x1][2] = [ymin, xmin, ymax, xmax]
          }
          x1++
        }
        y1++
      }
    } while (hc < hcMax)

    const Y1 = 0
    const X1 = 1
    const Y2 = 2
    const X2 = 3
    
    let isIn = (c, f) => {

      if (
        (
          c[Y1] <= f[Y1] && f[Y1] <= c[Y2] ||
          c[Y1] <= f[Y2] && f[Y2] <= c[Y2]
        ) &&
        (
          f[X1] <= c[X2] && f[X2] >= c[X1]
        )
      ) {
        console.log('Y', c[Y1],c[X1],c[Y2],c[X2],':',f[Y1],f[X1],f[Y2],f[X2])
        return true
      }
      if (
        (
          c[X1] <= f[X1] && f[X1] <= c[X2] ||
          c[X1] <= f[X2] && f[X2] <= c[X2]
        ) &&
        (
          f[Y1] <= c[Y2] && f[Y2] >= c[Y1]
        )
      ) {
        console.log('X', c[Y1],c[X1],c[Y2],c[X2],':',f[Y1],f[X1],f[Y2],f[X2])
        return true
      }
      return false
      /*
      if (
        c[Y1] <= f[Y1] && f[Y1] <= c[Y2] &&
        c[X1] <= f[X1] && f[X1] <= c[X2]
      ) {
        //console.log('4', flag, c[Y1],'<',f[Y1],'<',c[Y2],'&&',c[X1],'<',f[X1],'<',c[X2])
        return true
      }
      if (
        c[Y1] <= f[Y1] && f[Y1] <= c[Y2] &&
        c[X1] <= f[X2] && f[X2] <= c[X2]
      ) {
        //console.log('4', flag, c[Y1],'<',f[Y1],'<',c[Y2],'&&',c[X1],'<',f[X2],'<',c[X2])
        return true
      }
      if (
        c[Y1] <= f[Y2] && f[Y2] <= c[Y2] &&
        c[X1] <= f[X2] && f[X2] <= c[X2]
      ) {
        //console.log('4', flag, c[Y1],'<',f[Y2],'<',c[Y2],'&&',c[X1],'<',f[X2],'<',c[X2])
        return true
      }
      if (
        c[Y1] <= f[Y2] && f[Y2] <= c[Y2] &&
        c[X1] <= f[X1] && f[X1] <= c[X2]
      ) {
        //console.log('4', flag, c[Y1],'<',f[Y2],'<',c[Y2],'&&',c[X1],'<',f[X1],'<',c[X2])
        return true
      }
      */
    }

    console.log(f[2])
    f[2] = f[2].reduce((a, c) => {
      if (a.length > 0) {
        let i = 0
        let l = a.length
        while (i < l) {
          let b = a[i++] // get the next group
          let j = 0
          let l = b.length
          while (j < l) {
            let d = b[j] // get the next room
            if (
              isIn(c, d) // is it overlapping with the current room ?
            ) {
              b.push(c) // add another room to the group
              console.log('=', c[Y1],c[X1],c[Y2],c[X2])
              return a
            }
            j++
          }
        }
      }
      console.log('+', c[Y1],c[X1],c[Y2],c[X2])
      a.push([c]) // add another group with it's first room
      return a
    },
    [])

    f[2].sort((a, b) => {
      return a.length - b.length
    })

    let c = 0, i = 0, l = f[2].length
    while (i < l) {
      let d = f[2][i++].length
      c += d
      console.log(i, d)
    }
    console.log(l, c)
    console.log(f[2])

    return f
  }
  )()
}

export { NewGame }
