export const bentoSpringTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
}

export const bentoContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

export const bentoItemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: bentoSpringTransition,
  },
}
