// 路由懒加载组件
import React, { Suspense } from 'react'
// import Loading from  '@/library/loading'
const lazyLoad = (Comp: React.LazyExoticComponent<any>) => {
  return (
    // loading 组件 如果需要加loading fallback={<Loading />}
    <Suspense>
      <Comp />
    </Suspense>
  )
}
export default lazyLoad