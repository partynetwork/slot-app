import { motion } from 'framer-motion'
import times from 'lodash/times'

export const nextLoop = (
  items: any[],
  page: number,
  perPage = 4,
) => {
  let actual = items.slice(page, perPage + page)
  if (actual.length < 4) {
    let replaceWithIndex = 0
    return times(perPage, (n) => {
      if (typeof actual[n] === 'undefined') {
        return items[replaceWithIndex++]
      }
      return actual[n]
    })
  }
  return actual
}

interface IProps {
  page: number
  motions: any[],
  duration: number
  onItemCentered?: (motion: any) => void
  onAnimationEnd?: (motion: any) => void
}

export const MyBox: React.FC<IProps> = (props) => {
  const {
    duration,
    motions,
    page,
    onItemCentered,
    onAnimationEnd,
  } = props

  const withAnimation = (motions: any[]) => [
    {
      ...motions[0],
      initial: { opacity: 1 },
      animate: {
        opacity: [1, 0],
        x: [0, -170],
      },
      onAnimationComplete: () => {
        return
      },
    },
    {
      ...motions[1],
      initial: { opacity: 1 },
      animate: {
        opacity: 1,
        x: [0, -170],
      },
      onAnimationComplete: () => {
        return
      },
    },
    {
      ...motions[2],
      initial: { opacity: 1 },
      animate: {
        opacity: 1,
        x: [0, -170],
      },
      onAnimationComplete: () => {
        if (typeof onItemCentered !== 'undefined') {
          onItemCentered(motions[2])
        }
        return
      },
    },
    {
      ...motions[3],
      initial: { opacity: 0 },
      animate: {
        opacity: [0, 1],
        x: [0, -170],
      },
      onAnimationComplete: () => {
        if (typeof onAnimationEnd !== 'undefined') {
          onAnimationEnd(motions[3])
        }
        return
      },
    },
  ]
  return (
    <>
      <div className="wrapper-slot-app">
        <div className="slot-app">
          {
            withAnimation(
              nextLoop(motions, page, 4),
            ).map((m, i) => (
              <motion.div
                key={i}
                className={m.className}
                initial={m.initial}
                onAnimationComplete={m.onAnimationComplete}
                animate={m.animate}
                transition={{
                  ease: 'easeInOut',
                  duration,
                }}
              >
                <span>{m.key}</span>
              </motion.div>
            ))}
        </div>
      </div>
    </>
  )
}
