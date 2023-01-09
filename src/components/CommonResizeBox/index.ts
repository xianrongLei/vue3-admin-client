export type modeType = 0 | 1 | 2

export interface ResizeOption {
  parentNode: HTMLElement
  target: HTMLElement
  width: number
  height: number
  mode: modeType
  alignType: string
}
export interface GetResize {
  ratio: () => void
  stretch: () => void
  parentResize: () => void
  unWindowResize: () => void
}
export function getResize(resizeOption: ResizeOption): GetResize {
  // 对其方式
  const translate: string = resizeOption.alignType === "middle" ? "-50%, -50%" : "-50%, 0"
  // * 定时函数
  let timeout: any
  // * 默认缩放值
  const scale: {
    width: string
    height: string
  } = {
    width: "1",
    height: "1"
  }
  // * 设计稿尺寸（px）
  const baseWidth: number = resizeOption.width
  const baseHeight: number = resizeOption.height
  let parentWidth: number = resizeOption.parentNode.clientWidth
  let parentHeight: number = resizeOption.parentNode.clientHeight
  // * 需保持的比例（默认1.77778）
  const baseProportion: number = parseFloat((baseWidth / baseHeight).toFixed(5))
  // 固定比例缩放
  const ratio = (): void => {
    // 当前宽高比
    const currentRate: number = parseFloat((parentWidth / parentHeight).toFixed(5))
    if (resizeOption.target) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = ((parentHeight * baseProportion) / baseWidth).toFixed(5)
        scale.height = (parentHeight / baseHeight).toFixed(5)
        resizeOption.target.style.transform = `scale(${scale.width}, ${scale.height}) translate(${translate})`
      } else {
        // 表示更高
        scale.height = (parentWidth / baseProportion / baseHeight).toFixed(5)
        scale.width = (parentWidth / baseWidth).toFixed(5)
        resizeOption.target.style.transform = `scale(${scale.width}, ${scale.height}) translate(${translate})`
      }
    }
  }
  // 固定窗口大小拉伸缩放
  const stretch = (): void => {
    if (resizeOption.target) {
      scale.height = (parentHeight / baseHeight).toFixed(5)
      scale.width = (parentWidth / baseWidth).toFixed(5)
      resizeOption.target.style.transform = `scale(${scale.width}, ${scale.height}) translate(${translate})`
    }
  }

  const resize = (): void => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      switch (resizeOption.mode) {
        case 0:
          stretch()
          break
        case 1:
          ratio()
          break
        default:
          stretch()
          break
      }
    }, 200)
  }
  let timer: any
  // 监听窗口大小重新绘制
  const parentResize = (): void => {
    parentWidth = resizeOption.parentNode.clientWidth
    parentHeight = resizeOption.parentNode.clientHeight
    timer = setInterval(() => {
      const queryParentWidth: number = resizeOption.parentNode.clientWidth
      const queryParentHeight: number = resizeOption.parentNode.clientHeight
      if (parentWidth !== queryParentWidth && parentHeight !== queryParentHeight) {
        resize()
        parentWidth = queryParentWidth
        parentHeight = queryParentHeight
      }
    }, 600)
  }
  // 关闭监听窗口大小
  const unWindowResize = (): void => {
    clearInterval(timer)
  }
  return {
    ratio,
    stretch,
    parentResize,
    unWindowResize
  }
}
